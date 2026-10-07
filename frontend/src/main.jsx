import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight, Sparkles, Users, BrainCircuit, Target, BookOpen, ShieldCheck,
  Search, Bell, ChevronDown, LayoutDashboard, UserRound, Wrench, FolderKanban,
  GraduationCap, UsersRound, Settings, LogOut, Menu, X, Plus, CheckCircle2,
  MapPin, Clock3, Star, TrendingUp, Zap, Send, ChevronRight
} from "lucide-react";
import "./index.css";

const skills = ["Java", "React", "Python", "SQL", "DSA", "UI/UX", "Spring Boot", "Machine Learning"];

const students = [
  { name: "Aarav Sharma", initials: "AS", course: "CSE • 3rd Year", skills: ["React", "JavaScript", "CSS"], match: 96, location: "Hyderabad" },
  { name: "Meera Reddy", initials: "MR", course: "CSE • 3rd Year", skills: ["Java", "Spring Boot", "SQL"], match: 91, location: "Hyderabad" },
  { name: "Rohan Kumar", initials: "RK", course: "IT • 2nd Year", skills: ["Python", "ML", "Data Science"], match: 87, location: "Hyderabad" }
];

const projects = [
  { title: "Campus Event Hub", description: "A platform to discover, register and manage college events.", skills: ["React", "Node.js", "UI/UX"], members: 3, status: "Open" },
  { title: "Smart Placement Tracker", description: "Track preparation, applications and interview progress in one place.", skills: ["Java", "SQL", "Spring Boot"], members: 2, status: "Open" },
  { title: "AI Study Buddy", description: "An intelligent study companion for personalized learning plans.", skills: ["Python", "ML", "React"], members: 4, status: "Building" }
];

function Logo() {
  return <div className="logo"><span className="logo-mark"><Sparkles size={17}/></span><span>Skill<span>Sphere</span></span></div>;
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
          <button className="btn btn-primary" onClick={onGetStarted}>Get Started <ArrowRight size={16}/></button>
        </div>
      </header>

      <main>
        <section className="hero container">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={15}/> AI-powered campus collaboration</div>
            <h1>Turn your <span>skills</span> into your next opportunity.</h1>
            <p>Find the right teammates, mentors and learning paths based on what you know, what you need and where you want to go.</p>
            <div className="hero-actions">
              <button className="btn btn-primary btn-lg" onClick={onGetStarted}>Build your skill profile <ArrowRight size={18}/></button>
              <button className="btn btn-soft btn-lg" onClick={onLogin}>Explore the platform</button>
            </div>
            <div className="hero-proof"><CheckCircle2 size={17}/> Built for students, projects and placement goals</div>
          </div>
          <div className="hero-visual">
            <div className="glow"></div>
            <div className="mock-window">
              <div className="mock-top"><span></span><span></span><span></span><b>SkillSphere</b></div>
              <div className="mock-body">
                <div className="mini-sidebar"><div className="mini-logo">✦</div><i></i><i></i><i></i><i></i><i></i></div>
                <div className="mini-content">
                  <div className="mini-title"><div><small>Good morning, Nikhitha</small><strong>Your sphere is growing.</strong></div><div className="avatar">N</div></div>
                  <div className="mini-stats"><div><b>08</b><small>Skills</small></div><div><b>12</b><small>Matches</small></div><div><b>03</b><small>Projects</small></div></div>
                  <div className="mini-grid"><div className="mini-card"><small>✦ AI Team Matches</small><div className="person"><div className="avatar sm">AS</div><div><b>Aarav Sharma</b><small>React • JS • CSS</small></div><em>96%</em></div><div className="person"><div className="avatar sm">MR</div><div><b>Meera Reddy</b><small>Java • Spring Boot</small></div><em>91%</em></div></div><div className="mini-card progress-card"><small>Profile completion</small><strong>78%</strong><div className="progress"><span style={{width:"78%"}}></span></div><small>Add 2 more skills to reach 90%</small></div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="section container">
          <div className="section-head"><div><span className="section-kicker">ONE PLATFORM</span><h2>Everything you need to grow together.</h2></div><p>SkillSphere connects your skills to people, projects and opportunities around your campus.</p></div>
          <div className="feature-grid">
            <Feature icon={<Users/>} title="Smart Teammates" text="Discover students whose skills complete your project." />
            <Feature icon={<BrainCircuit/>} title="AI Skill Gap" text="See what skills you need for your target career." />
            <Feature icon={<GraduationCap/>} title="Mentor Matching" text="Connect with seniors and mentors who fit your goals." />
            <Feature icon={<BookOpen/>} title="Learning Paths" text="Get a practical roadmap from your current level to your goal." />
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
          <div><span className="section-kicker light">YOUR CAMPUS, CONNECTED</span><h2>Your next teammate might already be one search away.</h2><p>Build a stronger profile. Find the missing skill. Start something meaningful.</p></div>
          <button className="btn btn-white btn-lg" onClick={onGetStarted}>Get Started <ArrowRight size={18}/></button>
        </section>
      </main>
      <footer className="footer container"><Logo/><span>© 2026 SkillSphere. Built for campus collaboration.</span></footer>
    </div>
  );
}

function Feature({icon,title,text}) { return <div className="feature-card"><div className="feature-icon">{icon}</div><h3>{title}</h3><p>{text}</p><ChevronRight size={18}/></div> }
function Step({n,title,text}) { return <div className="step"><div className="step-number">{n}</div><h3>{title}</h3><p>{text}</p></div> }

function Auth({mode, onBack, onSuccess}) {
  const login = mode === "login";
  return <div className="auth-page">
    <div className="auth-brand"><Logo/><button className="btn btn-ghost" onClick={onBack}>← Back to website</button></div>
    <div className="auth-wrap">
      <div className="auth-copy">
        <div className="eyebrow"><Sparkles size={15}/> Welcome to your campus sphere</div>
        <h1>{login ? "Welcome back." : "Build your skill profile."}</h1>
        <p>{login ? "Continue discovering people, projects and learning opportunities." : "Create one profile and let SkillSphere connect you to the right people."}</p>
        <div className="auth-benefits"><div><CheckCircle2/> Smart teammate recommendations</div><div><CheckCircle2/> Skill gap and learning insights</div><div><CheckCircle2/> Projects, mentors and study groups</div></div>
      </div>
      <form className="auth-card" onSubmit={(e)=>{e.preventDefault();onSuccess();}}>
        <h2>{login ? "Sign in" : "Create account"}</h2><p className="muted">{login ? "Enter your details to continue." : "It takes less than a minute."}</p>
        {!login && <label>Full name<input placeholder="Your name" required/></label>}
        <label>Email address<input type="email" placeholder="you@college.edu" required/></label>
        <label>Password<input type="password" placeholder="••••••••" required/></label>
        {!login && <label>I'm a <select><option>Student</option><option>Mentor</option></select></label>}
        <button className="btn btn-primary full" type="submit">{login ? "Sign in" : "Create my account"} <ArrowRight size={17}/></button>
        <div className="auth-switch">{login ? "New to SkillSphere?" : "Already have an account?"} <button type="button" onClick={onBack}>{login ? "Create account" : "Sign in"}</button></div>
      </form>
    </div>
  </div>
}

function Sidebar({page,setPage,mobile,setMobile}) {
  const items = [
    ["Dashboard", LayoutDashboard], ["My Profile", UserRound], ["My Skills", Wrench],
    ["Students", UsersRound], ["Projects", FolderKanban], ["Mentors", GraduationCap], ["Study Groups", Users],
  ];
  return <><div className={`sidebar ${mobile?"show":""}`}>
    <div className="side-top"><Logo/><button className="mobile-close" onClick={()=>setMobile(false)}><X/></button></div>
    <div className="side-label">WORKSPACE</div>
    {items.map(([label,Icon])=><button key={label} className={`side-item ${page===label?"active":""}`} onClick={()=>{setPage(label);setMobile(false)}}><Icon size={18}/>{label}</button>)}
    <div className="side-label ai-label">AI TOOLS</div>
    {["AI Team Match","Skill Gap","Learning Path"].map((label,i)=><button key={label} className={`side-item ${page===label?"active":""}`} onClick={()=>{setPage(label);setMobile(false)}}><Sparkles size={18}/>{label}<span className="ai-dot">{i===0?"NEW":""}</span></button>)}
    <div className="side-bottom"><button className="side-item"><Settings size={18}/>Settings</button><button className="side-item"><LogOut size={18}/>Logout</button></div>
  </div><div className={`mobile-overlay ${mobile?"show":""}`} onClick={()=>setMobile(false)}></div></>
}

function Topbar({page,setMobile}) {
  return <header className="topbar"><button className="menu-btn" onClick={()=>setMobile(true)}><Menu/></button><div><span className="crumb">Workspace / </span><b>{page}</b></div><div className="top-actions"><button className="icon-btn"><Search size={18}/></button><button className="icon-btn notif"><Bell size={18}/><i></i></button><div className="top-user"><div className="avatar">N</div><div><b>Nikhitha</b><small>Student</small></div><ChevronDown size={15}/></div></div></header>
}

function Dashboard({setPage}) {
  return <div className="page-content">
    <div className="welcome-banner"><div><span className="banner-kicker"><Sparkles size={14}/> YOUR AI CAMPUS ASSISTANT</span><h1>Good morning, Nikhitha 👋</h1><p>You're making progress. Here are a few opportunities waiting for you.</p></div><button className="btn btn-white" onClick={()=>setPage("AI Team Match")}>Find teammates <ArrowRight size={16}/></button></div>
    <div className="stats-row"><Stat icon={<Wrench/>} value="08" label="Skills added" trend="+2 this week"/><Stat icon={<Target/>} value="12" label="Smart matches" trend="+5 this week"/><Stat icon={<FolderKanban/>} value="03" label="Active projects" trend="1 new"/><Stat icon={<Users/>} value="17" label="Connections" trend="+4 this month"/></div>
    <div className="content-grid">
      <section className="panel"><div className="panel-head"><div><span className="section-kicker">PERSONALIZED FOR YOU</span><h2>AI Team Matches</h2></div><button className="text-btn" onClick={()=>setPage("AI Team Match")}>View all <ArrowRight size={15}/></button></div>
        {students.map(s=><StudentRow key={s.name} student={s}/>)}
      </section>
      <section className="panel profile-progress"><div className="panel-head"><div><span className="section-kicker">YOUR PROFILE</span><h2>Completion</h2></div><TrendingUp size={19}/></div><div className="big-progress">78<span>%</span></div><div className="progress"><span style={{width:"78%"}}></span></div><p>Add your interests, career goal and 2 more skills to reach 90%.</p><button className="btn btn-soft full" onClick={()=>setPage("My Profile")}>Complete profile <ArrowRight size={16}/></button></section>
    </div>
    <section className="panel"><div className="panel-head"><div><span className="section-kicker">PROJECTS</span><h2>Projects looking for people</h2></div><button className="text-btn" onClick={()=>setPage("Projects")}>Explore projects <ArrowRight size={15}/></button></div><div className="project-grid">{projects.map(p=><ProjectCard key={p.title} project={p}/>)}</div></section>
  </div>
}
function Stat({icon,value,label,trend}) { return <div className="stat-card"><div className="stat-icon">{icon}</div><div><strong>{value}</strong><span>{label}</span><small>{trend}</small></div></div> }
function StudentRow({student}) { return <div className="student-row"><div className="avatar">{student.initials}</div><div className="student-info"><b>{student.name}</b><span>{student.course} • {student.location}</span><div className="tags">{student.skills.map(x=><em key={x}>{x}</em>)}</div></div><div className="match"><strong>{student.match}%</strong><small>match</small></div><button className="icon-btn"><Send size={16}/></button></div> }

function Profile() {
  return <div className="page-content"><div className="profile-hero"><div className="profile-avatar">N</div><div className="profile-main"><span className="section-kicker">STUDENT PROFILE</span><h1>Nikhitha Velisetti</h1><p>Computer Science & Engineering • 3rd Year</p><div className="tags"><em>Java</em><em>React</em><em>SQL</em><em>DSA</em></div></div><button className="btn btn-primary">Edit profile</button></div><div className="two-col"><section className="panel"><div className="panel-head"><h2>About</h2></div><p className="large-text">I'm interested in Java backend development, full-stack applications, AI and problem solving. I'm looking for teammates who complement my skills and mentors who can help me become placement-ready.</p><div className="info-grid"><Info label="Career goal" value="Java Full Stack Developer"/><Info label="Interests" value="Backend • AI • Web • DSA"/><Info label="Availability" value="Evenings & weekends"/><Info label="Location" value="Hyderabad"/></div></section><section className="panel"><div className="panel-head"><h2>Skills</h2><button className="text-btn">Manage</button></div>{["Java","SQL","React","DSA","Spring Boot"].map((s,i)=><div className="skill-line" key={s}><span>{s}</span><div className="progress"><span style={{width:[82,76,68,54,42][i]+"%"}}></span></div><small>{["Advanced","Intermediate","Intermediate","Beginner","Beginner"][i]}</small></div>)}</section></div></div>
}
function Info({label,value}) { return <div><small>{label}</small><b>{value}</b></div> }

function Skills() { return <div className="page-content"><div className="page-title-row"><div><span className="section-kicker">YOUR SKILL PROFILE</span><h1>My Skills</h1><p>Keep your skills updated so recommendations become smarter.</p></div><button className="btn btn-primary"><Plus size={17}/> Add skill</button></div><div className="skills-layout"><section className="panel"><div className="panel-head"><h2>Technical skills</h2><span className="count-pill">8 skills</span></div><div className="skill-cards">{skills.map((s,i)=><div className="skill-card" key={s}><div className="skill-card-top"><div className="skill-symbol">{s[0]}</div><button>•••</button></div><h3>{s}</h3><p>{["Advanced","Intermediate","Intermediate","Beginner"][i%4]}</p><div className="progress"><span style={{width:[88,72,69,52,61,45,42,36][i]+"%"}}></span></div></div>)}</div></section><aside className="panel tip-panel"><div className="tip-icon"><Sparkles/></div><span className="section-kicker">AI INSIGHT</span><h2>Strengthen your profile</h2><p>Adding <b>Spring Boot</b> and <b>REST APIs</b> could improve your match score for Java backend projects.</p><button className="btn btn-soft full">Explore learning path <ArrowRight size={16}/></button></aside></div></div> }

function Students() { return <div className="page-content"><div className="page-title-row"><div><span className="section-kicker">CAMPUS NETWORK</span><h1>Find Students</h1><p>Search by skills, interests, goals or project needs.</p></div><button className="btn btn-soft"><UsersRound size={17}/> My connections</button></div><div className="search-panel"><Search/><input placeholder="Search students by name, skill or interest..."/><button className="btn btn-primary">Search</button></div><div className="filter-row"><button className="filter active">All students</button><button className="filter">High match</button><button className="filter">Java</button><button className="filter">React</button><button className="filter">AI/ML</button><button className="filter">UI/UX</button></div><div className="student-grid">{[...students,...students].map((s,i)=><div className="student-card" key={i}><div className="student-card-top"><div className="avatar large">{s.initials}</div><span className="match-badge">{s.match}% match</span></div><h3>{s.name}</h3><p>{s.course}</p><div className="tags">{s.skills.map(x=><em key={x}>{x}</em>)}</div><div className="student-card-bottom"><span><MapPin size={14}/> {s.location}</span><button className="btn btn-soft">View profile</button></div></div>)}</div></div> }

function ProjectCard({project}) { return <div className="project-card"><div className="project-status">{project.status}</div><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.skills.map(x=><em key={x}>{x}</em>)}</div><div className="project-bottom"><span><Users size={14}/> {project.members} members</span><button className="text-btn">Details <ArrowRight size={14}/></button></div></div> }
function Projects() { return <div className="page-content"><div className="page-title-row"><div><span className="section-kicker">COLLABORATE</span><h1>Projects</h1><p>Find projects that need your skills or start your own.</p></div><button className="btn btn-primary"><Plus size={17}/> Create project</button></div><div className="filter-tabs"><button className="active">Discover</button><button>My projects</button><button>Requests</button></div><div className="project-grid large">{projects.concat(projects).map((p,i)=><ProjectCard key={i} project={p}/>)}</div></div> }

function AIPage({type}) {
  if(type==="Skill Gap") return <SkillGap/>;
  if(type==="Learning Path") return <LearningPath/>;
  return <div className="page-content"><div className="ai-hero"><div className="ai-orb"><Sparkles size={28}/></div><div><span className="section-kicker light">SKILLSPHERE AI</span><h1>Find your perfect teammate.</h1><p>Tell us what your project is missing. We'll rank students whose skills, goals and availability complement yours.</p></div></div><section className="panel ai-search"><label>What kind of teammate do you need?</label><div className="ai-input"><Sparkles size={19}/><input defaultValue="React / UI designer"/><button className="btn btn-primary">Find matches <ArrowRight size={16}/></button></div></section><section className="panel"><div className="panel-head"><div><span className="section-kicker">AI RECOMMENDATIONS</span><h2>Top matches for you</h2></div><span className="count-pill">12 results</span></div>{students.map(s=><div className="recommend-row" key={s.name}><div className="avatar large">{s.initials}</div><div className="recommend-main"><div><h3>{s.name}</h3><span>{s.course}</span></div><div className="tags">{s.skills.map(x=><em key={x}>{x}</em>)}</div><div className="match-reasons"><CheckCircle2 size={14}/> Skills complement your profile <CheckCircle2 size={14}/> Similar project interests</div></div><div className="score"><strong>{s.match}%</strong><small>compatibility</small><button className="btn btn-primary">Invite <Send size={14}/></button></div></div>)}</section></div>
}
function SkillGap() { return <div className="page-content"><div className="ai-hero compact"><div className="ai-orb"><Target size={27}/></div><div><span className="section-kicker light">AI SKILL GAP ANALYSIS</span><h1>Know what to learn next.</h1><p>Compare your current skills with the skills employers expect for your target role.</p></div></div><section className="panel gap-input"><label>Target career</label><div className="ai-input"><Target size={19}/><input defaultValue="Java Full Stack Developer"/><button className="btn btn-primary">Analyze gaps <Sparkles size={16}/></button></div></section><div className="two-col"><section className="panel"><div className="panel-head"><h2>Skills to strengthen</h2><span className="count-pill">5 gaps</span></div>{[["Spring Boot","High","Build REST APIs and production-ready Java services"],["REST APIs","High","Understand HTTP, endpoints and API integration"],["Git & GitHub","Medium","Improve collaboration and version control"],["Docker","Medium","Learn container basics for deployment"],["Testing","Low","Add JUnit and integration testing basics"]].map(([s,l,d])=><div className="gap-row" key={s}><div className="gap-level">{l}</div><div><h3>{s}</h3><p>{d}</p></div><ChevronRight/></div>)}</section><section className="panel readiness"><span className="section-kicker">CAREER READINESS</span><div className="readiness-circle"><strong>64</strong><span>/100</span></div><h2>You're on the right track.</h2><p>Strengthen backend development and deployment skills to move closer to your target role.</p><button className="btn btn-primary full">Generate learning path <ArrowRight size={16}/></button></section></div></div> }
function LearningPath() { const stages=[["01","Java Foundations","OOP, collections, exceptions and modern Java","2 weeks"],["02","Spring Boot","REST APIs, dependency injection and validation","3 weeks"],["03","Database & JPA","PostgreSQL, relationships and Hibernate","2 weeks"],["04","Full Stack Integration","Connect React with Spring Boot securely","3 weeks"],["05","Deployment & Projects","GitHub, Docker, Render and portfolio project","2 weeks"]]; return <div className="page-content"><div className="ai-hero compact"><div className="ai-orb"><BookOpen size={27}/></div><div><span className="section-kicker light">PERSONALIZED LEARNING PATH</span><h1>Your route to Java full stack.</h1><p>A practical sequence based on your current skills and target career.</p></div></div><div className="roadmap panel">{stages.map(([n,t,d,time],i)=><div className="road-step" key={n}><div className="road-number">{i===0?<CheckCircle2 size={18}/>:n}</div><div className="road-line"></div><div className="road-content"><div><span className="section-kicker">STAGE {n}</span><h2>{t}</h2><p>{d}</p></div><span className="duration"><Clock3 size={14}/> {time}</span><button className="btn btn-soft">View topics <ArrowRight size={15}/></button></div></div>)}</div></div> }

function SimplePage({title,kicker,text,icon}) { return <div className="page-content"><div className="empty-panel"><div className="empty-icon">{icon}</div><span className="section-kicker">{kicker}</span><h1>{title}</h1><p>{text}</p><button className="btn btn-primary"><Plus size={17}/> Get started</button></div></div> }

function App() {
  const [view,setView]=useState("landing");
  const [page,setPage]=useState("Dashboard");
  const [mobile,setMobile]=useState(false);
  if(view==="landing") return <Landing onGetStarted={()=>setView("register")} onLogin={()=>setView("login")}/>;
  if(view==="login") return <Auth mode="login" onBack={()=>setView("register")} onSuccess={()=>setView("app")}/>;
  if(view==="register") return <Auth mode="register" onBack={()=>setView("login")} onSuccess={()=>setView("app")}/>;
  const content = page==="Dashboard"?<Dashboard setPage={setPage}/>:page==="My Profile"?<Profile/>:page==="My Skills"?<Skills/>:page==="Students"?<Students/>:page==="Projects"?<Projects/>:["AI Team Match","Skill Gap","Learning Path"].includes(page)?<AIPage type={page}/>:page==="Mentors"?<SimplePage title="Find a Mentor" kicker="MENTOR NETWORK" text="Connect with seniors and experienced students who can guide your next step." icon={<GraduationCap/>}/>:<SimplePage title="Study Groups" kicker="LEARN TOGETHER" text="Join focused groups for DSA, Java, placements, hackathons and more." icon={<Users/>}/>;
  return <div className="app-shell"><Sidebar page={page} setPage={setPage} mobile={mobile} setMobile={setMobile}/><main className="main"><Topbar page={page} setMobile={setMobile}/>{content}</main></div>;
}
createRoot(document.getElementById("root")).render(<React.StrictMode><App/></React.StrictMode>);
