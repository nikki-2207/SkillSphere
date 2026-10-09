# SkillSphere – AI-Powered Campus Skill Exchange & Collaboration Platform

SkillSphere is a full-stack campus collaboration platform designed to connect students based on technical skills, project needs, career goals, and peer mentoring.

---

## 1. Project Overview & Objectives

* **Intelligent Teammate Matching**: Match students with complementary skills for hackathons, capstones, and course projects.
* **Skill Gap Analysis**: Compare student profile skills against industry career paths (e.g., Java Full Stack Developer) and highlight gaps.
* **Personalized Learning Paths**: Generate step-by-step roadmaps from foundational concepts to production deployment.
* **Campus Project Collaboration**: Discover and create campus projects looking for contributors.
* **Mentor & Study Group Network**: Connect junior and senior students, exchange mentorship, and form focused study groups for DSA and placements.

---

## 2. Technology Stack

### Frontend
* **Framework**: React 18+
* **Build Tool**: Vite
* **Styling**: Modern Vanilla CSS, responsive layout, CSS grid & flexbox
* **Icons**: Lucide React
* **Client Architecture**: REST API service integration, JWT session management in `localStorage`

### Backend
* **Language & Runtime**: Java 17
* **Framework**: Spring Boot
* **Security**: Spring Security with stateless JWT Bearer Token Authentication
* **Data Access**: Spring Data JPA / Hibernate
* **Build Tool**: Apache Maven (Wrapper included)

### Database
* **Database**: PostgreSQL 16+
* **Hosting**: Neon Cloud PostgreSQL (Serverless connection pooling with SSL)
* **Schema**: Relational schema covering users, student profiles, skills, student skills, projects, project members, mentors, and study groups.

---

## 3. System Architecture & Request Flow

```
[ React + Vite Client (Port 5173) ]
           │
           │ HTTP REST Requests + Bearer JWT
           ▼
[ Spring Boot API Server (Port 8080) ]
     ├─ CORS & Security Filter Chain (JwtAuthenticationFilter)
     ├─ REST Controllers (/api/auth, /api/students, /api/ai/team-match, etc.)
     ├─ Service Layer (TeamMatchService, SkillGapService, LearningPathService, etc.)
     └─ Spring Data JPA Repositories
           │
           │ HikariCP Connection Pool (SSL enabled)
           ▼
[ Neon Cloud PostgreSQL Database ]
```

---

## 4. Key Implemented Features

1. **Authentication & Session Persistence**:
   * Student registration and login with BCrypt password hashing.
   * Secure JWT generation and Bearer token verification.
   * User state persisted in browser with graceful logout.

2. **Dashboard**:
   * Real-time statistics fetched from Neon PostgreSQL (Skills, Registered Students, Projects, and Profile Completion %).
   * Live campus feed of registered students and active projects.

3. **AI Team Match (Core Feature)**:
   * Rule-based transparent skill matching algorithm.
   * Interactive input and quick-tag selection (Java, Spring Boot, React, Python, SQL, DSA).
   * Ranks eligible peers with match compatibility %, matched skill badges, and missing skill badges.
   * Connect and invite actions with instant UI feedback.

4. **My Profile & Skill Management**:
   * Retrieve and edit profile fields (Bio, Department, Year, College, Location, Career Goal, GitHub, LinkedIn).
   * Add technical skills with proficiency ratings (Beginner, Intermediate, Advanced) and delete skills.
   * Changes persist in PostgreSQL across page reloads.

5. **Skill Gap Analysis**:
   * Evaluates student's current skills against target role curriculum (Java Full Stack, Backend, Frontend).
   * Calculates Career Readiness Score (%) and prioritizes missing skill gaps.

6. **Learning Path Roadmap**:
   * Interactive sequence of stages with timelines, core topics, and milestone indicators.

7. **Projects**:
   * Discover open campus projects.
   * Create new projects with title and description.
   * Join projects with persistent membership tracking.

8. **Mentors & Study Groups**:
   * Mentor directory with years of experience and availability.
   * Submit mentorship requests.
   * Create and join campus study groups for DSA and placement preparation.

---

## 5. Local Setup & Execution Guide

### Prerequisites
* **Java**: JDK 17 or higher (`java -version`)
* **Node.js**: v18 or higher (`node -v`)
* **Maven**: Built-in wrapper (`mvnw.cmd` on Windows, `./mvnw` on Linux/macOS)

### Step 1: Start Backend
```powershell
cd backend
.\mvnw.cmd spring-boot:run
```
The backend server starts on `http://localhost:8080`.
Verify health check at `http://localhost:8080/api/health`.

### Step 2: Start Frontend
```powershell
cd frontend
npm install
npm run dev
```
Open your browser at `http://localhost:5173`.

---

## 6. Testing & Build Commands

* **Backend Compilation & Tests**:
  ```powershell
  cd backend
  .\mvnw.cmd test
  ```
* **Frontend Production Build**:
  ```powershell
  cd frontend
  npm run build
  ```

---

## 7. Cloud Deployment Configuration

### Frontend (e.g., Vercel / Netlify / Render Static)
* **Build Command**: `npm run build`
* **Publish Directory**: `dist`
* **Environment Variable**:
  * `VITE_API_BASE_URL`: `https://<your-backend-domain>/api`

### Backend (e.g., Render / Railway / Koyeb)
* **Runtime**: Java 17
* **Build Command**: `./mvnw clean package -DskipTests`
* **Start Command**: `java -jar target/backend-0.0.1-SNAPSHOT.jar`
* **Environment Variables**:
  * `PORT`: `8080` (or assigned by host)
  * `SPRING_DATASOURCE_URL`: Your Neon PostgreSQL JDBC URL
  * `SPRING_DATASOURCE_USERNAME`: Database user
  * `SPRING_DATASOURCE_PASSWORD`: Database password
  * `JWT_SECRET`: Secure random 32+ character key
  * `ALLOWED_ORIGINS`: `https://<your-frontend-domain>`
