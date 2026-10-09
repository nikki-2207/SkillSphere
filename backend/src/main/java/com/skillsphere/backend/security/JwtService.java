package com.skillsphere.backend.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

    private final SecretKey key;
    private final long expirationTime = 1000L * 60 * 60 * 24; // 24 hours

    public JwtService(@Value("${jwt.secret:SkillSphereSuperSecretKeyForJWTAuthentication2026}") String secretKey) {
        // Ensure secret key is at least 32 bytes for HMAC-SHA256
        String effectiveKey = (secretKey == null || secretKey.length() < 32)
                ? "SkillSphereSuperSecretKeyForJWTAuthentication2026"
                : secretKey;
        this.key = Keys.hmacShaKeyFor(effectiveKey.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(String email) {

        Date now = new Date();
        Date expiration = new Date(now.getTime() + expirationTime);

        return Jwts.builder()
                .subject(email)
                .issuedAt(now)
                .expiration(expiration)
                .signWith(key)
                .compact();
    }

    public String extractEmail(String token) {

        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }
}