const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8080;
const JWT_SECRET = process.env.JWT_SECRET || "SkillSphereSuperSecretKeyForJWTAuthentication2026";
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.warn("⚠️ WARNING: DATABASE_URL is not set. Database queries will fail until DATABASE_URL is provided.");
}

// Neon PostgreSQL Connection Pool
const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Allowed CORS origins
const rawOrigins = process.env.ALLOWED_ORIGINS || "http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000,https://skill-sphere-79axdrjk3-nikki-2207.vercel.app";
const allowedOriginList = rawOrigins.split(",").map((s) => s.trim()).filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    // Allow localhost with any port
    if (/^http:\/\/localhost(:\d+)?$/.test(origin) || /^http:\/\/127\.0\.0\.1(:\d+)?$/.test(origin)) {
      return callback(null, true);
    }
    // Allow all vercel.app domains
    if (/^https:\/\/.*\.vercel\.app$/.test(origin)) {
      return callback(null, true);
    }
    if (allowedOriginList.includes(origin)) {
      return callback(null, true);
    }
    return callback(null, true); // Fallback allow to avoid unexpected deployment blocks
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept", "Origin", "X-Requested-With"],
};

app.use(cors(corsOptions));
app.use(express.json());

// JWT Authentication Middleware for protected endpoints
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.startsWith("Bearer ") && authHeader.slice(7);

  if (!token) {
    return res.status(401).json({ message: "Authentication token required" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Session expired or invalid token" });
    }
    req.user = decoded;
    next();
  });
}

// ----------------------------------------------------
// Health & Root Endpoints
// ----------------------------------------------------
app.get("/", (req, res) => {
  res.json({
    status: "UP",
    service: "SkillSphere Backend API",
    message: "SkillSphere Backend is running",
    apiBase: "/api",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "UP",
    service: "SkillSphere Backend API",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "Connected to Neon PostgreSQL!",
      databaseTime: result.rows[0].now,
    });
  } catch (error) {
    console.error("Database connection error:", error.message);
    res.status(500).json({
      message: "Database connection failed",
      error: error.message,
    });
  }
});

// ----------------------------------------------------
// Authentication Endpoints
// ----------------------------------------------------
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const existing = await pool.query("SELECT id FROM users WHERE email = $1", [trimmedEmail]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, 'student')
       RETURNING id, name, email, role`,
      [name.trim(), trimmedEmail, hashedPassword]
    );

    const user = result.rows[0];
    res.json({
      message: "Registration successful",
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Register error:", error.message);
    res.status(500).json({ message: "Registration failed: " + error.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [trimmedEmail]);
    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ sub: user.email, id: user.id }, JWT_SECRET, { expiresIn: "24h" });

    res.json({
      message: "Login successful",
      token,
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Login failed: " + error.message });
  }
});

// ----------------------------------------------------
// Student Search & Directory
// ----------------------------------------------------
app.get("/api/students", async (req, res) => {
  try {
    const { skill, department, year } = req.query;
    let query = `
      SELECT u.id, u.name, u.email, u.role,
             p.bio, p.college, p.department, p.year, p.location,
             p.github_url AS "githubUrl", p.linkedin_url AS "linkedinUrl", p.career_goal AS "careerGoal"
      FROM users u
      LEFT JOIN student_profiles p ON u.id = p.user_id
      WHERE 1=1
    `;
    const params = [];

    if (department) {
      params.push(department);
      query += ` AND p.department = $${params.length}`;
    }
    if (year) {
      params.push(year);
      query += ` AND p.year = $${params.length}`;
    }
    if (skill) {
      params.push(skill.toLowerCase());
      query += ` AND u.id IN (
        SELECT ss.user_id FROM student_skills ss
        JOIN skills s ON ss.skill_id = s.id
        WHERE LOWER(s.name) = $${params.length}
      )`;
    }

    const result = await pool.query(query, params);

    // Fetch skills for each student
    const studentIds = result.rows.map((r) => r.id);
    let skillsMap = {};
    if (studentIds.length > 0) {
      const skillsRes = await pool.query(
        `SELECT ss.user_id, s.name, ss.proficiency
         FROM student_skills ss
         JOIN skills s ON ss.skill_id = s.id
         WHERE ss.user_id = ANY($1)`,
        [studentIds]
      );
      for (const row of skillsRes.rows) {
        if (!skillsMap[row.user_id]) skillsMap[row.user_id] = [];
        skillsMap[row.user_id].push({ name: row.name, proficiency: row.proficiency });
      }
    }

    const students = result.rows.map((r) => ({
      ...r,
      skills: skillsMap[r.id] || [],
    }));

    res.json(students);
  } catch (error) {
    console.error("Students error:", error.message);
    res.status(500).json({ message: "Failed to fetch students" });
  }
});

// ----------------------------------------------------
// Profile Endpoints
// ----------------------------------------------------
app.get("/api/profile/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query(
      `SELECT u.id AS "userId", u.name, u.email, u.role,
              p.id, p.bio, p.college, p.department, p.year, p.location,
              p.github_url AS "githubUrl", p.linkedin_url AS "linkedinUrl", p.career_goal AS "careerGoal"
       FROM users u
       LEFT JOIN student_profiles p ON u.id = p.user_id
       WHERE u.id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const row = result.rows[0];
    res.json(row);
  } catch (error) {
    console.error("Get profile error:", error.message);
    res.status(500).json({ message: "Failed to get profile" });
  }
});

async function upsertProfile(req, res) {
  try {
    const { userId } = req.params;
    const { bio, college, department, year, location, githubUrl, linkedinUrl, careerGoal } = req.body;

    const existing = await pool.query("SELECT id FROM student_profiles WHERE user_id = $1", [userId]);
    let result;
    if (existing.rows.length > 0) {
      result = await pool.query(
        `UPDATE student_profiles
         SET bio = $1, college = $2, department = $3, year = $4, location = $5,
             github_url = $6, linkedin_url = $7, career_goal = $8, updated_at = CURRENT_TIMESTAMP
         WHERE user_id = $9
         RETURNING *`,
        [bio, college, department, year, location, githubUrl, linkedinUrl, careerGoal, userId]
      );
    } else {
      result = await pool.query(
        `INSERT INTO student_profiles (user_id, bio, college, department, year, location, github_url, linkedin_url, career_goal)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         RETURNING *`,
        [userId, bio, college, department, year, location, githubUrl, linkedinUrl, careerGoal]
      );
    }

    const userRes = await pool.query("SELECT name, email, role FROM users WHERE id = $1", [userId]);
    const u = userRes.rows[0] || {};

    res.json({
      id: result.rows[0].id,
      userId: Number(userId),
      name: u.name,
      email: u.email,
      role: u.role,
      bio,
      college,
      department,
      year,
      location,
      githubUrl,
      linkedinUrl,
      careerGoal,
    });
  } catch (error) {
    console.error("Save profile error:", error.message);
    res.status(500).json({ message: "Failed to save profile: " + error.message });
  }
}

app.post("/api/profile/:userId", upsertProfile);
app.put("/api/profile/:userId", upsertProfile);

// ----------------------------------------------------
// Skills Endpoints
// ----------------------------------------------------
app.get("/api/skills", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM skills ORDER BY name ASC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch skills" });
  }
});

app.post("/api/skills", async (req, res) => {
  try {
    const { name, category } = req.body;
    if (!name) return res.status(400).json({ message: "Skill name is required" });
    const result = await pool.query(
      "INSERT INTO skills (name, category) VALUES ($1, $2) ON CONFLICT (name) DO UPDATE SET category = EXCLUDED.category RETURNING *",
      [name.trim(), category || "Technical"]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to create skill" });
  }
});

// Student Skills
app.get("/api/student-skills/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query(
      `SELECT ss.id, ss.user_id AS "userId", ss.skill_id AS "skillId", s.name AS "skillName", ss.proficiency
       FROM student_skills ss
       JOIN skills s ON ss.skill_id = s.id
       WHERE ss.user_id = $1`,
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch student skills" });
  }
});

app.post("/api/student-skills/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { skillId, proficiency } = req.body;
    const result = await pool.query(
      `INSERT INTO student_skills (user_id, skill_id, proficiency)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, skill_id) DO UPDATE SET proficiency = EXCLUDED.proficiency
       RETURNING *`,
      [userId, skillId, proficiency || "Intermediate"]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to add student skill" });
  }
});

app.delete("/api/student-skills/:userId/:skillId", async (req, res) => {
  try {
    const { userId, skillId } = req.params;
    await pool.query("DELETE FROM student_skills WHERE user_id = $1 AND skill_id = $2", [userId, skillId]);
    res.json({ message: "Skill removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove student skill" });
  }
});

// ----------------------------------------------------
// Projects Endpoints
// ----------------------------------------------------
app.get("/api/projects", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT p.id, p.title, p.description, p.status, p.created_at AS "createdAt",
              u.id AS "ownerId", u.name AS "ownerName"
       FROM projects p
       JOIN users u ON p.owner_id = u.id
       ORDER BY p.created_at DESC`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

app.post("/api/projects", async (req, res) => {
  try {
    const { title, description, ownerId, status } = req.body;
    if (!title) return res.status(400).json({ message: "Project title is required" });
    const result = await pool.query(
      `INSERT INTO projects (title, description, owner_id, status)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, description || "", ownerId || 1, status || "Open"]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to create project" });
  }
});

app.get("/api/projects/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params;
    const result = await pool.query("SELECT * FROM projects WHERE id = $1", [projectId]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Project not found" });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to get project" });
  }
});

app.get("/api/projects/:projectId/members", async (req, res) => {
  try {
    const { projectId } = req.params;
    const result = await pool.query(
      `SELECT pm.id, pm.project_id AS "projectId", pm.user_id AS "userId",
              u.name, u.email, pm.joined_at AS "joinedAt"
       FROM project_members pm
       JOIN users u ON pm.user_id = u.id
       WHERE pm.project_id = $1`,
      [projectId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch project members" });
  }
});

app.post("/api/projects/:projectId/members", async (req, res) => {
  try {
    const { projectId } = req.params;
    const { userId } = req.body;
    const result = await pool.query(
      `INSERT INTO project_members (project_id, user_id)
       VALUES ($1, $2)
       ON CONFLICT (project_id, user_id) DO NOTHING
       RETURNING *`,
      [projectId, userId]
    );
    res.json(result.rows[0] || { message: "Already a member" });
  } catch (error) {
    res.status(500).json({ message: "Failed to join project" });
  }
});

app.post("/api/projects/:projectId/skills", async (req, res) => {
  try {
    const { projectId } = req.params;
    const { skillId } = req.body;
    const result = await pool.query(
      `INSERT INTO project_skills (project_id, skill_id)
       VALUES ($1, $2)
       ON CONFLICT (project_id, skill_id) DO NOTHING
       RETURNING *`,
      [projectId, skillId]
    );
    res.json(result.rows[0] || { message: "Skill already added to project" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add project skill" });
  }
});

// ----------------------------------------------------
// Mentors & Requests
// ----------------------------------------------------
app.get("/api/mentors", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT m.id, m.user_id AS "userId", u.name, u.email,
              m.expertise, m.experience_years AS "experienceYears", m.availability
       FROM mentors m
       JOIN users u ON m.user_id = u.id`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch mentors" });
  }
});

app.post("/api/mentor-requests", async (req, res) => {
  try {
    const { studentId, mentorId, message } = req.body;
    const result = await pool.query(
      `INSERT INTO mentor_requests (student_id, mentor_id, message, status)
       VALUES ($1, $2, $3, 'Pending')
       RETURNING *`,
      [studentId, mentorId, message || ""]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to create mentor request" });
  }
});

app.get("/api/mentor-requests/student/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const result = await pool.query(
      `SELECT mr.*, u.name AS "mentorName"
       FROM mentor_requests mr
       JOIN mentors m ON mr.mentor_id = m.id
       JOIN users u ON m.user_id = u.id
       WHERE mr.student_id = $1`,
      [studentId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch mentor requests" });
  }
});

// ----------------------------------------------------
// Study Groups
// ----------------------------------------------------
app.get("/api/study-groups", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT sg.id, sg.name, sg.description, sg.created_at AS "createdAt",
              u.name AS "creatorName"
       FROM study_groups sg
       JOIN users u ON sg.created_by = u.id
       ORDER BY sg.created_at DESC`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch study groups" });
  }
});

app.post("/api/study-groups", async (req, res) => {
  try {
    const { name, description, createdBy } = req.body;
    if (!name) return res.status(400).json({ message: "Group name is required" });
    const result = await pool.query(
      `INSERT INTO study_groups (name, description, created_by)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, description || "", createdBy || 1]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to create study group" });
  }
});

app.get("/api/study-groups/:groupId/members", async (req, res) => {
  try {
    const { groupId } = req.params;
    const result = await pool.query(
      `SELECT sgm.id, sgm.group_id AS "groupId", sgm.user_id AS "userId",
              u.name, u.email, sgm.joined_at AS "joinedAt"
       FROM study_group_members sgm
       JOIN users u ON sgm.user_id = u.id
       WHERE sgm.group_id = $1`,
      [groupId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch study group members" });
  }
});

app.post("/api/study-groups/:groupId/members", async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId } = req.body;
    const result = await pool.query(
      `INSERT INTO study_group_members (group_id, user_id)
       VALUES ($1, $2)
       ON CONFLICT (group_id, user_id) DO NOTHING
       RETURNING *`,
      [groupId, userId]
    );
    res.json(result.rows[0] || { message: "Already a member" });
  } catch (error) {
    res.status(500).json({ message: "Failed to join study group" });
  }
});

app.delete("/api/study-groups/:groupId/members/:userId", async (req, res) => {
  try {
    const { groupId, userId } = req.params;
    await pool.query("DELETE FROM study_group_members WHERE group_id = $1 AND user_id = $2", [groupId, userId]);
    res.json({ message: "Left study group" });
  } catch (error) {
    res.status(500).json({ message: "Failed to leave study group" });
  }
});

// ----------------------------------------------------
// AI Features (Team Match, Skill Gap, Learning Path)
// ----------------------------------------------------
app.post("/api/ai/team-match", async (req, res) => {
  try {
    const { currentUserId, requiredSkills = [] } = req.body;
    const skillsLower = requiredSkills.map((s) => s.toLowerCase());

    const result = await pool.query(
      `SELECT u.id, u.name, u.email, p.department, p.year, p.college,
              COALESCE(ARRAY_AGG(s.name) FILTER (WHERE s.name IS NOT NULL), '{}') AS skills
       FROM users u
       LEFT JOIN student_profiles p ON u.id = p.user_id
       LEFT JOIN student_skills ss ON u.id = ss.user_id
       LEFT JOIN skills s ON ss.skill_id = s.id
       WHERE u.id != $1
       GROUP BY u.id, u.name, u.email, p.department, p.year, p.college`,
      [currentUserId || 0]
    );

    const matches = result.rows.map((student) => {
      const studentSkills = student.skills || [];
      const studentSkillsLower = studentSkills.map((s) => s.toLowerCase());
      const matched = skillsLower.filter((s) => studentSkillsLower.includes(s));
      const matchScore = requiredSkills.length > 0 ? Math.round((matched.length / requiredSkills.length) * 100) : 50;

      return {
        id: student.id,
        name: student.name,
        department: student.department || "Engineering",
        year: student.year || "3rd Year",
        matchPercentage: Math.max(matchScore, 40),
        skills: studentSkills,
        matchedSkills: studentSkills.filter((s) => skillsLower.includes(s.toLowerCase())),
      };
    });

    matches.sort((a, b) => b.matchPercentage - a.matchPercentage);
    res.json(matches);
  } catch (error) {
    console.error("Team match error:", error.message);
    res.status(500).json({ message: "Failed to match team" });
  }
});

app.post("/api/ai/skill-gap", async (req, res) => {
  try {
    const { userId, careerGoal } = req.body;
    const userSkillsRes = await pool.query(
      `SELECT s.name FROM student_skills ss
       JOIN skills s ON ss.skill_id = s.id
       WHERE ss.user_id = $1`,
      [userId || 0]
    );
    const userSkills = userSkillsRes.rows.map((r) => r.name.toLowerCase());

    const roleMap = {
      "full stack": ["react", "node.js", "postgresql", "java", "spring boot", "git"],
      backend: ["java", "spring boot", "postgresql", "docker", "rest api"],
      frontend: ["react", "javascript", "css", "html", "tailwind"],
      ai: ["python", "machine learning", "pytorch", "sql", "data analysis"],
    };

    let targetSkills = ["java", "spring boot", "postgresql", "react", "git"];
    const goalLower = (careerGoal || "").toLowerCase();
    for (const [k, v] of Object.entries(roleMap)) {
      if (goalLower.includes(k)) {
        targetSkills = v;
        break;
      }
    }

    const possessed = targetSkills.filter((s) => userSkills.includes(s));
    const missing = targetSkills.filter((s) => !userSkills.includes(s));
    const readiness = Math.round((possessed.length / targetSkills.length) * 100);

    res.json({
      careerGoal: careerGoal || "Software Developer",
      readinessScore: readiness,
      acquiredSkills: possessed,
      missingSkills: missing,
      recommendations: missing.map((s) => `Focus on hands-on project experience with ${s}.`),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to calculate skill gap" });
  }
});

app.post("/api/ai/learning-path", async (req, res) => {
  try {
    const { careerGoal } = req.body;
    const goal = careerGoal || "Software Engineer";

    res.json({
      careerGoal: goal,
      estimatedWeeks: 12,
      steps: [
        { stage: 1, title: "Foundations & Data Structures", duration: "Weeks 1-3", topics: ["Arrays", "Hashing", "Trees", "Graphs"] },
        { stage: 2, title: "Backend Architecture & REST APIs", duration: "Weeks 4-6", topics: ["Spring Boot / Express", "PostgreSQL", "JWT Auth"] },
        { stage: 3, title: "Frontend & Full Stack Integration", duration: "Weeks 7-9", topics: ["React", "Vite", "State Management", "API Consumption"] },
        { stage: 4, title: "Deployment & Production Readiness", duration: "Weeks 10-12", topics: ["Docker", "Cloud Deployment (Render, Vercel)", "CI/CD"] },
      ],
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to generate learning path" });
  }
});

app.post("/api/ai/mentor-recommendations", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT m.id, u.name, m.expertise, m.experience_years AS "experienceYears", m.availability
       FROM mentors m
       JOIN users u ON m.user_id = u.id
       LIMIT 5`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to get mentor recommendations" });
  }
});

// ----------------------------------------------------
// Start Server
// ----------------------------------------------------
app.listen(PORT, () => {
  console.log(`SkillSphere Backend running on port ${PORT}`);
  console.log(`Health endpoint available at http://localhost:${PORT}/api/health`);
});

module.exports = app;