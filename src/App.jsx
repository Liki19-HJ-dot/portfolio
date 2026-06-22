import { useState, useEffect } from "react";

/* ─────────────────────────────────────────────
   🔐 CHANGE THIS PASSWORD TO YOUR OWN SECRET
───────────────────────────────────────────── */
const ADMIN_PASSWORD = "likhith@2024";

/* ─────────────────────────────────────────────
   DEFAULT DATA
───────────────────────────────────────────── */
const DEFAULT_PROFILE = {
  name: "Likhith H J",
  title: "AI & Data Science Enthusiast | Web Developer",
  bio: "AI & Data Science enthusiast skilled in Python, HTML, CSS, SQL and ML. Building innovative projects in web development and artificial intelligence.",
  avatar: "https://avatars.githubusercontent.com/u/174157562?v=4",
  location: "Bengaluru, India",
  email: "likhith627@gmail.com",
  website: "http://portfiloweb.ccbp.tech",
  phone: "+91 7619272287",
  social: {
    github: "https://github.com/Liki19-HJ-dot",
    linkedin: "https://www.linkedin.com/in/likhith-h-j-22aa74249",
  },
  skills: [
    "Python", "HTML", "CSS", "SQL",
    "Machine Learning", "NumPy", "React",
    "JavaScript", "Jupyter Notebook", "Data Science",
  ],
};

const DEFAULT_PROJECTS = [
  {
    id: 1,
    name: "Netflix Clone",
    description:
      "A Netflix clone built using HTML and CSS replicating the original homepage with responsive navigation, hero section with background image, and movie thumbnails.",
    tech: ["HTML", "CSS"],
    github: "https://github.com/Liki19-HJ-dot/NETFLIX",
    live: "",
    color: "coral",
  },
  {
    id: 2,
    name: "Tourism Website",
    description:
      "A tourism website showcasing travel destinations with responsive design, navigation menus, image galleries, and content sections built with HTML & CSS.",
    tech: ["HTML", "CSS"],
    github: "https://github.com/Liki19-HJ-dot/TOURISM",
    live: "",
    color: "teal",
  },
  {
    id: 3,
    name: "Diabetes Classification (ANN)",
    description:
      "An Artificial Neural Network to classify diabetes presence from medical data — includes preprocessing, model training, and evaluation.",
    tech: ["Python", "Jupyter Notebook", "ANN", "ML"],
    github: "https://github.com/Liki19-HJ-dot/5_Classify_Diabetes_Using_ANN.ipynb",
    live: "",
    color: "purple",
  },
  {
    id: 4,
    name: "Cardiovascular Disease Prediction",
    description:
      "A machine learning model to predict cardiovascular disease risk from patient health data, involving data cleaning, feature engineering, and model evaluation.",
    tech: ["Python", "ML", "Jupyter Notebook"],
    github: "https://github.com/Liki19-HJ-dot/Cardiovascular_Disease_Prediction.ipynb",
    live: "",
    color: "blue",
  },
  {
    id: 5,
    name: "Spotify Genre Grouping",
    description:
      "Analyzes Spotify music data to group songs by genre using clustering algorithms and visualization to uncover patterns in music.",
    tech: ["Python", "Clustering", "Data Viz", "Jupyter Notebook"],
    github: "https://github.com/Liki19-HJ-dot/Spotify_Genre_Grouping.ipynb",
    live: "",
    color: "pink",
  },
  {
    id: 6,
    name: "NumPy Matrices",
    description:
      "Demonstrates creating, manipulating, and operating on multidimensional arrays using NumPy with focus on matrix math and performance.",
    tech: ["Python", "NumPy", "Jupyter Notebook"],
    github:
      "https://github.com/Liki19-HJ-dot/Working_With_NumPy_Matrices_-Multidimensional_Data-.ipynb",
    live: "",
    color: "amber",
  },
];

const COLORS = ["purple", "teal", "coral", "blue", "pink", "amber"];
const CM = {
  purple: { bg: "#EEEDFE", border: "#534AB7", text: "#3C3489" },
  teal:   { bg: "#E1F5EE", border: "#0F6E56", text: "#085041" },
  coral:  { bg: "#FAECE7", border: "#993C1D", text: "#712B13" },
  blue:   { bg: "#E6F1FB", border: "#185FA5", text: "#0C447C" },
  pink:   { bg: "#FBEAF0", border: "#993556", text: "#72243E" },
  amber:  { bg: "#FAEEDA", border: "#854F0B", text: "#633806" },
};

const STORAGE_PROFILE  = "lhj_portfolio_profile";
const STORAGE_PROJECTS = "lhj_portfolio_projects";
const STORAGE_ADMIN    = "lhj_admin_session";

/* ─────────────────────────────────────────────
   SMALL COMPONENTS
───────────────────────────────────────────── */
function Avatar({ profile, size = 80 }) {
  const [err, setErr] = useState(false);
  const initials = profile.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  if (profile.avatar && !err) {
    return (
      <img src={profile.avatar} alt={profile.name} onError={() => setErr(true)}
        style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", border: "2px solid #534AB7" }} />
    );
  }
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: "#EEEDFE", border: "2px solid #534AB7",
      display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.32, fontWeight: 500, color: "#3C3489" }}>
      {initials}
    </div>
  );
}

function Badge({ label, color = "purple" }) {
  const c = CM[color] || CM.purple;
  return (
    <span style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}`,
      fontSize: 11, fontWeight: 500, padding: "2px 9px", borderRadius: 6, display: "inline-block" }}>
      {label}
    </span>
  );
}

function Modal({ title, onClose, children }) {
  useEffect(() => {
    const handler = (ev) => ev.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);
  return (
    <div className="modal-overlay" onClick={(ev) => ev.target === ev.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose} className="icon-btn" aria-label="Close">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", multi }) {
  return (
    <div className="field">
      {label && <label>{label}</label>}
      {multi
        ? <textarea value={value} onChange={(ev) => onChange(ev.target.value)} placeholder={placeholder} rows={3} />
        : <input type={type} value={value} onChange={(ev) => onChange(ev.target.value)} placeholder={placeholder} />}
    </div>
  );
}

function Btn({ children, onClick, primary, className = "", style: s }) {
  return (
    <button onClick={onClick} className={`btn ${primary ? "btn-primary" : ""} ${className}`} style={s}>
      {children}
    </button>
  );
}

/* ─────────────────────────────────────────────
   SVG ICONS
───────────────────────────────────────────── */
const icon = (d) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);
const GithubIcon   = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>;
const LinkedinIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>;
const EditIcon     = () => icon("M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z");
const TrashIcon    = () => icon("M3 6h18 M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2");
const ExternalIcon = () => icon("M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6 M15 3h6v6 M10 14 21 3");
const MapPinIcon   = () => icon("M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z");
const MailIcon     = () => icon("M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6");
const GlobeIcon    = () => icon("M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z");
const PlusIcon     = () => icon("M12 5v14 M5 12h14");
const HomeIcon     = () => icon("M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10");
const FolderIcon   = () => icon("M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z");
const BoltIcon     = () => icon("M13 2L3 14h9l-1 8 10-12h-9l1-8z");
const CodeIcon     = () => icon("M16 18l6-6-6-6 M8 6l-6 6 6 6");
const LockIcon     = () => icon("M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z M7 11V7a5 5 0 0 1 10 0v4");
const UnlockIcon   = () => icon("M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z M7 11V7a5 5 0 0 1 9.9-1");
const PhoneIcon    = () => icon("M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.98-.98a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z");

const SOCIAL_ICONS = {
  github:   { icon: <GithubIcon />,   label: "GitHub" },
  linkedin: { icon: <LinkedinIcon />, label: "LinkedIn" },
};

/* ─────────────────────────────────────────────
   PROJECT CARD
───────────────────────────────────────────── */
function ProjectCard({ proj, onEdit, onDelete, compact, isAdmin }) {
  const c = CM[proj.color] || CM.purple;
  return (
    <div className="project-card" style={{ borderTop: `2px solid ${c.border}` }}>
      <div className="project-card-inner">
        <div className="project-card-body">
          <div className="project-name">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke={c.border} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
            </svg>
            <span style={{ color: c.text }}>{proj.name}</span>
          </div>
          <p className={`project-desc ${compact ? "clamp" : ""}`}>{proj.description}</p>
          <div className="badge-row">
            {(proj.tech || []).map((t) => <Badge key={t} label={t} color={proj.color || "purple"} />)}
          </div>
          <div className="project-links">
            {proj.github && (
              <a href={proj.github} target="_blank" rel="noreferrer" className="project-link">
                <GithubIcon /> GitHub
              </a>
            )}
            {proj.live && (
              <a href={proj.live} target="_blank" rel="noreferrer" className="project-link accent">
                <ExternalIcon /> Live demo
              </a>
            )}
          </div>
        </div>
        {/* Only show edit/delete if admin and not compact */}
        {isAdmin && !compact && (
          <div className="project-actions">
            <button onClick={onEdit} className="icon-btn" title="Edit"><EditIcon /></button>
            <button onClick={onDelete} className="icon-btn danger" title="Delete"><TrashIcon /></button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ADMIN LOGIN MODAL
───────────────────────────────────────────── */
function LoginModal({ onClose, onSuccess }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);

  const attempt = () => {
    if (pw === ADMIN_PASSWORD) {
      onSuccess();
    } else {
      setErr(true);
      setPw("");
    }
  };

  return (
    <Modal title="Admin login" onClose={onClose}>
      <p style={{ fontSize: 13, color: "#4b5563", marginBottom: "1rem" }}>
        Enter your password to access edit mode.
      </p>
      <Field
        label="Password"
        type="password"
        value={pw}
        onChange={(v) => { setPw(v); setErr(false); }}
        placeholder="Enter admin password"
      />
      {err && (
        <p style={{ color: "#dc2626", fontSize: 12, marginTop: -8, marginBottom: 8 }}>
          ❌ Wrong password. Try again.
        </p>
      )}
      <div className="modal-actions">
        <Btn onClick={onClose}>Cancel</Btn>
        <Btn primary onClick={attempt} style={{ opacity: !pw ? 0.5 : 1 }}>
          <LockIcon /> Login
        </Btn>
      </div>
    </Modal>
  );
}

/* ─────────────────────────────────────────────
   MAIN APP
───────────────────────────────────────────── */
export default function App() {
  const [tab, setTab]           = useState("home");
  const [profile, setProfile]   = useState(DEFAULT_PROFILE);
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [isAdmin, setIsAdmin]   = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const [editP,  setEditP]  = useState(false);
  const [addPr,  setAddPr]  = useState(false);
  const [editPr, setEditPr] = useState(null);
  const [dp,  setDpRaw]  = useState(null);
  const [dpr, setDprRaw] = useState(null);
  const setDp  = (fn) => setDpRaw((p) => (typeof fn === "function" ? fn(p) : { ...p, ...fn }));
  const setDpr = (fn) => setDprRaw((p) => (typeof fn === "function" ? fn(p) : { ...p, ...fn }));

  useEffect(() => {
    try {
      const p  = localStorage.getItem(STORAGE_PROFILE);  if (p)  setProfile(JSON.parse(p));
      const pr = localStorage.getItem(STORAGE_PROJECTS); if (pr) setProjects(JSON.parse(pr));
      const ad = sessionStorage.getItem(STORAGE_ADMIN);  if (ad) setIsAdmin(true);
    } catch {}
  }, []);

  const loginAsAdmin = () => {
    setIsAdmin(true);
    setShowLogin(false);
    try { sessionStorage.setItem(STORAGE_ADMIN, "1"); } catch {}
  };

  const logout = () => {
    setIsAdmin(false);
    try { sessionStorage.removeItem(STORAGE_ADMIN); } catch {}
  };

  const saveProfile = (data) => {
    setProfile(data); setEditP(false);
    try { localStorage.setItem(STORAGE_PROFILE, JSON.stringify(data)); } catch {}
  };

  const saveProject = (proj) => {
    const updated = proj.id
      ? projects.map((p) => (p.id === proj.id ? proj : p))
      : [...projects, { ...proj, id: Date.now() }];
    setProjects(updated); setAddPr(false); setEditPr(null);
    try { localStorage.setItem(STORAGE_PROJECTS, JSON.stringify(updated)); } catch {}
  };

  const deleteProject = (id) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    try { localStorage.setItem(STORAGE_PROJECTS, JSON.stringify(updated)); } catch {}
  };

  const tabs = [
    { id: "home",     icon: <HomeIcon />,   label: "Home" },
    { id: "projects", icon: <FolderIcon />, label: "Projects" },
    { id: "skills",   icon: <BoltIcon />,   label: "Skills" },
    { id: "contact",  icon: <MailIcon />,   label: "Contact" },
  ];

  return (
    <>
      {/* ── NAV ── */}
      <nav className="navbar">
        <div className="nav-brand">
          <Avatar profile={profile} size={30} />
          <span>{profile.name}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div className="nav-tabs">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`nav-tab ${tab === t.id ? "active" : ""}`}>
                {t.icon}<span>{t.label}</span>
              </button>
            ))}
          </div>
          {/* Admin toggle — small lock icon in corner */}
          {isAdmin ? (
            <button onClick={logout} className="admin-btn active" title="Exit admin mode">
              <UnlockIcon /> <span>Admin</span>
            </button>
          ) : (
            <button onClick={() => setShowLogin(true)} className="admin-btn" title="Admin login">
              <LockIcon />
            </button>
          )}
        </div>
      </nav>

      {/* Admin mode banner */}
      {isAdmin && (
        <div className="admin-banner">
          🔓 Admin mode — only you can see edit controls
        </div>
      )}

      {/* ── MAIN ── */}
      <main className="main">

        {/* HOME */}
        {tab === "home" && (
          <div>
            <div className="card profile-card">
              <Avatar profile={profile} size={80} />
              <div className="profile-info">
                <div className="profile-top">
                  <div>
                    <h1>{profile.name}</h1>
                    <p className="muted">{profile.title}</p>
                  </div>
                  {/* Only visible to admin */}
                  {isAdmin && (
                    <Btn onClick={() => { setDpRaw({ ...profile }); setEditP(true); }}>
                      <EditIcon /> Edit profile
                    </Btn>
                  )}
                </div>
                <p className="bio">{profile.bio}</p>
                <div className="meta-row">
                  {profile.location && <span><MapPinIcon /> {profile.location}</span>}
                  {profile.phone    && <a href={`tel:${profile.phone}`}><PhoneIcon /> {profile.phone}</a>}
                  {profile.email    && <a href={`mailto:${profile.email}`}><MailIcon /> {profile.email}</a>}
                  {profile.website  && (
                    <a href={profile.website} target="_blank" rel="noreferrer">
                      <GlobeIcon /> {profile.website.replace(/https?:\/\//, "")}
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="social-row">
              {Object.entries(SOCIAL_ICONS).map(([key, { icon: SvgIcon, label }]) =>
                profile.social?.[key] ? (
                  <a key={key} href={profile.social[key]} target="_blank" rel="noreferrer" className="social-link">
                    {SvgIcon} {label}
                  </a>
                ) : null
              )}
            </div>

            <div className="section">
              <div className="section-header">
                <h2>Pinned projects</h2>
                <button className="text-btn" onClick={() => setTab("projects")}>View all →</button>
              </div>
              <div className="grid-2">
                {projects.slice(0, 4).map((p) => (
                  <ProjectCard key={p.id} proj={p} compact isAdmin={isAdmin} />
                ))}
              </div>
            </div>

            <div className="skills-panel">
              <h2>Skills</h2>
              <div className="badge-row">
                {profile.skills.map((s) => <Badge key={s} label={s} color="purple" />)}
              </div>
            </div>
          </div>
        )}

        {/* PROJECTS */}
        {tab === "projects" && (
          <div>
            <div className="section-header">
              <h2><FolderIcon /> Projects <span className="count">({projects.length})</span></h2>
              {/* Only visible to admin */}
              {isAdmin && (
                <Btn primary onClick={() => {
                  setDprRaw({ name: "", description: "", tech: [], github: "", live: "", color: "purple" });
                  setAddPr(true);
                }}>
                  <PlusIcon /> Add project
                </Btn>
              )}
            </div>
            <div className="project-list">
              {projects.map((p) => (
                <ProjectCard
                  key={p.id} proj={p} isAdmin={isAdmin}
                  onEdit={() => { setDprRaw({ ...p, tech: [...(p.tech || [])] }); setEditPr(p); }}
                  onDelete={() => deleteProject(p.id)}
                />
              ))}
              {projects.length === 0 && (
                <div className="empty-state">
                  <FolderIcon />
                  <p>No projects yet. {isAdmin ? "Add your first one!" : ""}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SKILLS */}
        {tab === "skills" && (
          <div>
            <div className="section-header">
              <h2>Skills & technologies</h2>
              {/* Only visible to admin */}
              {isAdmin && (
                <Btn onClick={() => { setDpRaw({ ...profile }); setEditP(true); }}>
                  <EditIcon /> Edit
                </Btn>
              )}
            </div>
            <div className="skills-grid">
              {profile.skills.map((s, i) => {
                const col = COLORS[i % COLORS.length];
                const c = CM[col];
                return (
                  <div key={s} className="skill-tile" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
                    <CodeIcon />
                    <span style={{ color: c.text }}>{s}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CONTACT */}
        {tab === "contact" && (
          <div>
            <h2 className="page-title">Get in touch</h2>
            <div className="contact-grid">
              {[
                { label: "Phone",     icon: <PhoneIcon />,    href: `tel:${profile.phone}`,     value: profile.phone },
                { label: "Email",     icon: <MailIcon />,     href: `mailto:${profile.email}`,  value: profile.email },
                { label: "GitHub",    icon: <GithubIcon />,   href: profile.social?.github,     value: "Liki19-HJ-dot" },
                { label: "LinkedIn",  icon: <LinkedinIcon />, href: profile.social?.linkedin,   value: "likhith-h-j" },
                { label: "Portfolio", icon: <GlobeIcon />,    href: profile.website,            value: profile.website?.replace(/https?:\/\//, "") },
                { label: "Location",  icon: <MapPinIcon />,   href: null,                       value: profile.location },
              ].filter((c) => c.value).map((c) => (
                <div key={c.label} className="contact-card">
                  <div className="contact-label">{c.icon}<span>{c.label}</span></div>
                  {c.href
                    ? <a href={c.href} target="_blank" rel="noreferrer" className="contact-value accent">{c.value}</a>
                    : <span className="contact-value">{c.value}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ── LOGIN MODAL ── */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onSuccess={loginAsAdmin} />}

      {/* ── EDIT PROFILE MODAL ── */}
      {editP && dp && (
        <Modal title="Edit profile" onClose={() => setEditP(false)}>
          <div className="avatar-center"><Avatar profile={dp} size={60} /></div>
          <Field label="Avatar URL"    value={dp.avatar || ""}  onChange={(v) => setDp((p) => ({ ...p, avatar: v }))}   placeholder="https://..." />
          <Field label="Name"          value={dp.name}          onChange={(v) => setDp((p) => ({ ...p, name: v }))} />
          <Field label="Title / role"  value={dp.title}         onChange={(v) => setDp((p) => ({ ...p, title: v }))} />
          <Field label="Bio"           value={dp.bio}           onChange={(v) => setDp((p) => ({ ...p, bio: v }))}       multi />
          <Field label="Location"      value={dp.location}      onChange={(v) => setDp((p) => ({ ...p, location: v }))} />
          <Field label="Email"         value={dp.email || ""}   onChange={(v) => setDp((p) => ({ ...p, email: v }))}    type="email" />
          <Field label="Website"       value={dp.website || ""} onChange={(v) => setDp((p) => ({ ...p, website: v }))} />
          <hr className="divider" />
          <p className="section-label">SOCIAL LINKS</p>
          <Field label="GitHub"    value={dp.social?.github    || ""} onChange={(v) => setDp((p) => ({ ...p, social: { ...p.social, github:    v } }))} />
          <Field label="LinkedIn"  value={dp.social?.linkedin  || ""} onChange={(v) => setDp((p) => ({ ...p, social: { ...p.social, linkedin:  v } }))} />
          <Field label="Phone" value={dp.phone || ""} onChange={(v) => setDp((p) => ({ ...p, phone: v }))} placeholder="+91 XXXXXXXXXX" />
          <hr className="divider" />
          <p className="section-label">SKILLS (comma separated)</p>
          <Field
            value={(dp.skills || []).join(", ")}
            onChange={(v) => setDp((p) => ({ ...p, skills: v.split(",").map((s) => s.trim()).filter(Boolean) }))}
            placeholder="React, Python, CSS..."
          />
          <div className="modal-actions">
            <Btn onClick={() => setEditP(false)}>Cancel</Btn>
            <Btn primary onClick={() => saveProfile(dp)}>Save changes</Btn>
          </div>
        </Modal>
      )}

      {/* ── ADD / EDIT PROJECT MODAL ── */}
      {(addPr || editPr) && dpr && (
        <Modal title={editPr ? "Edit project" : "Add new project"}
          onClose={() => { setAddPr(false); setEditPr(null); }}>
          <Field label="Project name"             value={dpr.name}                       onChange={(v) => setDpr((p) => ({ ...p, name: v }))}        placeholder="My project" />
          <Field label="Description"              value={dpr.description}                onChange={(v) => setDpr((p) => ({ ...p, description: v }))}  multi />
          <Field label="Tech stack (comma sep.)"  value={(dpr.tech || []).join(", ")}    onChange={(v) => setDpr((p) => ({ ...p, tech: v.split(",").map((s) => s.trim()).filter(Boolean) }))} placeholder="React, Python, CSS" />
          <Field label="GitHub URL"               value={dpr.github || ""}              onChange={(v) => setDpr((p) => ({ ...p, github: v }))} />
          <Field label="Live demo URL"            value={dpr.live || ""}                onChange={(v) => setDpr((p) => ({ ...p, live: v }))} />
          <div className="field">
            <label>Card colour</label>
            <div className="color-row">
              {COLORS.map((col) => {
                const c = CM[col];
                return (
                  <button key={col} onClick={() => setDpr((p) => ({ ...p, color: col }))}
                    aria-label={col} className="color-dot"
                    style={{ background: c.bg,
                      border: dpr.color === col ? `2px solid ${c.border}` : `1px solid ${c.border}`,
                      transform: dpr.color === col ? "scale(1.25)" : "scale(1)" }} />
                );
              })}
            </div>
          </div>
          <div className="modal-actions">
            <Btn onClick={() => { setAddPr(false); setEditPr(null); }}>Cancel</Btn>
            <Btn primary onClick={() => saveProject(dpr)} style={{ opacity: !dpr.name?.trim() ? 0.5 : 1 }}>
              {editPr ? "Save changes" : "Add project"}
            </Btn>
          </div>
        </Modal>
      )}
    </>
  );
}