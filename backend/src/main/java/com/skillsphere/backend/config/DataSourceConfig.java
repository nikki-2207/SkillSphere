package com.skillsphere.backend.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.net.URI;

@Configuration
public class DataSourceConfig {

    @Value("${spring.datasource.url:}")
    private String defaultUrl;

    @Value("${spring.datasource.username:}")
    private String defaultUsername;

    @Value("${spring.datasource.password:}")
    private String defaultPassword;

    @Bean
    @Primary
    public DataSource dataSource() {
        String rawDbUrl = System.getenv("DATABASE_URL");
        if (rawDbUrl == null || rawDbUrl.isBlank()) {
            rawDbUrl = System.getenv("SPRING_DATASOURCE_URL");
        }
        if (rawDbUrl == null || rawDbUrl.isBlank()) {
            rawDbUrl = defaultUrl;
        }

        String username = System.getenv("SPRING_DATASOURCE_USERNAME");
        if (username == null || username.isBlank()) {
            username = System.getenv("DATABASE_USERNAME");
        }
        if (username == null || username.isBlank()) {
            username = defaultUsername;
        }

        String password = System.getenv("SPRING_DATASOURCE_PASSWORD");
        if (password == null || password.isBlank()) {
            password = System.getenv("DATABASE_PASSWORD");
        }
        if (password == null || password.isBlank()) {
            password = defaultPassword;
        }

        String jdbcUrl = rawDbUrl;

        // Support standard PostgreSQL URIs from Neon or Render (e.g. postgresql://user:pass@host:port/db)
        if (rawDbUrl != null && (rawDbUrl.startsWith("postgres://") || rawDbUrl.startsWith("postgresql://"))) {
            try {
                String cleanForUri = rawDbUrl.startsWith("postgresql://")
                        ? "http" + rawDbUrl.substring("postgresql".length())
                        : "http" + rawDbUrl.substring("postgres".length());
                URI uri = URI.create(cleanForUri);

                if (uri.getUserInfo() != null) {
                    String[] parts = uri.getUserInfo().split(":", 2);
                    if (parts.length > 0 && !parts[0].isBlank()) {
                        username = parts[0];
                    }
                    if (parts.length > 1 && !parts[1].isBlank()) {
                        password = parts[1];
                    }
                }

                String host = uri.getHost();
                int port = uri.getPort() > 0 ? uri.getPort() : 5432;
                String path = uri.getPath();
                String query = uri.getQuery();

                StringBuilder sb = new StringBuilder();
                sb.append("jdbc:postgresql://").append(host).append(":").append(port).append(path);
                if (query != null && !query.isBlank()) {
                    sb.append("?").append(query);
                    if (!query.contains("sslmode")) {
                        sb.append("&sslmode=require");
                    }
                } else {
                    sb.append("?sslmode=require");
                }
                jdbcUrl = sb.toString();
            } catch (Exception e) {
                if (!rawDbUrl.startsWith("jdbc:")) {
                    jdbcUrl = "jdbc:" + rawDbUrl;
                }
            }
        } else if (rawDbUrl != null && !rawDbUrl.startsWith("jdbc:postgresql://")) {
            if (rawDbUrl.startsWith("jdbc:postgres://")) {
                jdbcUrl = "jdbc:postgresql://" + rawDbUrl.substring("jdbc:postgres://".length());
            } else if (!rawDbUrl.startsWith("jdbc:")) {
                jdbcUrl = "jdbc:postgresql://" + rawDbUrl;
            }
        }

        // Enforce sslmode=require for Neon PostgreSQL cloud database
        if (jdbcUrl != null && !jdbcUrl.contains("sslmode")) {
            jdbcUrl += (jdbcUrl.contains("?") ? "&" : "?") + "sslmode=require";
        }

        HikariConfig hikariConfig = new HikariConfig();
        hikariConfig.setJdbcUrl(jdbcUrl);
        if (username != null && !username.isBlank()) {
            hikariConfig.setUsername(username);
        }
        if (password != null && !password.isBlank()) {
            hikariConfig.setPassword(password);
        }
        hikariConfig.setDriverClassName("org.postgresql.Driver");
        hikariConfig.setMaximumPoolSize(10);
        hikariConfig.setMinimumIdle(2);
        hikariConfig.setConnectionTimeout(30000);
        hikariConfig.setIdleTimeout(600000);
        hikariConfig.setMaxLifetime(1800000);

        return new HikariDataSource(hikariConfig);
    }
}
