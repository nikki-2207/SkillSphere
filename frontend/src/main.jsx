import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight, Sparkles, Users, BrainCircuit, Target, BookOpen, ShieldCheck,
  Search, Bell, ChevronDown, LayoutDashboard, UserRound, Wrench, FolderKanban,
  GraduationCap, UsersRound, Settings, LogOut, Menu, X, Plus, CheckCircle2,
  MapPin, Clock3, Star, TrendingUp, Zap, Send, ChevronRight, Trash2, AlertCircle
} from "lucide-react";
import "./index.css";
import {
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
  getStoredUser,
  getStudents,
  getProjects,
  getSkills,
  createSkill,
  getStudentProfile,
  saveStudentProfile,
  getStudentSkills,
  addStudentSkill,
  removeStudentSkill,
  createProject,
  joinProject,
  getTeamMatches,
  getLearningPath,
  getSkillGap,
  getMentors,
  createMentorRequest,
  getStudyGroups,
  createStudyGroup,
  joinStudyGroup,
  leaveStudyGroup,
} from "./api/skillsphereApi";

function getInitials(name) {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function Logo() {
  return (
    <div className="logo">
      <span className="logo-mark"><Sparkles size={17} /></span>
      <span>Skill<span>Sphere</span></span>
    </div>
  );
}

function Landing({ onGetStarted, onLogin }) {
  return (
    <div className="landing">
      <header className="landing-nav container">
        <Logo />
        <nav>
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <a href="#about">Why SkillSphere</a>
        </nav>
        <div className="nav-actions">
          <button className="btn btn-ghost" onClick={onLogin}>Log in</button>
          <button className="btn btn-primary" onClick={onGetStarted}>Get Started <ArrowRight size={16} /></button>
        </div>
      </header>

      <main>
        <section className="hero container">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={15} /> AI-powered campus collaboration</div>
            <h1>Turn your <span>skills</span> into your next opportunity.</h1>
            <p>Find the right teammates, mentors and learning paths based on what you know, what you need and where you want to go.</p>
            <div className="hero-actions">
              <button className="btn btn-primary btn-lg" onClick={onGetStarted}>Build your skill profile <ArrowRight size={18} /></button>
              <button className="btn btn-soft btn-lg" onClick={onLogin}>Explore the platform</button>
            </div>
            <div className="hero-proof"><CheckCircle2 size={17} /> Built for students, projects and placement goals</div>
          </div>
          <div className="hero-visual">
            <div className="glow"></div>
            <div className="mock-window">
              <div className="mock-top"><span></span><span></span><span></span><b>SkillSphere</b></div>
              <div className="mock-body">
                <div className="mini-sidebar"><div className="mini-logo">✦</div><i></i><i></i><i></i><i></i><i></i></div>
                <div className="mini-content">
                  <div className="mini-title"><div><small>Campus Network</small><strong>Your sphere is live.</strong></div><div className="avatar">SS</div></div>
                  <div className="mini-stats"><div><b>18+</b><small>Skills</small></div><div><b>AI</b><small>Match</small></div><div><b>Live</b><small>Collab</small></div></div>
                  <div className="mini-grid">
                    <div className="mini-card">
                      <small>✦ AI Team Matches</small>
                      <div className="person"><div className="avatar sm">AS</div><div><b>Campus Developer</b><small>React • Java • SQL</small></div><em>95%</em></div>
                    </div>
                    <div className="mini-card progress-card">
                      <small>Campus Readiness</small>
                      <strong>100%</strong>
                      <div className="progress"><span style={{ width: "100%" }}></span></div>
                      <small>All features connected</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="section container">
          <div className="section-head">
            <div><span className="section-kicker">ONE PLATFORM</span><h2>Everything you need to grow together.</h2></div>
            <p>SkillSphere connects your skills to people, projects and opportunities around your campus.</p>
          </div>
          <div className="feature-grid">
            <Feature icon={<Users />} title="Smart Teammates" text="Discover students whose skills complement your project." />
            <Feature icon={<BrainCircuit />} title="AI Skill Gap" text="See what skills you need for your target career." />
            <Feature icon={<GraduationCap />} title="Mentor Matching" text="Connect with seniors and mentors who fit your goals." />
            <Feature icon={<BookOpen />} title="Learning Paths" text="Get a practical roadmap from your current level to your goal." />
          </div>
        </section>

        <section id="how" className="how-section">
          <div className="container">
            <div className="center-head"><span className="section-kicker">HOW IT WORKS</span><h2>From skills to collaboration in four steps.</h2></div>
            <div className="steps">
              <Step n="01" title="Create your profile" text="Tell us your skills, interests and career goal." />
              <Step n="02" title="Tell us what you need" text="Looking for a teammate, mentor or skill? Just ask." />
              <Step n="03" title="Get matched" text="SkillSphere ranks the people and opportunities that fit." />
              <Step n="04" title="Build together" text="Connect, collaborate and grow your skills." />
            </div>
          </div>
        </section>

        <section id="about" className="cta-section container">
          <div>
            <span className="section-kicker light">YOUR CAMPUS, CONNECTED</span>
            <h2>Your next teammate might already be one search away.</h2>
            <p>Build a stronger profile. Find the missing skill. Start something meaningful.</p>
          </div>
          <button className="btn btn-white btn-lg" onClick={onGetStarted}>Get Started <ArrowRight size={18} /></button>
        </section>
      </main>
      <footer className="footer container"><Logo /><span>© 2026 SkillSphere. Built for campus collaboration.</span></footer>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return <div className="feature-card"><div className="feature-icon">{icon}</div><h3>{title}</h3><p>{text}</p><ChevronRight size={18} /></div>;
}

function Step({ n, title, text }) {
  return <div className="step"><div className="step-number">{n}</div><h3>{title}</h3><p>{text}</p></div>;
}

function Auth({ mode, onBack, onSuccess }) {
  const isLogin = mode === "login";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const password = formData.get("password")?.toString() || "";

    try {
      if (isLogin) {
        const user = await apiLogin(email, password);
        onSuccess(user);
      } else {
        await apiRegister(name, email, password);
        setSuccessMsg("Account created successfully! Signing you in...");
        // Automatically login the newly created user
        const user = await apiLogin(email, password);
        onSuccess(user);
      }
    } catch (err) {
      setError(err.message || "Authentication failed. Please check your details.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-brand">
        <Logo />
        <button className="btn btn-ghost" type="button" onClick={onBack}>
          ← Back to website
        </button>
      </div>

      <div className="auth-wrap">
        <div className="auth-copy">
          <div className="eyebrow"><Sparkles size={15} /> Welcome to your campus sphere</div>
          <h1>{isLogin ? "Welcome back." : "Build your skill profile."}</h1>
          <p>{isLogin ? "Continue discovering people, projects and learning opportunities." : "Create one profile and let SkillSphere connect you to the right people."}</p>
          <div className="auth-benefits">
            <div><CheckCircle2 /> Smart teammate recommendations</div>
            <div><CheckCircle2 /> Skill gap and learning insights</div>
            <div><CheckCircle2 /> Projects, mentors and study groups</div>
          </div>
        </div>

        <form className="auth-card" onSubmit={handleSubmit}>
          <h2>{isLogin ? "Sign in" : "Create account"}</h2>
          <p className="muted">{isLogin ? "Enter your campus credentials to continue." : "It takes less than a minute."}</p>

          {!isLogin && (
            <label>
              Full name
              <input name="name" placeholder="e.g. Nikhitha Velisetti" autoComplete="name" required />
            </label>
          )}

          <label>
            Email address
            <input name="email" type="email" placeholder="you@college.edu" autoComplete="email" required />
          </label>

          <label>
            Password
            <input name="password" type="password" placeholder="••••••••" autoComplete={isLogin ? "current-password" : "new-password"} required />
          </label>

          {error && <p role="alert" style={{ color: "#dc2626", fontSize: "14px", marginTop: "8px" }}>{error}</p>}
          {successMsg && <p role="status" style={{ color: "#16a34a", fontSize: "14px", marginTop: "8px" }}>{successMsg}</p>}

          <button className="btn btn-primary full" type="submit" disabled={loading} style={{ marginTop: "16px" }}>
            {loading ? "Please wait..." : isLogin ? "Sign in" : "Create my account"}
            {!loading && <ArrowRight size={17} />}
          </button>

          <div className="auth-switch">
            {isLogin ? "New to SkillSphere?" : "Already have an account?"}{" "}
            <button type="button" onClick={onBack}>
              {isLogin ? "Create account" : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Sidebar({ page, setPage, mobile, setMobile, onLogout }) {
  const items = [
    ["Dashboard", LayoutDashboard],
    ["My Profile", UserRound],
    ["My Skills", Wrench],
    ["Students", UsersRound],
    ["Projects", FolderKanban],
    ["Mentors", GraduationCap],
    ["Study Groups", Users],
  ];

  return (
    <>
      <div className={`sidebar ${mobile ? "show" : ""}`}>
        <div className="side-top">
          <Logo />
          <button className="mobile-close" onClick={() => setMobile(false)}><X /></button>
        </div>
        <div className="side-label">WORKSPACE</div>
        {items.map(([label, Icon]) => (
          <button
            key={label}
            className={`side-item ${page === label ? "active" : ""}`}
            onClick={() => { setPage(label); setMobile(false); }}
          >
            <Icon size={18} />{label}
          </button>
        ))}
        <div className="side-label ai-label">AI TOOLS</div>
        {["AI Team Match", "Skill Gap", "Learning Path"].map((label, i) => (
          <button
            key={label}
            className={`side-item ${page === label ? "active" : ""}`}
            onClick={() => { setPage(label); setMobile(false); }}
          >
            <Sparkles size={18} />{label}
            <span className="ai-dot">{i === 0 ? "POPULAR" : ""}</span>
          </button>
        ))}
        <div className="side-bottom">
          <button className="side-item" onClick={onLogout}>
            <LogOut size={18} />Logout
          </button>
        </div>
      </div>
      <div className={`mobile-overlay ${mobile ? "show" : ""}`} onClick={() => setMobile(false)}></div>
    </>
  );
}

function Topbar({ page, setMobile, user, onLogout }) {
  const name = user?.name || "Student";
  const initials = getInitials(name);
  const role = user?.role ? (user.role.charAt(0).toUpperCase() + user.role.slice(1)) : "Student";

  return (
    <header className="topbar">
      <button className="menu-btn" onClick={() => setMobile(true)}><Menu /></button>
      <div><span className="crumb">Workspace / </span><b>{page}</b></div>
      <div className="top-actions">
        <button className="icon-btn" title="Notifications"><Bell size={18} /><i></i></button>
        <div className="top-user" style={{ cursor: "pointer" }} onClick={onLogout} title="Click to logout">
          <div className="avatar">{initials}</div>
          <div><b>{name}</b><small>{role} • Logout</small></div>
        </div>
      </div>
    </header>
  );
}

// -------------------------------------------------------------
// DASHBOARD
// -------------------------------------------------------------
function Dashboard({ setPage, user }) {
  const [dashboardStudents, setDashboardStudents] = useState([]);
  const [dashboardProjects, setDashboardProjects] = useState([]);
  const [dashboardSkills, setDashboardSkills] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadData() {
      setLoading(true);
      setError("");

      try {
        const [studentsRes, projectsRes, skillsRes] = await Promise.allSettled([
          getStudents(),
          getProjects(),
          getSkills(),
        ]);

        if (active) {
          if (studentsRes.status === "fulfilled" && Array.isArray(studentsRes.value)) {
            setDashboardStudents(studentsRes.value);
          }
          if (projectsRes.status === "fulfilled" && Array.isArray(projectsRes.value)) {
            setDashboardProjects(projectsRes.value);
          }
          if (skillsRes.status === "fulfilled" && Array.isArray(skillsRes.value)) {
            setDashboardSkills(skillsRes.value);
          }
        }

        if (user?.id) {
          try {
            const prof = await getStudentProfile(user.id);
            if (active) setUserProfile(prof);
          } catch {
            // Profile may not exist yet, safe to ignore
          }
        }
      } catch (err) {
        if (active) setError(err.message || "Failed to load dashboard data.");
      } finally {
        if (active) setLoading(false);
      }
    }

    loadData();
    return () => { active = false; };
  }, [user]);

  // Profile completion calculation
  const fields = [
    userProfile?.department,
    userProfile?.year,
    userProfile?.bio,
    userProfile?.careerGoal,
    userProfile?.location,
  ].filter(Boolean).length;
  const profilePercent = Math.min(100, Math.round((fields / 5) * 80 + 20));

  return (
    <div className="page-content">
      <div className="welcome-banner">
        <div>
          <span className="banner-kicker"><Sparkles size={14} /> AI CAMPUS HUB</span>
          <h1>Welcome, {user?.name || "Student"} 👋</h1>
          <p>{loading ? "Loading campus opportunities..." : "Here is your live campus network on SkillSphere."}</p>
        </div>
        <button className="btn btn-white" onClick={() => setPage("AI Team Match")}>
          Find teammates <ArrowRight size={16} />
        </button>
      </div>

      {error && (
        <div className="panel" style={{ borderLeft: "4px solid #ef4444", margin: "16px 0" }}>
          <p style={{ color: "#b91c1c" }}>Notice: {error}</p>
        </div>
      )}

      <div className="stats-row">
        <Stat
          icon={<Wrench />}
          value={loading ? "..." : String(dashboardSkills.length).padStart(2, "0")}
          label="Skills in Database"
          trend="Neon PostgreSQL"
        />
        <Stat
          icon={<Target />}
          value={loading ? "..." : String(dashboardStudents.length).padStart(2, "0")}
          label="Registered Students"
          trend="Live campus network"
        />
        <Stat
          icon={<FolderKanban />}
          value={loading ? "..." : String(dashboardProjects.length).padStart(2, "0")}
          label="Campus Projects"
          trend="Active collaborations"
        />
        <Stat
          icon={<Users />}
          value={loading ? "..." : `${profilePercent}%`}
          label="Profile Completion"
          trend="Campus readiness"
        />
      </div>

      <div className="content-grid">
        <section className="panel">
          <div className="panel-head">
            <div>
              <span className="section-kicker">CAMPUS NETWORK</span>
              <h2>Students on SkillSphere</h2>
            </div>
            <button className="text-btn" onClick={() => setPage("Students")}>
              View all students <ArrowRight size={15} />
            </button>
          </div>

          {loading ? (
            <p className="muted">Loading students from PostgreSQL...</p>
          ) : dashboardStudents.length > 0 ? (
            dashboardStudents.slice(0, 5).map((student) => (
              <StudentRow
                key={student.userId || student.id || student.email}
                student={student}
                onSelect={() => setPage("AI Team Match")}
              />
            ))
          ) : (
            <p className="muted">No student profiles found in the database yet.</p>
          )}
        </section>

        <section className="panel profile-progress">
          <div className="panel-head">
            <div>
              <span className="section-kicker">YOUR PROFILE</span>
              <h2>Profile Strength</h2>
            </div>
            <TrendingUp size={19} />
          </div>
          <div className="big-progress">{profilePercent}<span>%</span></div>
          <div className="progress"><span style={{ width: `${profilePercent}%` }}></span></div>
          <p style={{ marginTop: "12px" }}>
            {profilePercent >= 80
              ? "Your profile is well-rounded! Teammates can easily find and connect with you."
              : "Complete your department, bio, and career goal to boost your AI match score."}
          </p>
          <button className="btn btn-soft full" onClick={() => setPage("My Profile")}>
            Complete profile <ArrowRight size={16} />
          </button>
        </section>
      </div>

      <section className="panel">
        <div className="panel-head">
          <div>
            <span className="section-kicker">PROJECTS</span>
            <h2>Projects looking for teammates</h2>
          </div>
          <button className="text-btn" onClick={() => setPage("Projects")}>
            Explore projects <ArrowRight size={15} />
          </button>
        </div>

        {loading ? (
          <p className="muted">Loading projects from backend...</p>
        ) : dashboardProjects.length > 0 ? (
          <div className="project-grid">
            {dashboardProjects.slice(0, 6).map((project) => (
              <ProjectCard key={project.id || project.title} project={project} onAction={() => setPage("Projects")} />
            ))}
          </div>
        ) : (
          <p className="muted">No campus projects available yet. Create the first one!</p>
        )}
      </section>
    </div>
  );
}

function Stat({ icon, value, label, trend }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div><strong>{value}</strong><span>{label}</span><small>{trend}</small></div>
    </div>
  );
}

function StudentRow({ student, onSelect }) {
  const name = student.name || "Student";
  const initials = getInitials(name);
  const course = [student.department, student.year].filter(Boolean).join(" • ") || student.course || "Student";
  const location = student.location || student.college || "Campus";
  const skillsList = Array.isArray(student.skills) ? student.skills : [];

  return (
    <div className="student-row">
      <div className="avatar">{initials}</div>
      <div className="student-info">
        <b>{name}</b>
        <span>{course} • {location}</span>
        <div className="tags">
          {skillsList.map((skill) => (
            <em key={skill}>{skill}</em>
          ))}
        </div>
      </div>
      <button className="icon-btn" onClick={onSelect} title="Find team match">
        <Send size={16} />
      </button>
    </div>
  );
}

function ProjectCard({ project, onAction }) {
  const title = project.title || "Untitled Project";
  const description = project.description || "No project description provided.";
  const status = project.status || "OPEN";
  const members = project.members ?? 1;

  return (
    <div className="project-card">
      <div className="project-status">{status}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="project-bottom">
        <span><Users size={14} /> {members} {members === 1 ? "member" : "members"}</span>
        <button className="text-btn" onClick={onAction}>
          Details <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// MY PROFILE
// -------------------------------------------------------------
function Profile({ user }) {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const [formData, setFormData] = useState({
    bio: "",
    college: "",
    department: "",
    year: "",
    location: "",
    careerGoal: "",
    githubUrl: "",
    linkedinUrl: "",
  });

  useEffect(() => {
    async function loadProfile() {
      if (!user?.id) return;
      setLoading(true);
      try {
        const [profData, skillsData] = await Promise.allSettled([
          getStudentProfile(user.id),
          getStudentSkills(user.id),
        ]);

        if (profData.status === "fulfilled" && profData.value) {
          setProfile(profData.value);
          setFormData({
            bio: profData.value.bio || "",
            college: profData.value.college || "",
            department: profData.value.department || "",
            year: profData.value.year || "",
            location: profData.value.location || "",
            careerGoal: profData.value.careerGoal || "",
            githubUrl: profData.value.githubUrl || "",
            linkedinUrl: profData.value.linkedinUrl || "",
          });
        }
        if (skillsData.status === "fulfilled" && Array.isArray(skillsData.value)) {
          setSkills(skillsData.value);
        }
      } catch (e) {
        console.error("Failed to load profile:", e);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [user]);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    try {
      const res = await saveStudentProfile(user.id, formData, !!profile);
      setProfile(res);
      setIsEditing(false);
      setMsg("Profile saved successfully to PostgreSQL!");
      setTimeout(() => setMsg(""), 4000);
    } catch (err) {
      alert(err.message || "Failed to save profile.");
    } finally {
      setSaving(false);
    }
  }

  const name = user?.name || profile?.name || "Student";
  const initials = getInitials(name);

  return (
    <div className="page-content">
      <div className="profile-hero">
        <div className="profile-avatar">{initials}</div>
        <div className="profile-main">
          <span className="section-kicker">STUDENT PROFILE</span>
          <h1>{name}</h1>
          <p>
            {[profile?.department || "Computer Science", profile?.year || "3rd Year", profile?.college || "Campus"]
              .filter(Boolean)
              .join(" • ")}
          </p>
          <div className="tags">
            {skills.map((s) => (
              <em key={s.id || s.skill?.id || s.skillName}>
                {s.skill?.name || s.skillName || "Skill"} ({s.proficiency || "Intermediate"})
              </em>
            ))}
            {skills.length === 0 && <small className="muted">No skills added yet</small>}
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Edit profile"}
        </button>
      </div>

      {msg && (
        <div className="panel" style={{ background: "#ecfdf5", border: "1px solid #10b981", color: "#065f46", marginBottom: "16px" }}>
          <CheckCircle2 size={16} style={{ display: "inline", verticalAlign: "middle", marginRight: "8px" }} />
          {msg}
        </div>
      )}

      {isEditing ? (
        <form className="panel" onSubmit={handleSave}>
          <div className="panel-head"><h2>Edit Your Profile Information</h2></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <label>
              Department / Major
              <input
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                placeholder="e.g. Computer Science & Engineering"
                required
              />
            </label>
            <label>
              Current Year
              <input
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder="e.g. 3rd Year"
                required
              />
            </label>
            <label>
              College / University
              <input
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                placeholder="e.g. Campus Engineering College"
              />
            </label>
            <label>
              Location / City
              <input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Hyderabad, India"
              />
            </label>
            <label style={{ gridColumn: "1 / -1" }}>
              Career Goal
              <input
                value={formData.careerGoal}
                onChange={(e) => setFormData({ ...formData, careerGoal: e.target.value })}
                placeholder="e.g. Java Full Stack Developer, AI Engineer, Cloud Architect"
                required
              />
            </label>
            <label style={{ gridColumn: "1 / -1" }}>
              About / Bio
              <textarea
                rows={3}
                style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "1px solid #dddde7", marginTop: "7px" }}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Share your interests, current projects, and what teammates you want to collaborate with..."
              />
            </label>
            <label>
              GitHub URL
              <input
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                placeholder="https://github.com/yourhandle"
              />
            </label>
            <label>
              LinkedIn URL
              <input
                value={formData.linkedinUrl}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                placeholder="https://linkedin.com/in/yourhandle"
              />
            </label>
          </div>
          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <button className="btn btn-primary" type="submit" disabled={saving}>
              {saving ? "Saving to Database..." : "Save Changes"}
            </button>
            <button className="btn btn-ghost" type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="two-col">
          <section className="panel">
            <div className="panel-head"><h2>About</h2></div>
            <p className="large-text">
              {profile?.bio || "No bio added yet. Click 'Edit profile' to add your summary, background, and project interests."}
            </p>
            <div className="info-grid">
              <Info label="Career Goal" value={profile?.careerGoal || "Not specified"} />
              <Info label="College" value={profile?.college || "Not specified"} />
              <Info label="Department" value={profile?.department || "Not specified"} />
              <Info label="Year" value={profile?.year || "Not specified"} />
              <Info label="Location" value={profile?.location || "Not specified"} />
              <Info label="Email" value={user?.email || "Campus Account"} />
            </div>
          </section>

          <section className="panel">
            <div className="panel-head">
              <h2>My Technical Skills</h2>
            </div>
            {skills.length > 0 ? (
              skills.map((s, i) => {
                const sName = s.skill?.name || s.skillName || "Skill";
                const prof = s.proficiency || "Intermediate";
                const pct = prof === "Advanced" ? 85 : prof === "Intermediate" ? 65 : 40;
                return (
                  <div className="skill-line" key={s.id || sName || i}>
                    <span>{sName}</span>
                    <div className="progress"><span style={{ width: `${pct}%` }}></span></div>
                    <small>{prof}</small>
                  </div>
                );
              })
            ) : (
              <p className="muted">No skills added to your profile yet. Visit 'My Skills' to add some!</p>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

function Info({ label, value }) {
  return <div><small>{label}</small><b>{value}</b></div>;
}

// -------------------------------------------------------------
// MY SKILLS
// -------------------------------------------------------------
function Skills({ user, setPage }) {
  const [userSkills, setUserSkills] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSkillId, setSelectedSkillId] = useState("");
  const [customSkillName, setCustomSkillName] = useState("");
  const [proficiency, setProficiency] = useState("Intermediate");
  const [actionLoading, setActionLoading] = useState(false);

  async function loadData() {
    setLoading(true);
    try {
      const [uSkillsRes, aSkillsRes] = await Promise.all([
        getStudentSkills(user?.id),
        getSkills(),
      ]);
      setUserSkills(Array.isArray(uSkillsRes) ? uSkillsRes : []);
      setAllSkills(Array.isArray(aSkillsRes) ? aSkillsRes : []);
    } catch (err) {
      console.error("Error loading skills:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user?.id) loadData();
  }, [user]);

  async function handleAddSkill(e) {
    e.preventDefault();
    setActionLoading(true);

    try {
      let skillId = selectedSkillId;
      if (!skillId && customSkillName.trim()) {
        const created = await createSkill(customSkillName.trim(), "General");
        skillId = created.id;
      }

      if (!skillId) {
        alert("Please select or enter a skill.");
        setActionLoading(false);
        return;
      }

      await addStudentSkill(user.id, skillId, proficiency);
      setShowAddModal(false);
      setSelectedSkillId("");
      setCustomSkillName("");
      await loadData();
    } catch (err) {
      alert(err.message || "Failed to add skill.");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleRemove(skillId) {
    if (!window.confirm("Remove this skill from your profile?")) return;
    try {
      await removeStudentSkill(user.id, skillId);
      await loadData();
    } catch (err) {
      alert(err.message || "Failed to remove skill.");
    }
  }

  return (
    <div className="page-content">
      <div className="page-title-row">
        <div>
          <span className="section-kicker">YOUR SKILL PROFILE</span>
          <h1>My Skills</h1>
          <p>Keep your technical skills updated so AI teammate recommendations become smarter.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          <Plus size={17} /> Add skill
        </button>
      </div>

      {showAddModal && (
        <div className="panel" style={{ border: "2px solid #6355d7", marginBottom: "20px" }}>
          <div className="panel-head">
            <h2>Add a Skill to Your Profile</h2>
            <button className="text-btn" onClick={() => setShowAddModal(false)}>Close</button>
          </div>
          <form onSubmit={handleAddSkill}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <label>
                Select Existing Skill
                <select
                  value={selectedSkillId}
                  onChange={(e) => { setSelectedSkillId(e.target.value); setCustomSkillName(""); }}
                >
                  <option value="">-- Choose from Database --</option>
                  {allSkills.map((s) => (
                    <option key={s.id} value={s.id}>{s.name} ({s.category || "General"})</option>
                  ))}
                </select>
              </label>

              <label>
                Or Enter New Skill Name
                <input
                  value={customSkillName}
                  onChange={(e) => { setCustomSkillName(e.target.value); setSelectedSkillId(""); }}
                  placeholder="e.g. Next.js, FastAPI, Kubernetes"
                />
              </label>

              <label>
                Proficiency Level
                <select value={proficiency} onChange={(e) => setProficiency(e.target.value)}>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </label>
            </div>

            <div style={{ marginTop: "18px", display: "flex", gap: "10px" }}>
              <button className="btn btn-primary" type="submit" disabled={actionLoading}>
                {actionLoading ? "Saving..." : "Add to My Skills"}
              </button>
              <button className="btn btn-ghost" type="button" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="skills-layout">
        <section className="panel">
          <div className="panel-head">
            <h2>Technical Skills</h2>
            <span className="count-pill">{userSkills.length} skills</span>
          </div>

          {loading ? (
            <p className="muted">Loading skills from database...</p>
          ) : userSkills.length > 0 ? (
            <div className="skill-cards">
              {userSkills.map((s) => {
                const skillId = s.skill?.id || s.skillId;
                const skillName = s.skill?.name || s.skillName || "Skill";
                const prof = s.proficiency || "Intermediate";
                const pct = prof === "Advanced" ? 85 : prof === "Intermediate" ? 65 : 40;

                return (
                  <div className="skill-card" key={s.id || skillId}>
                    <div className="skill-card-top">
                      <div className="skill-symbol">{skillName[0]}</div>
                      <button
                        title="Remove skill"
                        style={{ background: "none", cursor: "pointer", color: "#9ca3af" }}
                        onClick={() => handleRemove(skillId)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <h3>{skillName}</h3>
                    <p>{prof}</p>
                    <div className="progress"><span style={{ width: `${pct}%` }}></span></div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "30px 0" }}>
              <p className="muted">You haven't added any skills yet.</p>
              <button className="btn btn-primary" onClick={() => setShowAddModal(true)} style={{ marginTop: "12px" }}>
                Add your first skill
              </button>
            </div>
          )}
        </section>

        <aside className="panel tip-panel">
          <div className="tip-icon"><Sparkles /></div>
          <span className="section-kicker">AI INSIGHT</span>
          <h2>Strengthen your profile</h2>
          <p>
            Adding complementary skills like <b>Spring Boot</b>, <b>REST APIs</b>, or <b>PostgreSQL</b> will dramatically improve your compatibility score in <b>AI Team Match</b>.
          </p>
          <button className="btn btn-soft full" onClick={() => setPage("Learning Path")}>
            Explore learning path <ArrowRight size={16} />
          </button>
        </aside>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// CAMPUS NETWORK / STUDENTS
// -------------------------------------------------------------
function Students({ setPage }) {
  const [studentsList, setStudentsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  async function fetchStudents(filter = activeFilter, query = searchQuery) {
    setLoading(true);
    try {
      const params = {};
      if (filter !== "All") params.skill = filter;
      if (query.trim()) params.skill = query.trim();
      const res = await getStudents(params);
      setStudentsList(Array.isArray(res) ? res : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStudents(activeFilter, searchQuery);
  }, [activeFilter]);

  function handleSearchSubmit(e) {
    e.preventDefault();
    fetchStudents(activeFilter, searchQuery);
  }

  return (
    <div className="page-content">
      <div className="page-title-row">
        <div>
          <span className="section-kicker">CAMPUS NETWORK</span>
          <h1>Find Students</h1>
          <p>Search peers by skills, department, or collaboration interests.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setPage("AI Team Match")}>
          <Sparkles size={16} /> AI Team Match
        </button>
      </div>

      <form className="search-panel" onSubmit={handleSearchSubmit}>
        <Search />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search students by skill (e.g. Java, React, Python)..."
        />
        <button className="btn btn-primary" type="submit">Search</button>
      </form>

      <div className="filter-row">
        {["All", "Java", "React", "Python", "SQL", "Spring Boot", "C++"].map((f) => (
          <button
            key={f}
            className={`filter ${activeFilter === f ? "active" : ""}`}
            onClick={() => { setActiveFilter(f); setSearchQuery(""); }}
          >
            {f === "All" ? "All students" : f}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="muted">Searching students from PostgreSQL...</p>
      ) : studentsList.length > 0 ? (
        <div className="student-grid">
          {studentsList.map((s) => {
            const name = s.name || "Student";
            const initials = getInitials(name);
            const course = [s.department, s.year].filter(Boolean).join(" • ") || "Student";
            const loc = s.location || s.college || "Campus";
            const skillsArr = Array.isArray(s.skills) ? s.skills : [];

            return (
              <div className="student-card" key={s.userId || s.id || s.email}>
                <div className="student-card-top">
                  <div className="avatar large">{initials}</div>
                  <span className="match-badge">Registered</span>
                </div>
                <h3>{name}</h3>
                <p>{course}</p>
                <div className="tags">
                  {skillsArr.map((sk) => (
                    <em key={sk}>{sk}</em>
                  ))}
                  {skillsArr.length === 0 && <small className="muted">Skills not listed yet</small>}
                </div>
                <div className="student-card-bottom">
                  <span><MapPin size={14} /> {loc}</span>
                  <button className="btn btn-soft" onClick={() => setPage("AI Team Match")}>
                    Find match
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="panel" style={{ textAlign: "center", padding: "40px 0" }}>
          <p className="muted">No students found matching your query.</p>
          <button className="btn btn-ghost" onClick={() => { setActiveFilter("All"); setSearchQuery(""); }}>
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// PROJECTS
// -------------------------------------------------------------
function Projects({ user }) {
  const [projectList, setProjectList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Discover");

  async function loadProjects() {
    setLoading(true);
    try {
      const res = await getProjects();
      setProjectList(Array.isArray(res) ? res : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    if (!title.trim()) return;
    setActionLoading(true);

    try {
      await createProject({
        title: title.trim(),
        description: description.trim(),
        createdBy: user?.id || 1,
      });
      setTitle("");
      setDescription("");
      setShowCreateModal(false);
      await loadProjects();
    } catch (err) {
      alert(err.message || "Failed to create project.");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleJoin(projectId) {
    try {
      await joinProject(projectId, user?.id || 1, "Collaborator");
      alert("Successfully requested to join project!");
      await loadProjects();
    } catch (err) {
      alert(err.message || "Failed to join project.");
    }
  }

  const displayedProjects = activeTab === "My Projects"
    ? projectList.filter((p) => p.ownerId === user?.id || p.createdBy === user?.id)
    : projectList;

  return (
    <div className="page-content">
      <div className="page-title-row">
        <div>
          <span className="section-kicker">COLLABORATE</span>
          <h1>Projects</h1>
          <p>Find projects looking for your skills or post your own campus idea.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
          <Plus size={17} /> Create project
        </button>
      </div>

      {showCreateModal && (
        <div className="panel" style={{ border: "2px solid #6355d7", marginBottom: "20px" }}>
          <div className="panel-head">
            <h2>Post a New Campus Project</h2>
            <button className="text-btn" onClick={() => setShowCreateModal(false)}>Close</button>
          </div>
          <form onSubmit={handleCreate}>
            <label>
              Project Title
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Campus Event Hub, AI Placement Tracker"
                required
              />
            </label>
            <label>
              Description & Teammate Needs
              <textarea
                rows={3}
                style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "1px solid #dddde7", marginTop: "7px" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain what problem your project solves and what skills (Java, React, UI, etc.) you are looking for..."
                required
              />
            </label>
            <div style={{ marginTop: "18px", display: "flex", gap: "10px" }}>
              <button className="btn btn-primary" type="submit" disabled={actionLoading}>
                {actionLoading ? "Creating..." : "Publish Project"}
              </button>
              <button className="btn btn-ghost" type="button" onClick={() => setShowCreateModal(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="filter-tabs">
        <button
          className={activeTab === "Discover" ? "active" : ""}
          onClick={() => setActiveTab("Discover")}
        >
          Discover ({projectList.length})
        </button>
        <button
          className={activeTab === "My Projects" ? "active" : ""}
          onClick={() => setActiveTab("My Projects")}
        >
          My Projects
        </button>
      </div>

      {loading ? (
        <p className="muted">Loading projects from PostgreSQL...</p>
      ) : displayedProjects.length > 0 ? (
        <div className="project-grid large">
          {displayedProjects.map((p) => (
            <div className="project-card" key={p.id || p.title}>
              <div className="project-status">{p.status || "OPEN"}</div>
              <h3>{p.title}</h3>
              <p>{p.description || "No description provided."}</p>
              <div className="project-bottom">
                <span><Users size={14} /> Active Project</span>
                <button className="btn btn-soft" onClick={() => handleJoin(p.id)}>
                  Join Project
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="panel" style={{ textAlign: "center", padding: "40px 0" }}>
          <p className="muted">No projects found in this section.</p>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// AI TOOLS (TEAM MATCH, SKILL GAP, LEARNING PATH)
// -------------------------------------------------------------
function AIPage({ type, user, setPage }) {
  if (type === "Skill Gap") return <SkillGap user={user} setPage={setPage} />;
  if (type === "Learning Path") return <LearningPath user={user} />;
  return <TeamMatch user={user} />;
}

function TeamMatch({ user }) {
  const [skillInput, setSkillInput] = useState("Java, Spring Boot, React");
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");
  const [invitedMap, setInvitedMap] = useState({});

  const popularSkills = ["Java", "Spring Boot", "React", "Python", "SQL", "DSA", "Node.js", "Machine Learning"];

  async function handleSearch(skillsToUse = skillInput) {
    const rawSkills = skillsToUse
      .split(/[,\n]+/)
      .map((s) => s.trim())
      .filter(Boolean);

    if (rawSkills.length === 0) {
      alert("Please enter at least one skill to match.");
      return;
    }

    setLoading(true);
    setError("");
    setSearched(true);

    try {
      const results = await getTeamMatches(user?.id || null, rawSkills);
      setMatches(Array.isArray(results) ? results : []);
    } catch (err) {
      setError(err.message || "Failed to find teammate matches. Check backend connection.");
    } finally {
      setLoading(false);
    }
  }

  function toggleChip(skillName) {
    const current = skillInput.split(",").map((s) => s.trim()).filter(Boolean);
    let updated;
    if (current.includes(skillName)) {
      updated = current.filter((s) => s !== skillName);
    } else {
      updated = [...current, skillName];
    }
    const val = updated.join(", ");
    setSkillInput(val);
    handleSearch(val);
  }

  function handleInvite(userId) {
    setInvitedMap((prev) => ({ ...prev, [userId]: true }));
  }

  return (
    <div className="page-content">
      <div className="ai-hero">
        <div className="ai-orb"><Sparkles size={28} /></div>
        <div>
          <span className="section-kicker light">SKILLSPHERE AI MATCHING</span>
          <h1>Find your perfect teammate.</h1>
          <p>Tell us what skills your project needs. We will rank campus peers whose skills complement yours.</p>
        </div>
      </div>

      <section className="panel ai-search">
        <label>What skills does your project or study group need?</label>
        <div className="ai-input">
          <Sparkles size={19} />
          <input
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            placeholder="e.g. Java, Spring Boot, React, SQL, Python"
          />
          <button className="btn btn-primary" onClick={() => handleSearch()} disabled={loading}>
            {loading ? "Matching..." : "Find matches"} <ArrowRight size={16} />
          </button>
        </div>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "12px" }}>
          <small className="muted" style={{ alignSelf: "center", marginRight: "4px" }}>Quick add:</small>
          {popularSkills.map((sk) => {
            const active = skillInput.toLowerCase().includes(sk.toLowerCase());
            return (
              <button
                key={sk}
                className={`filter ${active ? "active" : ""}`}
                onClick={() => toggleChip(sk)}
                type="button"
                style={{ fontSize: "11px", padding: "4px 9px" }}
              >
                {active ? "✓ " : "+ "}{sk}
              </button>
            );
          })}
        </div>
      </section>

      {error && (
        <div className="panel" style={{ borderLeft: "4px solid #ef4444", margin: "16px 0" }}>
          <p style={{ color: "#b91c1c" }}>{error}</p>
        </div>
      )}

      <section className="panel">
        <div className="panel-head">
          <div>
            <span className="section-kicker">AI RECOMMENDATIONS</span>
            <h2>Top Teammate Matches</h2>
          </div>
          <span className="count-pill">{matches.length} candidates</span>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "30px 0" }}>
            <p className="muted">Analyzing campus skill profiles in PostgreSQL...</p>
          </div>
        ) : matches.length > 0 ? (
          matches.map((m) => {
            const name = m.name || "Student";
            const initials = getInitials(name);
            const dept = [m.department, m.year, m.location].filter(Boolean).join(" • ") || "Campus Member";
            const score = m.matchScore ?? 0;
            const matchedSkills = Array.isArray(m.matchedSkills) ? m.matchedSkills : [];
            const otherSkills = (Array.isArray(m.studentSkills) ? m.studentSkills : [])
              .filter((s) => !matchedSkills.includes(s));
            const isInvited = invitedMap[m.userId];

            return (
              <div className="recommend-row" key={m.userId || m.email}>
                <div className="avatar large">{initials}</div>
                <div className="recommend-main">
                  <div>
                    <h3>{name}</h3>
                    <span>{dept}</span>
                  </div>
                  <div className="tags" style={{ marginTop: "6px" }}>
                    {matchedSkills.map((s) => (
                      <em key={s} style={{ background: "#e0f2fe", color: "#0284c7", fontWeight: "700" }}>
                        ✓ {s}
                      </em>
                    ))}
                    {otherSkills.map((s) => (
                      <em key={s}>{s}</em>
                    ))}
                  </div>
                  <div className="match-reasons" style={{ marginTop: "6px" }}>
                    {matchedSkills.length > 0 ? (
                      <><CheckCircle2 size={14} /> Has {matchedSkills.length} required skills for your project</>
                    ) : (
                      <><CheckCircle2 size={14} /> Available campus collaborator</>
                    )}
                  </div>
                </div>
                <div className="score">
                  <strong>{score}%</strong>
                  <small>compatibility</small>
                  <button
                    className={`btn ${isInvited ? "btn-soft" : "btn-primary"}`}
                    onClick={() => handleInvite(m.userId)}
                    disabled={isInvited}
                  >
                    {isInvited ? "Invited ✓" : "Invite"} {!isInvited && <Send size={14} />}
                  </button>
                </div>
              </div>
            );
          })
        ) : searched ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <p className="muted">No teammates found with these skills. Try searching for common skills like Java, React, or Python.</p>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <p className="muted">Click "Find matches" to search for teammates using our matching algorithm.</p>
          </div>
        )}
      </section>
    </div>
  );
}

function SkillGap({ user, setPage }) {
  const [careerGoal, setCareerGoal] = useState("Java Full Stack Developer");
  const [gapData, setGapData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAnalyze(goalToUse = careerGoal) {
    if (!goalToUse.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await getSkillGap(user?.id || 1, goalToUse.trim());
      setGapData(res);
    } catch (err) {
      setError(err.message || "Failed to analyze skill gaps.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleAnalyze();
  }, [user]);

  const coverage = gapData?.skillCoverage ?? 60;
  const missing = Array.isArray(gapData?.missingSkills) ? gapData.missingSkills : [];
  const current = Array.isArray(gapData?.currentSkills) ? gapData.currentSkills : [];

  return (
    <div className="page-content">
      <div className="ai-hero compact">
        <div className="ai-orb"><Target size={27} /></div>
        <div>
          <span className="section-kicker light">AI SKILL GAP ANALYSIS</span>
          <h1>Know what to learn next.</h1>
          <p>Compare your current skills with industry standards for your dream role.</p>
        </div>
      </div>

      <section className="panel gap-input">
        <label>Target career goal</label>
        <div className="ai-input">
          <Target size={19} />
          <input
            value={careerGoal}
            onChange={(e) => setCareerGoal(e.target.value)}
            placeholder="e.g. Java Full Stack Developer, Backend Developer, Frontend Developer"
          />
          <button className="btn btn-primary" onClick={() => handleAnalyze()} disabled={loading}>
            {loading ? "Analyzing..." : "Analyze gaps"} <Sparkles size={16} />
          </button>
        </div>
      </section>

      {error && (
        <div className="panel" style={{ borderLeft: "4px solid #ef4444", margin: "16px 0" }}>
          <p style={{ color: "#b91c1c" }}>{error}</p>
        </div>
      )}

      <div className="two-col">
        <section className="panel">
          <div className="panel-head">
            <h2>Skills to strengthen for {careerGoal}</h2>
            <span className="count-pill">{missing.length} gaps identified</span>
          </div>

          {loading ? (
            <p className="muted">Analyzing requirements...</p>
          ) : missing.length > 0 ? (
            missing.map((s, idx) => (
              <div className="gap-row" key={s}>
                <div className="gap-level">{idx < 2 ? "High" : "Medium"}</div>
                <div>
                  <h3>{s}</h3>
                  <p>Recommended curriculum step for {careerGoal}</p>
                </div>
                <ChevronRight />
              </div>
            ))
          ) : (
            <p className="muted">You currently possess all recommended core skills for this role!</p>
          )}

          {current.length > 0 && (
            <div style={{ marginTop: "24px" }}>
              <small className="muted" style={{ display: "block", marginBottom: "8px" }}>YOUR MATCHING SKILLS:</small>
              <div className="tags">
                {current.map((s) => (
                  <em key={s} style={{ background: "#ecfdf5", color: "#059669" }}>✓ {s}</em>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="panel readiness">
          <span className="section-kicker">CAREER READINESS</span>
          <div className="readiness-circle">
            <strong>{coverage}</strong><span>%</span>
          </div>
          <h2>
            {coverage >= 70 ? "Excellent Foundation!" : "You're on the right track."}
          </h2>
          <p>
            Strengthen your missing skills to improve your employability and project readiness.
          </p>
          <button className="btn btn-primary full" onClick={() => setPage("Learning Path")}>
            Generate learning path <ArrowRight size={16} />
          </button>
        </section>
      </div>
    </div>
  );
}

function LearningPath({ user }) {
  const [careerGoal, setCareerGoal] = useState("Java Full Stack Developer");
  const [pathData, setPathData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGenerate(goalToUse = careerGoal) {
    if (!goalToUse.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await getLearningPath(user?.id || 1, goalToUse.trim());
      setPathData(res);
    } catch (err) {
      setError(err.message || "Failed to generate learning path.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleGenerate();
  }, [user]);

  const steps = Array.isArray(pathData?.learningPath) ? pathData.learningPath : [];

  return (
    <div className="page-content">
      <div className="ai-hero compact">
        <div className="ai-orb"><BookOpen size={27} /></div>
        <div>
          <span className="section-kicker light">PERSONALIZED LEARNING PATH</span>
          <h1>Your roadmap to {careerGoal}.</h1>
          <p>A practical curriculum sequence based on your current profile and career aspirations.</p>
        </div>
      </div>

      <section className="panel gap-input">
        <label>Select or enter career roadmap</label>
        <div className="ai-input">
          <BookOpen size={19} />
          <input
            value={careerGoal}
            onChange={(e) => setCareerGoal(e.target.value)}
            placeholder="e.g. Java Full Stack Developer, Frontend Developer, Backend Developer"
          />
          <button className="btn btn-primary" onClick={() => handleGenerate()} disabled={loading}>
            {loading ? "Generating..." : "Update Path"} <Sparkles size={16} />
          </button>
        </div>
      </section>

      {error && (
        <div className="panel" style={{ borderLeft: "4px solid #ef4444", margin: "16px 0" }}>
          <p style={{ color: "#b91c1c" }}>{error}</p>
        </div>
      )}

      <div className="roadmap panel">
        {loading ? (
          <p className="muted">Generating tailored learning path...</p>
        ) : steps.length > 0 ? (
          steps.map((step, idx) => (
            <div className="road-step" key={step}>
              <div className="road-number">
                {idx === 0 ? <CheckCircle2 size={18} /> : String(idx + 1).padStart(2, "0")}
              </div>
              <div className="road-line"></div>
              <div className="road-content">
                <div>
                  <span className="section-kicker">STAGE {String(idx + 1).padStart(2, "0")}</span>
                  <h2>{step}</h2>
                  <p>Comprehensive theory, practical hands-on labs, and portfolio integration.</p>
                </div>
                <span className="duration"><Clock3 size={14} /> 2-3 weeks</span>
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: "30px 0", textAlign: "center" }}>
            <p className="muted">No learning steps required or found. Enter a career goal to generate your path!</p>
          </div>
        )}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// MENTORS
// -------------------------------------------------------------
function Mentors({ user }) {
  const [mentorsList, setMentorsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [requestMessage, setRequestMessage] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  async function loadMentors() {
    setLoading(true);
    try {
      const res = await getMentors();
      setMentorsList(Array.isArray(res) ? res : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMentors();
  }, []);

  async function handleSendRequest(e) {
    e.preventDefault();
    if (!selectedMentor) return;
    setActionLoading(true);

    try {
      await createMentorRequest(user?.id || 1, selectedMentor.id, requestMessage);
      alert("Mentorship request sent successfully!");
      setSelectedMentor(null);
      setRequestMessage("");
    } catch (err) {
      alert(err.message || "Failed to send request.");
    } finally {
      setActionLoading(false);
    }
  }

  return (
    <div className="page-content">
      <div className="page-title-row">
        <div>
          <span className="section-kicker">MENTOR NETWORK</span>
          <h1>Find a Mentor</h1>
          <p>Connect with experienced seniors and mentors who can guide your technical and placement journey.</p>
        </div>
      </div>

      {selectedMentor && (
        <div className="panel" style={{ border: "2px solid #6355d7", marginBottom: "20px" }}>
          <div className="panel-head">
            <h2>Request Mentorship from {selectedMentor.name || "Mentor"}</h2>
            <button className="text-btn" onClick={() => setSelectedMentor(null)}>Close</button>
          </div>
          <form onSubmit={handleSendRequest}>
            <p className="muted">Expertise: {selectedMentor.expertise}</p>
            <label>
              Your Message
              <textarea
                rows={3}
                style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "1px solid #dddde7", marginTop: "7px" }}
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
                placeholder="Introduce yourself and explain what you hope to learn or work on together..."
                required
              />
            </label>
            <div style={{ marginTop: "16px", display: "flex", gap: "10px" }}>
              <button className="btn btn-primary" type="submit" disabled={actionLoading}>
                {actionLoading ? "Sending..." : "Submit Request"}
              </button>
              <button className="btn btn-ghost" type="button" onClick={() => setSelectedMentor(null)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <p className="muted">Loading mentors from database...</p>
      ) : mentorsList.length > 0 ? (
        <div className="student-grid">
          {mentorsList.map((m) => (
            <div className="student-card" key={m.id}>
              <div className="student-card-top">
                <div className="avatar large">{getInitials(m.name || "Mentor")}</div>
                <span className="match-badge">{m.experienceYears || 1}+ yrs exp</span>
              </div>
              <h3>{m.name || "Campus Mentor"}</h3>
              <p>{m.expertise || "General Engineering Guidance"}</p>
              <div className="tags">
                <em>Availability: {m.availability || "Flexible"}</em>
              </div>
              <div className="student-card-bottom">
                <span><GraduationCap size={14} /> Mentor</span>
                <button className="btn btn-primary" onClick={() => setSelectedMentor(m)}>
                  Connect
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="panel" style={{ textAlign: "center", padding: "40px 0" }}>
          <p className="muted">No mentors registered currently. Check back soon!</p>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// STUDY GROUPS
// -------------------------------------------------------------
function StudyGroups({ user }) {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  async function loadGroups() {
    setLoading(true);
    try {
      const res = await getStudyGroups();
      setGroups(Array.isArray(res) ? res : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGroups();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    if (!name.trim()) return;
    setActionLoading(true);

    try {
      await createStudyGroup({
        name: name.trim(),
        description: description.trim(),
        createdBy: user?.id || 1,
      });
      setName("");
      setDescription("");
      setShowCreateModal(false);
      await loadGroups();
    } catch (err) {
      alert(err.message || "Failed to create group.");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleJoin(groupId) {
    try {
      await joinStudyGroup(groupId, user?.id || 1);
      alert("Successfully joined study group!");
      await loadGroups();
    } catch (err) {
      alert(err.message || "Failed to join group.");
    }
  }

  return (
    <div className="page-content">
      <div className="page-title-row">
        <div>
          <span className="section-kicker">LEARN TOGETHER</span>
          <h1>Study Groups</h1>
          <p>Join focused student groups for DSA, placements, hackathons, and Java full-stack development.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
          <Plus size={17} /> Create group
        </button>
      </div>

      {showCreateModal && (
        <div className="panel" style={{ border: "2px solid #6355d7", marginBottom: "20px" }}>
          <div className="panel-head">
            <h2>Create a Study Group</h2>
            <button className="text-btn" onClick={() => setShowCreateModal(false)}>Close</button>
          </div>
          <form onSubmit={handleCreate}>
            <label>
              Group Name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. DSA Cracking Club, Spring Boot Placements"
                required
              />
            </label>
            <label>
              Description & Focus Area
              <textarea
                rows={3}
                style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "1px solid #dddde7", marginTop: "7px" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what your group studies, weekly schedule, and goals..."
                required
              />
            </label>
            <div style={{ marginTop: "16px", display: "flex", gap: "10px" }}>
              <button className="btn btn-primary" type="submit" disabled={actionLoading}>
                {actionLoading ? "Creating..." : "Create Study Group"}
              </button>
              <button className="btn btn-ghost" type="button" onClick={() => setShowCreateModal(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <p className="muted">Loading study groups from PostgreSQL...</p>
      ) : groups.length > 0 ? (
        <div className="project-grid large">
          {groups.map((g) => (
            <div className="project-card" key={g.id || g.name}>
              <div className="project-status">STUDY GROUP</div>
              <h3>{g.name}</h3>
              <p>{g.description || "Campus peer study circle."}</p>
              <div className="project-bottom">
                <span><Users size={14} /> Active Members</span>
                <button className="btn btn-soft" onClick={() => handleJoin(g.id)}>
                  Join Group
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="panel" style={{ textAlign: "center", padding: "40px 0" }}>
          <p className="muted">No study groups created yet. Create the first one!</p>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// MAIN APP COMPONENT
// -------------------------------------------------------------
function App() {
  const [currentUser, setCurrentUser] = useState(() => getStoredUser());
  const [view, setView] = useState(() => (getStoredUser() ? "app" : "landing"));
  const [page, setPage] = useState("Dashboard");
  const [mobile, setMobile] = useState(false);

  function handleLoginSuccess(user) {
    setCurrentUser(user);
    setView("app");
    setPage("Dashboard");
  }

  function handleLogout() {
    apiLogout();
    setCurrentUser(null);
    setView("landing");
  }

  if (view === "landing") {
    return <Landing onGetStarted={() => setView("register")} onLogin={() => setView("login")} />;
  }

  if (view === "login") {
    return <Auth mode="login" onBack={() => setView("landing")} onSuccess={handleLoginSuccess} />;
  }

  if (view === "register") {
    return <Auth mode="register" onBack={() => setView("login")} onSuccess={handleLoginSuccess} />;
  }

  let content;
  if (page === "Dashboard") {
    content = <Dashboard setPage={setPage} user={currentUser} />;
  } else if (page === "My Profile") {
    content = <Profile user={currentUser} />;
  } else if (page === "My Skills") {
    content = <Skills user={currentUser} setPage={setPage} />;
  } else if (page === "Students") {
    content = <Students setPage={setPage} />;
  } else if (page === "Projects") {
    content = <Projects user={currentUser} />;
  } else if (["AI Team Match", "Skill Gap", "Learning Path"].includes(page)) {
    content = <AIPage type={page} user={currentUser} setPage={setPage} />;
  } else if (page === "Mentors") {
    content = <Mentors user={currentUser} />;
  } else if (page === "Study Groups") {
    content = <StudyGroups user={currentUser} />;
  } else {
    content = <Dashboard setPage={setPage} user={currentUser} />;
  }

  return (
    <div className="app-shell">
      <Sidebar
        page={page}
        setPage={setPage}
        mobile={mobile}
        setMobile={setMobile}
        onLogout={handleLogout}
      />
      <main className="main">
        <Topbar
          page={page}
          setMobile={setMobile}
          user={currentUser}
          onLogout={handleLogout}
        />
        {content}
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
