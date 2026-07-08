import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  ArrowRight,
  BookOpen,
  Clock3,
  PlayCircle,
  Download,
  User,
  LogOut,
  ShieldCheck,
  Link,
  AlertTriangle,
  PauseCircle,
  CheckCircle,
  XCircle,
  Calendar,
  Timer,
  Lock,
  Video,
  Headphones,
  ChevronRight,
  Star,
  TrendingUp,
} from "lucide-react";

// ─── Mock Student Data with Expiry Dates & Countdown ─────
const MOCK_STUDENTS_DATA = {
  "student@demo.com": {
    id: "STU001",
    name: "Anjali Verma",
    email: "student@demo.com",
    phone: "+91 98765 43210",
    enrollmentDate: "2024-01-15",
    subscriptionEnd: "2026-08-15", // 38 days from July 8, 2026
    studentId: "DIGI2025",
    avatar: null,
    purchasedCourses: [
      {
        id: 1,
        title: "SEO & Performance Marketing",
        instructor: "Rajesh Kumar",
        progress: 85,
        startDate: "2026-06-01",
        endDate: "2026-09-01",
        liveClass: {
          date: "2026-07-08",
          time: "8:00 PM",
          duration: "90 min",
          topic: "Advanced SEO Techniques",
          linkType: "zoom",
          meetingId: "123-456-789",
        },
        recordings: [
          { id: 1, title: "Introduction to SEO", duration: "45 min", uploadDate: "2026-06-05" },
          { id: 2, title: "Keyword Research Mastery", duration: "60 min", uploadDate: "2026-06-12" },
        ],
        upcomingClasses: [
          { date: "2026-07-10", time: "8:00 PM", topic: "Link Building Strategies" },
          { date: "2026-07-15", time: "8:00 PM", topic: "Technical SEO Deep Dive" },
        ],
        purchased: true,
        expired: false,
      },
      {
        id: 2,
        title: "Google Ads Mastery",
        instructor: "Priya Sharma",
        progress: 60,
        startDate: "2026-06-15",
        endDate: "2026-09-15",
        liveClass: {
          date: "2026-07-10",
          time: "2:00 PM",
          duration: "120 min",
          topic: "Campaign Optimization",
          linkType: "meet",
          meetingId: "abc-defg-hij",
        },
        recordings: [
          { id: 3, title: "Google Ads Basics", duration: "55 min", uploadDate: "2026-06-20" },
        ],
        upcomingClasses: [
          { date: "2026-07-12", time: "2:00 PM", topic: "Budget Management" },
        ],
        purchased: true,
        expired: false,
      },
      {
        id: 3,
        title: "Meta Ads (Lead Gen)",
        instructor: "Amit Patel",
        progress: 42,
        startDate: "2026-05-01",
        endDate: "2026-07-01",
        liveClass: { date: null, time: null, topic: null, linkType: null, meetingId: null },
        recordings: [
          { id: 4, title: "Facebook Ads Fundamentals", duration: "40 min", uploadDate: "2026-05-10" },
          { id: 5, title: "Instagram Marketing", duration: "50 min", uploadDate: "2026-05-20" },
        ],
        upcomingClasses: [],
        purchased: true,
        expired: true,
      },
    ],
    hold: false,
    analytics: {
      totalHoursWatched: "24h 30m",
      assignmentsCompleted: "7/10",
      liveClassesAttended: 12,
      certificatesEarned: 1,
      averageProgress: 62,
    },
  },
};

// ─── Helper: Countdown Timer ─────────────────
const CountdownTimer = ({ targetDate, label }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate) - new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <Timer size={16} color="#dc2626" />
      <div style={{ display: "flex", gap: "0.3rem", alignItems: "center" }}>
        <span style={{ fontSize: "0.85rem", color: "#6b7280" }}>{label}:</span>
        <div style={{ display: "flex", gap: "0.3rem" }}>
          {Object.entries(timeLeft).map(([key, value]) => (
            <span
              key={key}
              style={{
                background: "#fef2f2",
                color: "#dc2626",
                padding: "0.2rem 0.5rem",
                borderRadius: "6px",
                fontWeight: 700,
                fontSize: "0.85rem",
              }}
            >
              {value.toString().padStart(2, "0")}{key.charAt(0).toUpperCase()}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Helper: Format Date ─────────────────
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-IN", options);
};

// ─── Helper: Backend Error Alert ─────────────────
const showBackendError = () => {
  alert("⚠️ This feature requires backend connection. Please contact support for access.");
};

const showDownloadRestriction = () => {
  alert("🔒 Downloads are restricted for security reasons. Content can only be viewed within the platform.");
};

export default function StudentCorner() {
  const { studentUser, loginStudent, logoutStudent } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLogin = (e) => {
    e.preventDefault();
    const success = loginStudent(email, password);
    if (!success) setLoginError("Fill the correct details");
    else setLoginError("");
  };

  // ─── LOGIN VIEW ───────────────────────────────────
  if (!studentUser) {
    return (
      <div style={styles.loginContainer}>
        <div style={styles.loginCard}>
          <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
            <div style={styles.logoIcon}>
              <BookOpen size={32} color="#fff" />
            </div>
            <h1 style={styles.loginTitle}>Student Corner</h1>
            <p style={styles.loginSubtitle}>Access your personalized learning dashboard</p>
          </div>

          <div style={styles.demoCard}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <ShieldCheck size={18} color="#dc2626" />
              <strong style={{ color: "#b91c1c" }}> Enter your student login details</strong>
            </div>
            <p style={styles.demoText}>
              <strong></strong>  
            </p>
            <p style={styles.demoText}>
              <strong></strong>  
            </p>
          </div>

          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Username</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Username"
                style={styles.input}
                required
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={styles.input}
                required
              />
            </div>
            {loginError && <p style={styles.error}>{loginError}</p>}
            <button type="submit" style={styles.loginButton}>
              Login to Dashboard <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ─── DASHBOARD DATA ─────
  const studentData = MOCK_STUDENTS_DATA[studentUser.email] || MOCK_STUDENTS_DATA["student@demo.com"];
  const { purchasedCourses, analytics } = studentData;
  const activeCourses = purchasedCourses.filter((c) => !c.expired);
  const expiredCourses = purchasedCourses.filter((c) => c.expired);

  // ─── DASHBOARD VIEW ──────────────────────────────────
  return (
    <div style={styles.dashboard}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <div style={styles.logoIconSmall}>
            <BookOpen size={24} color="#fff" />
          </div>
          <span style={styles.sidebarTitle}>Student Portal</span>
        </div>
        
        <nav style={styles.nav}>
          {[
            { id: "dashboard", icon: <BookOpen size={18} />, label: "Dashboard" },
            { id: "live", icon: <Video size={18} />, label: "Live Classes" },
            { id: "recordings", icon: <PlayCircle size={18} />, label: "Recordings" },
            { id: "profile", icon: <User size={18} />, label: "My Profile" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                ...styles.navItem,
                background: activeTab === item.id ? "#fef2f2" : "transparent",
                color: activeTab === item.id ? "#dc2626" : "#4b5563",
                borderLeft: activeTab === item.id ? "3px solid #dc2626" : "3px solid transparent",
              }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div style={styles.sidebarFooter}>
          <div style={styles.userInfo}>
            <div style={styles.avatar}>
              {studentData.name.split(" ").map(n => n[0]).join("").toUpperCase()}
            </div>
            <div>
              <p style={styles.userName}>{studentData.name}</p>
              <p style={styles.userEmail}>{studentData.email}</p>
            </div>
          </div>
          <button onClick={logoutStudent} style={styles.logoutButton}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.welcomeText}>Welcome back, {studentData.name.split(" ")[0]}! 👋</h1>
            <p style={styles.headerSubtitle}>Continue your learning journey</p>
          </div>
          <CountdownTimer targetDate={studentData.subscriptionEnd} label="Access Expires" />
        </div>

        {/* Account Hold Warning */}
        {studentData.hold && (
          <div style={styles.holdWarning}>
            <PauseCircle size={24} color="#dc2626" />
            <div>
              <strong style={{ color: "#b91c1c" }}>Account On Hold</strong>
              <p style={{ margin: "0.2rem 0 0", color: "#4b5563" }}>
                Your access has been temporarily restricted. Please contact support.
              </p>
            </div>
          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <>
            {/* Stats Grid */}
            <div style={styles.statsGrid}>
              <SummaryCard icon={<BookOpen />} title="Active Courses" value={activeCourses.length} color="#dc2626" />
              <SummaryCard icon={<Clock3 />} title="Upcoming Live" value={purchasedCourses.filter(c => c.liveClass.date).length} color="#059669" />
              <SummaryCard icon={<PlayCircle />} title="Recordings" value={purchasedCourses.reduce((acc, c) => acc + c.recordings.length, 0)} color="#7c3aed" />
              <SummaryCard icon={<TrendingUp />} title="Avg Progress" value={`${analytics.averageProgress}%`} color="#2563eb" />
            </div>

            {/* Active Courses */}
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>📚 My Active Courses</h2>
              <div style={styles.courseGrid}>
                {activeCourses.map((course) => (
                  <CourseCard key={course.id} course={course} studentData={studentData} />
                ))}
              </div>
            </div>

            {/* Upcoming Live Classes */}
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>🔴 Upcoming Live Classes</h2>
              <div style={styles.liveClassesList}>
                {purchasedCourses
                  .filter(c => c.liveClass.date && !c.expired)
                  .map((course) => (
                    <LiveClassCard key={course.id} course={course} />
                  ))}
              </div>
            </div>

            {/* Recent Recordings */}
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>🎥 Recent Recordings</h2>
              <div style={styles.recordingsGrid}>
                {purchasedCourses
                  .filter(c => !c.expired)
                  .slice(0, 1)
                  .map((course) =>
                    course.recordings.slice(-2).map((rec) => (
                      <RecordingCard key={rec.id} recording={rec} courseTitle={course.title} />
                    ))
                  )}
              </div>
            </div>
          </>
        )}

        {/* Live Classes Tab */}
        {activeTab === "live" && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>🔴 Live Classes Schedule</h2>
            {purchasedCourses
              .filter(c => !c.expired)
              .map((course) => (
                <div key={course.id} style={styles.liveClassFullCard}>
                  <h3 style={styles.courseTitleLive}>{course.title}</h3>
                  {course.liveClass.date ? (
                    <div style={styles.liveClassDetails}>
                      <div style={styles.liveClassInfo}>
                        <p><Calendar size={14} /> {formatDate(course.liveClass.date)}</p>
                        <p><Clock3 size={14} /> {course.liveClass.time} ({course.liveClass.duration})</p>
                        <p><Video size={14} /> {course.liveClass.topic}</p>
                      </div>
                      <button onClick={showBackendError} style={styles.joinButton}>
                        <Link size={16} /> Join Live Class
                      </button>
                    </div>
                  ) : (
                    <p style={{ color: "#6b7280" }}>No live classes scheduled</p>
                  )}
                  {course.upcomingClasses.length > 0 && (
                    <div style={styles.upcomingClasses}>
                      <h4>Upcoming Classes:</h4>
                      {course.upcomingClasses.map((cls, idx) => (
                        <p key={idx} style={styles.upcomingClassItem}>
                          {formatDate(cls.date)} - {cls.time}: {cls.topic}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}

        {/* Recordings Tab */}
        {activeTab === "recordings" && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>📀 Pre-recorded Content</h2>
            {purchasedCourses
              .filter(c => !c.expired)
              .map((course) => (
                <div key={course.id} style={styles.recordingSectionCard}>
                  <h3 style={styles.courseTitleLive}>{course.title}</h3>
                  <div style={styles.recordingsGrid}>
                    {course.recordings.map((rec) => (
                      <RecordingCard key={rec.id} recording={rec} courseTitle={course.title} />
                    ))}
                  </div>
                </div>
              ))}
            {purchasedCourses.filter(c => !c.expired).every(c => c.recordings.length === 0) && (
              <p style={{ color: "#6b7280", textAlign: "center", padding: "2rem" }}>
                No recordings available yet. Check back soon!
              </p>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div style={styles.profileGrid}>
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>👤 Profile Information</h2>
              <div style={styles.profileCard}>
                <div style={styles.profileAvatar}>
                  {studentData.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                </div>
                <div style={styles.profileInfo}>
                  <h3>{studentData.name}</h3>
                  <p>📧 {studentData.email}</p>
                  <p>📱 {studentData.phone}</p>
                  <p>🆔 Student ID: {studentData.studentId}</p>
                  <p>📅 Enrolled: {formatDate(studentData.enrollmentDate)}</p>
                  <p>⏰ Access Until: {formatDate(studentData.subscriptionEnd)}</p>
                </div>
              </div>
            </div>

            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>📊 Learning Analytics</h2>
              <div style={styles.analyticsGrid}>
                <AnalyticCard label="Hours Watched" value={analytics.totalHoursWatched} icon={<Clock3 />} />
                <AnalyticCard label="Assignments" value={analytics.assignmentsCompleted} icon={<CheckCircle />} />
                <AnalyticCard label="Live Classes" value={analytics.liveClassesAttended} icon={<Video />} />
                <AnalyticCard label="Certificates" value={analytics.certificatesEarned} icon={<Star />} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Helper Components ──────────────────────────────

function SummaryCard({ icon, title, value, color }) {
  return (
    <div style={styles.summaryCard}>
      <div style={{ ...styles.summaryIcon, background: `${color}15`, color: color }}>{icon}</div>
      <div>
        <p style={styles.summaryTitle}>{title}</p>
        <p style={styles.summaryValue}>{value}</p>
      </div>
    </div>
  );
}

function CourseCard({ course, studentData }) {
  const isExpired = course.expired;
  const daysLeft = Math.ceil((new Date(course.endDate) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div style={{ ...styles.courseCard, opacity: isExpired ? 0.7 : 1 }}>
      <div style={styles.courseHeader}>
        <div>
          <h3 style={styles.courseTitle}>{course.title}</h3>
          <p style={styles.instructorName}>👨‍🏫 {course.instructor}</p>
        </div>
        {isExpired ? (
          <span style={styles.expiredBadge}><XCircle size={14} /> Expired</span>
        ) : (
          <span style={styles.activeBadge}><CheckCircle size={14} /> Active</span>
        )}
      </div>

      <div style={styles.progressSection}>
        <div style={styles.progressHeader}>
          <span>Progress</span>
          <span style={{ color: "#dc2626", fontWeight: 700 }}>{course.progress}%</span>
        </div>
        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: `${course.progress}%` }} />
        </div>
      </div>

      <div style={styles.courseDetails}>
        <p><Calendar size={14} /> {formatDate(course.startDate)} - {formatDate(course.endDate)}</p>
        <p><Clock3 size={14} /> {daysLeft} days remaining</p>
        <p><Video size={14} /> {course.recordings.length} recordings</p>
      </div>

      <CountdownTimer targetDate={course.endDate} label="Course ends in" />
    </div>
  );
}

function LiveClassCard({ course }) {
  return (
    <div style={styles.liveClassCard}>
      <div style={styles.liveClassHeader}>
        <span style={styles.liveIndicator}>🔴 LIVE</span>
        <span style={styles.courseNameLive}>{course.title}</span>
      </div>
      <div style={styles.liveClassInfo}>
        <p><Calendar size={14} /> {formatDate(course.liveClass.date)}</p>
        <p><Clock3 size={14} /> {course.liveClass.time} ({course.liveClass.duration})</p>
        <p><Headphones size={14} /> {course.liveClass.topic}</p>
      </div>
      <button onClick={showBackendError} style={styles.joinButton}>
        <Link size={16} /> Join Now
      </button>
    </div>
  );
}

function RecordingCard({ recording, courseTitle }) {
  return (
    <div style={styles.recordingCard}>
      <div style={styles.recordingInfo}>
        <PlayCircle size={20} color="#dc2626" />
        <div>
          <p style={styles.recordingTitle}>{recording.title}</p>
          <p style={styles.recordingMeta}>
            {courseTitle} • {recording.duration} • Uploaded {formatDate(recording.uploadDate)}
          </p>
        </div>
      </div>
      <div style={styles.recordingActions}>
        <button onClick={showBackendError} style={styles.watchButton}>
          <PlayCircle size={14} /> Watch
        </button>
        <button onClick={showDownloadRestriction} style={styles.downloadButton}>
          <Download size={14} /> <Lock size={10} />
        </button>
      </div>
    </div>
  );
}

function AnalyticCard({ label, value, icon }) {
  return (
    <div style={styles.analyticCard}>
      <div style={{ color: "#dc2626" }}>{icon}</div>
      <div>
        <p style={styles.analyticLabel}>{label}</p>
        <p style={styles.analyticValue}>{value}</p>
      </div>
    </div>
  );
}

// ─── Styles ──────────────────────────────
const styles = {
  loginContainer: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #fef2f2 0%, #fff5f5 100%)",
    padding: "1rem",
  },
  loginCard: {
    maxWidth: "450px",
    width: "100%",
    background: "#fff",
    borderRadius: "24px",
    padding: "2rem",
    boxShadow: "0 20px 60px rgba(220, 38, 38, 0.1)",
    border: "1px solid #fecaca",
  },
  logoIcon: {
    width: "64px",
    height: "64px",
    background: "linear-gradient(135deg, #dc2626, #991b1b)",
    borderRadius: "16px",
    display: "grid",
    placeItems: "center",
    margin: "0 auto 1rem",
  },
  loginTitle: {
    fontWeight: 900,
    color: "#111827",
    margin: "0 0 0.5rem",
    fontSize: "1.8rem",
  },
  loginSubtitle: {
    color: "#6b7280",
    margin: 0,
  },
  demoCard: {
    background: "#fff5f5",
    border: "1px solid #fecaca",
    borderRadius: "16px",
    padding: "1rem",
    marginBottom: "1.5rem",
  },
  demoText: {
    margin: "0.2rem 0",
    color: "#4b5563",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.35rem",
  },
  label: {
    fontWeight: 700,
    color: "#374151",
    fontSize: "0.9rem",
  },
  input: {
    width: "100%",
    padding: "0.9rem",
    borderRadius: "14px",
    border: "1px solid #e5e7eb",
    outline: "none",
    fontSize: "1rem",
    transition: "border-color 0.2s",
  },
  error: {
    color: "#dc2626",
    margin: "0.5rem 0",
    fontWeight: 500,
  },
  loginButton: {
    width: "100%",
    background: "linear-gradient(135deg, #dc2626, #991b1b)",
    color: "#fff",
    border: "none",
    padding: "0.95rem",
    borderRadius: "14px",
    fontWeight: 800,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    fontSize: "1rem",
    transition: "transform 0.2s",
  },
  dashboard: {
    display: "flex",
    minHeight: "100vh",
    background: "#f9fafb",
  },
  sidebar: {
    width: "280px",
    background: "#fff",
    borderRight: "1px solid #f3f4f6",
    display: "flex",
    flexDirection: "column",
    padding: "1.5rem",
    position: "sticky",
    top: 0,
    height: "100vh",
  },
  sidebarHeader: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: "2rem",
  },
  logoIconSmall: {
    width: "40px",
    height: "40px",
    background: "linear-gradient(135deg, #dc2626, #991b1b)",
    borderRadius: "10px",
    display: "grid",
    placeItems: "center",
  },
  sidebarTitle: {
    fontWeight: 800,
    fontSize: "1.2rem",
    color: "#111827",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    flex: 1,
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.75rem 1rem",
    borderRadius: "12px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "0.95rem",
    transition: "all 0.2s",
  },
  sidebarFooter: {
    borderTop: "1px solid #f3f4f6",
    paddingTop: "1rem",
    marginTop: "auto",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: "1rem",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #dc2626, #991b1b)",
    display: "grid",
    placeItems: "center",
    color: "#fff",
    fontWeight: 800,
    fontSize: "0.9rem",
  },
  userName: {
    margin: 0,
    fontWeight: 700,
    color: "#111827",
  },
  userEmail: {
    margin: 0,
    color: "#6b7280",
    fontSize: "0.85rem",
  },
  logoutButton: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    background: "#fef2f2",
    border: "1px solid #fecaca",
    padding: "0.6rem 1rem",
    borderRadius: "10px",
    fontWeight: 700,
    cursor: "pointer",
    color: "#dc2626",
    width: "100%",
    justifyContent: "center",
  },
  mainContent: {
    flex: 1,
    padding: "2rem",
    overflowY: "auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    flexWrap: "wrap",
    gap: "1rem",
  },
  welcomeText: {
    margin: 0,
    fontWeight: 900,
    color: "#111827",
    fontSize: "1.8rem",
  },
  headerSubtitle: {
    margin: "0.25rem 0 0",
    color: "#6b7280",
  },
  holdWarning: {
    background: "#fff5f5",
    border: "1px solid #fecaca",
    borderRadius: "16px",
    padding: "1rem",
    marginBottom: "1.5rem",
    display: "flex",
    alignItems: "center",
    gap: "0.8rem",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "1rem",
    marginBottom: "2rem",
  },
  summaryCard: {
    background: "#fff",
    border: "1px solid #f3f4f6",
    borderRadius: "16px",
    padding: "1.5rem",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
  },
  summaryIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    display: "grid",
    placeItems: "center",
  },
  summaryTitle: {
    margin: 0,
    color: "#6b7280",
    fontSize: "0.9rem",
  },
  summaryValue: {
    margin: "0.25rem 0 0",
    fontWeight: 800,
    fontSize: "1.5rem",
  },
  section: {
    marginBottom: "2rem",
  },
  sectionTitle: {
    fontWeight: 800,
    color: "#111827",
    marginBottom: "1rem",
    fontSize: "1.3rem",
  },
  courseGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "1rem",
  },
  courseCard: {
    background: "#fff",
    border: "1px solid #f3f4f6",
    borderRadius: "16px",
    padding: "1.5rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
  },
  courseHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "1rem",
  },
  courseTitle: {
    margin: 0,
    fontWeight: 800,
    color: "#111827",
    fontSize: "1.1rem",
  },
  instructorName: {
    margin: "0.25rem 0 0",
    color: "#6b7280",
    fontSize: "0.9rem",
  },
  expiredBadge: {
    background: "#fee2e2",
    color: "#dc2626",
    padding: "0.3rem 0.7rem",
    borderRadius: "8px",
    fontWeight: 700,
    fontSize: "0.8rem",
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
  },
  activeBadge: {
    background: "#d1fae5",
    color: "#059669",
    padding: "0.3rem 0.7rem",
    borderRadius: "8px",
    fontWeight: 700,
    fontSize: "0.8rem",
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
  },
  progressSection: {
    marginBottom: "1rem",
  },
  progressHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "0.5rem",
    color: "#6b7280",
    fontSize: "0.9rem",
  },
  progressBar: {
    width: "100%",
    height: "8px",
    background: "#f3f4f6",
    borderRadius: "4px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #dc2626, #f87171)",
    borderRadius: "4px",
    transition: "width 0.3s ease",
  },
  courseDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    marginBottom: "1rem",
    color: "#6b7280",
    fontSize: "0.9rem",
  },
  liveClassesList: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  liveClassCard: {
    background: "#fff",
    border: "2px solid #fecaca",
    borderRadius: "16px",
    padding: "1.5rem",
    boxShadow: "0 4px 12px rgba(220, 38, 38, 0.05)",
  },
  liveClassHeader: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: "1rem",
  },
  liveIndicator: {
    background: "#dc2626",
    color: "#fff",
    padding: "0.3rem 0.7rem",
    borderRadius: "8px",
    fontWeight: 700,
    fontSize: "0.8rem",
    animation: "pulse 2s infinite",
  },
  courseNameLive: {
    fontWeight: 700,
    color: "#111827",
  },
  liveClassInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    marginBottom: "1rem",
    color: "#4b5563",
    fontSize: "0.9rem",
  },
  joinButton: {
    background: "linear-gradient(135deg, #dc2626, #991b1b)",
    color: "#fff",
    border: "none",
    padding: "0.7rem 1.5rem",
    borderRadius: "12px",
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.95rem",
  },
  recordingsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1rem",
  },
  recordingCard: {
    background: "#fff",
    border: "1px solid #f3f4f6",
    borderRadius: "12px",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
  },
  recordingInfo: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  recordingTitle: {
    margin: 0,
    fontWeight: 700,
    color: "#111827",
  },
  recordingMeta: {
    margin: "0.25rem 0 0",
    color: "#6b7280",
    fontSize: "0.85rem",
  },
  recordingActions: {
    display: "flex",
    gap: "0.5rem",
  },
  watchButton: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
    fontSize: "0.85rem",
  },
  downloadButton: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
    color: "#9ca3af",
    fontSize: "0.85rem",
  },
  liveClassFullCard: {
    background: "#fff",
    border: "1px solid #f3f4f6",
    borderRadius: "16px",
    padding: "1.5rem",
    marginBottom: "1rem",
  },
  courseTitleLive: {
    fontWeight: 800,
    color: "#111827",
    marginBottom: "1rem",
  },
  liveClassDetails: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "1rem",
  },
  upcomingClasses: {
    marginTop: "1rem",
    paddingTop: "1rem",
    borderTop: "1px solid #f3f4f6",
  },
  upcomingClassItem: {
    color: "#4b5563",
    fontSize: "0.9rem",
    margin: "0.5rem 0",
  },
  recordingSectionCard: {
    background: "#fff",
    border: "1px solid #f3f4f6",
    borderRadius: "16px",
    padding: "1.5rem",
    marginBottom: "1rem",
  },
  profileGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "1.5rem",
  },
  profileCard: {
    display: "flex",
    gap: "1.5rem",
    alignItems: "center",
    padding: "1rem",
  },
  profileAvatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #dc2626, #991b1b)",
    display: "grid",
    placeItems: "center",
    color: "#fff",
    fontWeight: 900,
    fontSize: "1.8rem",
  },
  profileInfo: {
    flex: 1,
  },
  analyticsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1rem",
  },
  analyticCard: {
    background: "#f9fafb",
    border: "1px solid #f3f4f6",
    borderRadius: "12px",
    padding: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  analyticLabel: {
    margin: 0,
    color: "#6b7280",
    fontSize: "0.85rem",
  },
  analyticValue: {
    margin: "0.25rem 0 0",
    fontWeight: 800,
    fontSize: "1.2rem",
    color: "#111827",
  },
};

// Add keyframe animation for live indicator
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.6; }
    100% { opacity: 1; }
  }
`;
document.head.appendChild(style);