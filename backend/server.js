const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "SkillSphere Backend is running!"
    });
});

// Test database connection
app.get("/api/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.json({
            message: "SkillSphere is connected to Neon PostgreSQL!",
            databaseTime: result.rows[0].now
        });
    } catch (error) {
        console.error("Database connection error:", error);

        res.status(500).json({
            message: "Database connection failed",
            error: error.message
        });
    }
});

// Get all users
app.get("/api/users", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM public.users");

        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching users:", error);

        res.status(500).json({
            message: "Failed to fetch users",
            error: error.message
        });
    }
});

// Register a new student
app.post("/api/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        const existingUser = await pool.query(
            "SELECT id FROM public.users WHERE email = $1",
            [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        const result = await pool.query(
            `INSERT INTO public.users (name, email, password, role)
             VALUES ($1, $2, $3, $4)
             RETURNING id, name, email, role, created_at`,
            [name, email, password, "student"]
        );

        res.status(201).json({
            message: "Student registered successfully",
            user: result.rows[0]
        });

    } catch (error) {
        console.error("Registration error:", error);

        res.status(500).json({
            message: "Registration failed",
            error: error.message
        });
    }
});

// Start server
const PORT = 5000;

app.listen(PORT, () => {
    console.log("SkillSphere backend running on http://localhost:" + PORT);
});