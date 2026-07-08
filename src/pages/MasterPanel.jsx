import React, { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import {
  ArrowRight,
  ShieldCheck,
  Users,
  Video,
  Upload,
  PlusCircle,
  LogOut,
  BookOpen,
  BarChart3,
  Settings,
  Trash2,
  UserX,
  UserPlus,
  PauseCircle,
  PlayCircle,
  AlertTriangle,
  Calendar,
  Clock,
  Radio,
  FileVideo,
  CheckCircle,
  XCircle,
  Timer,
  Copy,
  Eye,
  EyeOff,
  Key,
  Mail,
  User,
  Check,
} from "lucide-react";

// ─── Helper: Generate Random Password ────────────
const generatePassword = (length = 10) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

// ─── Mock Data ────────────────────────────────────
const MOCK_STUDENTS = [
  {
    id: 1,
    name: "Anjali Verma",
    email: "anjali@email.com",
    course: "SEO & Performance",
    purchased: true,
    startDate: "2026-06-01",
    endDate: "2026-09-01",
    access: "Full",
    hold: false,
    password: "Anjali@2026",
  },
  {
    id: 2,
    name: "Rohit Kumar",
    email: "rohit@email.com",
    course: "Google Ads",
    purchased: false,
    startDate: "",
    endDate: "",
    access: "Limited",
    hold: false,
    password: "Rohit@2026",
  },
  {
    id: 3,
    name: "Priya Menon",
    email: "priya@email.com",
    course: "Meta Ads",
    purchased: true,
    startDate: "2026-05-01",
    endDate: "2026-07-01",
    access: "None",
    hold: true,
    password: "Priya@2026",
  },
  {
    id: 4,
    name: "Arjun Singh",
    email: "arjun@email.com",
    course: "Social Media Strategy",
    purchased: true,
    startDate: "2026-07-01",
    endDate: "2026-12-31",
    access: "Full",
    hold: false,
    password: "Arjun@2026",
  },
];

const MOCK_LIVE_CLASSES = [
  {
    id: 1,
    title: "SEO Basics",
    course: "SEO & Performance",
    date: "2026-07-10",
    time: "8:00 PM",
    status: "scheduled",
    recordingUrl: null,
  },
  {
    id: 2,
    title: "Google Ads Setup",
    course: "Google Ads",
    date: "2026-07-12",
    time: "2:00 PM",
    status: "scheduled",
    recordingUrl: "/recordings/ads-setup.mp4",
  },
  {
    id: 3,
    title: "Meta Ads Creative",
    course: "Meta Ads",
    date: "2026-06-25",
    time: "7:00 PM",
    status: "ended",
    recordingUrl: "/recordings/meta-creative.mp4",
  },
];

// Mock upload history for classes that already have a recordingUrl
const MOCK_UPLOAD_HISTORY = MOCK_LIVE_CLASSES
  .filter((c) => c.recordingUrl)
  .map((c) => ({
    id: `hist-${c.id}`,
    classId: c.id,
    className: c.title,
    course: c.course,
    recordingUrl: c.recordingUrl,
    fileName: c.recordingUrl.split("/").pop().replace(/-/g, " "),
    uploadDate: "2026-06-30",
  }));



export default function MasterPanel() {
  const { masterUser, loginMaster, logoutMaster } = useAuth();

  // ─── State ──────────────────────────────────────
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Live class management
  const [liveClasses, setLiveClasses] = useState(MOCK_LIVE_CLASSES);
  const [showCreateClass, setShowCreateClass] = useState(false);
  const [newLiveClass, setNewLiveClass] = useState({
    title: "",
    course: "",
    date: "",
    time: "",
  });

  // Student management
  const [students, setStudents] = useState(MOCK_STUDENTS);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    course: "",
    startDate: "",
    endDate: "",
  });

  // ─── NEW: Credential Modal State ────────────────
  const [credentialModal, setCredentialModal] = useState({
    show: false,
    studentName: "",
    studentEmail: "",
    studentPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState(null); // 'email' | 'password' | null

  // Recording upload (simulated with local file name)
  const [selectedClassForRecording, setSelectedClassForRecording] = useState("");
  const [recordingFile, setRecordingFile] = useState(null);
  const fileInputRef = useRef(null);

  // Upload history state
  const [uploadHistory, setUploadHistory] = useState(MOCK_UPLOAD_HISTORY);

  // Delete confirmation
  const [deleteStudentId, setDeleteStudentId] = useState(null);

  // ─── Computed Stats ────────────────────────────
  const totalStudents = students.length;
  const purchasedCount = students.filter((s) => s.purchased).length;
  const notPurchasedCount = students.filter((s) => !s.purchased).length;
  const expiredCount = students.filter(
    (s) => s.endDate && new Date(s.endDate) < new Date()
  ).length;

  // ─── Handlers ──────────────────────────────────
  const handleLogin = (e) => {
    e.preventDefault();
    const ok = loginMaster(email, password);
    if (!ok) setLoginError("Fill the correct details");
    else setLoginError("");
  };

  // Create live class (no third‑party links)
  const handleCreateLiveClass = (e) => {
    e.preventDefault();
    const newClass = {
      id: Date.now(),
      ...newLiveClass,
      status: "scheduled",
      recordingUrl: null,
    };
    setLiveClasses([...liveClasses, newClass]);
    setNewLiveClass({ title: "", course: "", date: "", time: "" });
    setShowCreateClass(false);
    alert("✅ Live class scheduled successfully (in‑platform).");
  };

  // Start a live class (simulate built‑in streaming)
  const startLiveClass = (classId) => {
    setLiveClasses((prev) =>
      prev.map((c) => (c.id === classId ? { ...c, status: "live" } : c))
    );
    alert("🔴 Live class started! Students can now join from their dashboard.");
  };

  // End a live class
  const endLiveClass = (classId) => {
    setLiveClasses((prev) =>
      prev.map((c) => (c.id === classId ? { ...c, status: "ended" } : c))
    );
    alert("⏹️ Live class ended.");
  };

  // Simulate recording upload (store file name as URL)
  const handleUploadRecording = (e) => {
    e.preventDefault();
    if (!selectedClassForRecording || !recordingFile) {
      alert("Please select a class and a video file.");
      return;
    }
    const classId = Number(selectedClassForRecording);
    const targetClass = liveClasses.find((c) => c.id === classId);
    if (!targetClass) return;

    const fileName = recordingFile.name || "recording.mp4";
    const fakeUrl = `/recordings/${fileName.replace(/\s+/g, "-")}`;

    // Update liveClasses with recordingUrl
    setLiveClasses((prev) =>
      prev.map((c) =>
        c.id === classId ? { ...c, recordingUrl: fakeUrl } : c
      )
    );

    // Add to upload history
    const newHistoryEntry = {
      id: `hist-${Date.now()}`,
      classId,
      className: targetClass.title,
      course: targetClass.course,
      recordingUrl: fakeUrl,
      fileName,
      uploadDate: new Date().toISOString().split("T")[0],
    };
    setUploadHistory((prev) => [...prev, newHistoryEntry]);

    setSelectedClassForRecording("");
    setRecordingFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    alert("📁 Recording uploaded! Available for students within the platform.");
  };

  // Delete upload history entry
  const handleDeleteHistory = (historyId) => {
    setUploadHistory((prev) => prev.filter((h) => h.id !== historyId));
    alert("🗑️ History entry removed.");
  };

  // ─── Add student with auto-generated password ────
  const handleAddStudent = (e) => {
    e.preventDefault();
    const generatedPassword = generatePassword(12);
    const student = {
      id: Date.now(),
      ...newStudent,
      purchased: true,
      access: "Full",
      hold: false,
      password: generatedPassword,
    };
    setStudents([...students, student]);

    // Show credential modal
    setCredentialModal({
      show: true,
      studentName: student.name,
      studentEmail: student.email,
      studentPassword: generatedPassword,
    });
    setShowPassword(false);
    setCopiedField(null);

    setNewStudent({ name: "", email: "", course: "", startDate: "", endDate: "" });
    setShowAddStudent(false);
  };

  // ─── Copy to clipboard ──────────────────────────
  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  // ─── Close credential modal ─────────────────────
  const closeCredentialModal = () => {
    setCredentialModal({ show: false, studentName: "", studentEmail: "", studentPassword: "" });
    setShowPassword(false);
    setCopiedField(null);
  };

  // Delete student
  const handleDeleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
    setDeleteStudentId(null);
    alert("🗑️ Student deleted.");
  };

  // Toggle hold
  const handleToggleHold = (id) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, hold: !s.hold } : s))
    );
    alert("⏸️ Student hold status toggled.");
  };

  // Change access level
  const handleChangeAccess = (id, newAccess) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, access: newAccess } : s))
    );
  };

  // ─── LOGIN VIEW ───────────────────────────────────
  if (!masterUser) {
    return (
      <div style={styles.loginContainer}>
        <div style={styles.loginCard}>
          <div style={styles.loginHeader}>
            <div style={styles.loginIcon}>
              <ShieldCheck size={32} color="#fff" />
            </div>
            <h1 style={styles.loginTitle}>Master Panel</h1>
            <p style={styles.loginSubtitle}>Admin login for class management</p>
          </div>

          <div style={styles.demoCard}>
            <div style={styles.demoHeader}>
              <ShieldCheck size={18} color="#dc2626" />
              <strong style={{ color: "#b91c1c" }}>Enter your master login details</strong>
            </div>
            <p style={styles.demoText}><strong> </strong>  </p>
            <p style={styles.demoText}><strong>  </strong>  </p>
          </div>

          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="username"
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
              Access Master Panel <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ─── DASHBOARD VIEW ──────────────────────────────
  return (
    <div style={styles.dashboard}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.heading}>Master Dashboard</h2>
        <button onClick={logoutMaster} style={styles.logoutBtn}>
          <LogOut size={16} /> Logout
        </button>
      </div>

      {/* Summary Cards */}
      <div style={styles.summaryGrid}>
        <SummaryCard icon={<Users size={24} />} title="Total Students" value={totalStudents} />
        <SummaryCard icon={<BookOpen size={24} />} title="Purchased Course" value={purchasedCount} />
        <SummaryCard icon={<AlertTriangle size={24} />} title="Not Purchased" value={notPurchasedCount} />
        <SummaryCard icon={<Timer size={24} />} title="Expired Access" value={expiredCount} />
      </div>

      {/* Live Class Management */}
      <div style={styles.sectionRow}>
        <SectionCard title="📡 Live Classes (In‑Platform)">
          <div style={styles.classList}>
            {liveClasses.map((cls) => (
              <div key={cls.id} style={styles.classItem}>
                <div style={styles.classInfo}>
                  <strong>{cls.title}</strong>
                  <span style={styles.classCourse}>{cls.course}</span>
                  <div style={styles.classDateTime}>
                    <Calendar size={14} /> {cls.date} <Clock size={14} /> {cls.time}
                  </div>
                </div>
                <div style={styles.classActions}>
                  <span style={styles.statusBadge(cls.status)}>
                    {cls.status === "live" && <Radio size={14} color="#dc2626" />}
                    {cls.status.charAt(0).toUpperCase() + cls.status.slice(1)}
                  </span>
                  {cls.status === "scheduled" && (
                    <button onClick={() => startLiveClass(cls.id)} style={styles.startBtn}>
                      <PlayCircle size={14} /> Go Live
                    </button>
                  )}
                  {cls.status === "live" && (
                    <button onClick={() => endLiveClass(cls.id)} style={styles.endBtn}>
                      <XCircle size={14} /> End
                    </button>
                  )}
                  {cls.recordingUrl && (
                    <span style={styles.recordingBadge}>
                      <FileVideo size={14} /> Recording ready
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setShowCreateClass(!showCreateClass)} style={styles.addBtn}>
            <PlusCircle size={16} /> {showCreateClass ? "Cancel" : "Schedule Live Class"}
          </button>

          {showCreateClass && (
            <form onSubmit={handleCreateLiveClass} style={styles.createForm}>
              <InputField label="Class Title" value={newLiveClass.title} onChange={(e) => setNewLiveClass({ ...newLiveClass, title: e.target.value })} required />
              <InputField label="Course" value={newLiveClass.course} onChange={(e) => setNewLiveClass({ ...newLiveClass, course: e.target.value })} required />
              <div style={styles.dateTimeRow}>
                <InputField label="Date" type="date" value={newLiveClass.date} onChange={(e) => setNewLiveClass({ ...newLiveClass, date: e.target.value })} required />
                <InputField label="Time" type="time" value={newLiveClass.time} onChange={(e) => setNewLiveClass({ ...newLiveClass, time: e.target.value })} required />
              </div>
              <button type="submit" style={styles.submitBtn}>Schedule Class</button>
            </form>
          )}
        </SectionCard>

        {/* Recording Upload */}
        <SectionCard title="📤 Upload Pre‑recorded Video">
          <form onSubmit={handleUploadRecording}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Select Class</label>
              <select
                value={selectedClassForRecording}
                onChange={(e) => setSelectedClassForRecording(e.target.value)}
                style={styles.select}
                required
              >
                <option value="">-- Choose a class --</option>
                {liveClasses.map((cls) => (
                  <option key={cls.id} value={cls.id}>{cls.title} ({cls.date})</option>
                ))}
              </select>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Video File</label>
              <input
                type="file"
                accept="video/*"
                ref={fileInputRef}
                onChange={(e) => setRecordingFile(e.target.files[0])}
                style={styles.fileInput}
                required
              />
              {recordingFile && <span style={styles.fileName}>{recordingFile.name}</span>}
            </div>
            <button type="submit" style={styles.uploadBtn}>
              <Upload size={16} /> Upload Recording
            </button>
          </form>
        </SectionCard>
      </div>

      {/* Uploaded Lectures History */}
      <SectionCard title="📼 Uploaded Lectures History">
        {uploadHistory.length === 0 ? (
          <p style={styles.emptyHistory}>No recordings uploaded yet.</p>
        ) : (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th>Class Name</th>
                  <th>Course</th>
                  <th>Recording File</th>
                  <th>Upload Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {uploadHistory.map((entry) => (
                  <tr key={entry.id} style={styles.tableRow(false)}>
                    <td><strong>{entry.className}</strong></td>
                    <td>{entry.course}</td>
                    <td style={styles.fileCell}>
                      <FileVideo size={14} style={{ marginRight: "0.4rem" }} />
                      {entry.fileName}
                    </td>
                    <td>{entry.uploadDate}</td>
                    <td>
                      <button
                        onClick={() => handleDeleteHistory(entry.id)}
                        style={styles.iconBtn}
                        title="Delete from history"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>

      {/* Student Management */}
      <SectionCard
        title={
          <div style={styles.sectionTitleRow}>
            <span>👥 Student Access Controls</span>
            <button onClick={() => setShowAddStudent(!showAddStudent)} style={styles.addStudentBtn}>
              <UserPlus size={16} /> Add Student
            </button>
          </div>
        }
      >
        {showAddStudent && (
          <form onSubmit={handleAddStudent} style={styles.addStudentForm}>
            <InputField label="Full Name" value={newStudent.name} onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} required />
            <InputField label="Email" type="email" value={newStudent.email} onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })} required />
            <InputField label="Course" value={newStudent.course} onChange={(e) => setNewStudent({ ...newStudent, course: e.target.value })} required />
            <div style={styles.dateTimeRow}>
              <InputField label="Access Start" type="date" value={newStudent.startDate} onChange={(e) => setNewStudent({ ...newStudent, startDate: e.target.value })} required />
              <InputField label="Access End" type="date" value={newStudent.endDate} onChange={(e) => setNewStudent({ ...newStudent, endDate: e.target.value })} required />
            </div>
            <button type="submit" style={styles.createStudentBtn}>Create Student Account</button>
          </form>
        )}

        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th>Student</th>
                <th>Course</th>
                <th>Access Period</th>
                <th>Level</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((stu) => (
                <tr key={stu.id} style={styles.tableRow(stu.hold)}>
                  <td>
                    <strong>{stu.name}</strong>
                    <div style={styles.email}>{stu.email}</div>
                  </td>
                  <td>{stu.course}</td>
                  <td style={styles.accessDates}>
                    {stu.startDate ? (
                      <>
                        {stu.startDate} → {stu.endDate}
                        {new Date(stu.endDate) < new Date() && (
                          <span style={styles.expiredTag}>Expired</span>
                        )}
                      </>
                    ) : (
                      "Not set"
                    )}
                  </td>
                  <td>
                    <select
                      value={stu.access}
                      onChange={(e) => handleChangeAccess(stu.id, e.target.value)}
                      style={styles.accessSelect}
                    >
                      <option value="Full">Full</option>
                      <option value="Limited">Limited</option>
                      <option value="None">None</option>
                    </select>
                  </td>
                  <td>
                    {stu.hold ? (
                      <span style={styles.holdBadge}>On Hold</span>
                    ) : (
                      <span style={styles.activeBadge}>Active</span>
                    )}
                  </td>
                  <td>
                    <div style={styles.actionButtons}>
                      <button onClick={() => handleToggleHold(stu.id)} style={styles.iconBtn} title={stu.hold ? "Remove Hold" : "Put on Hold"}>
                        {stu.hold ? <PlayCircle size={16} /> : <PauseCircle size={16} />}
                      </button>
                      <button onClick={() => setDeleteStudentId(stu.id)} style={styles.iconBtn} title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {deleteStudentId && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <h3>Confirm Delete</h3>
              <p>This action cannot be undone. Are you sure?</p>
              <div style={styles.modalActions}>
                <button onClick={() => setDeleteStudentId(null)} style={styles.cancelBtn}>Cancel</button>
                <button onClick={() => handleDeleteStudent(deleteStudentId)} style={styles.deleteBtn}>Delete</button>
              </div>
            </div>
          </div>
        )}
      </SectionCard>

      {/* ─── NEW: Student Credential Modal ────────────── */}
      {credentialModal.show && (
        <div style={styles.modalOverlay}>
          <div style={styles.credentialModal}>
            <div style={styles.credentialModalHeader}>
              <div style={styles.credentialIconCircle}>
                <CheckCircle size={28} color="#fff" />
              </div>
              <h2 style={styles.credentialTitle}>🎉 Student Account Created!</h2>
              <p style={styles.credentialSubtitle}>
                Share these login details with <strong>{credentialModal.studentName}</strong>
              </p>
            </div>

            <div style={styles.credentialBody}>
              {/* Student Info Banner */}
              <div style={styles.studentInfoBanner}>
                <User size={18} color="#dc2626" />
                <span><strong>{credentialModal.studentName}</strong></span>
              </div>

              {/* Email Field */}
              <div style={styles.credentialField}>
                <label style={styles.credentialLabel}>
                  <Mail size={16} /> Student Email
                </label>
                <div style={styles.credentialInputRow}>
                  <input
                    type="text"
                    value={credentialModal.studentEmail}
                    readOnly
                    style={styles.credentialInput}
                  />
                  <button
                    onClick={() => copyToClipboard(credentialModal.studentEmail, "email")}
                    style={styles.copyBtn}
                    title="Copy Email"
                  >
                    {copiedField === "email" ? <Check size={16} color="#059669" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>

              {/* Password Field */}
              <div style={styles.credentialField}>
                <label style={styles.credentialLabel}>
                  <Key size={16} /> Student Password
                </label>
                <div style={styles.credentialInputRow}>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={credentialModal.studentPassword}
                    readOnly
                    style={styles.credentialInput}
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    style={styles.copyBtn}
                    title={showPassword ? "Hide Password" : "Show Password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <button
                    onClick={() => copyToClipboard(credentialModal.studentPassword, "password")}
                    style={styles.copyBtn}
                    title="Copy Password"
                  >
                    {copiedField === "password" ? <Check size={16} color="#059669" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>

              {/* Warning Note */}
              <div style={styles.warningNote}>
                <AlertTriangle size={16} color="#d97706" />
                <span>
                  <strong>Important:</strong> Copy and share these credentials now. For security, the password will not be displayed again in plain text.
                </span>
              </div>
            </div>

            <div style={styles.credentialModalFooter}>
              <button onClick={closeCredentialModal} style={styles.doneBtn}>
                <CheckCircle size={16} /> Done — I've Saved the Credentials
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Reusable Components ──────────────────────────
function SummaryCard({ icon, title, value }) {
  return (
    <div style={styles.summaryCard}>
      <div style={styles.summaryIcon}>{icon}</div>
      <div>
        <p style={styles.summaryTitle}>{title}</p>
        <p style={styles.summaryValue}>{value}</p>
      </div>
    </div>
  );
}

function SectionCard({ title, children }) {
  return (
    <div style={styles.sectionCard}>
      <h3 style={styles.sectionTitle}>{title}</h3>
      {children}
    </div>
  );
}

function InputField({ label, type = "text", value, onChange, placeholder, required }) {
  return (
    <div style={styles.inputGroup}>
      <label style={styles.label}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={styles.input}
      />
    </div>
  );
}

// ─── Inline Styles ──────────────────────────────
const styles = {
  loginContainer: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #fee2e2 0%, #fff5f5 100%)",
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
  loginHeader: { textAlign: "center", marginBottom: "1.5rem" },
  loginIcon: {
    width: "64px",
    height: "64px",
    background: "linear-gradient(135deg, #dc2626, #991b1b)",
    borderRadius: "16px",
    display: "grid",
    placeItems: "center",
    margin: "0 auto 1rem",
  },
  loginTitle: { fontWeight: 900, color: "#111827", margin: "0 0 0.5rem", fontSize: "1.8rem" },
  loginSubtitle: { color: "#6b7280", margin: 0 },
  demoCard: {
    background: "#fff5f5",
    border: "1px solid #fecaca",
    borderRadius: "16px",
    padding: "1rem",
    marginBottom: "1.5rem",
  },
  demoHeader: { display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" },
  demoText: { margin: "0.2rem 0", color: "#4b5563" },
  form: { display: "flex", flexDirection: "column", gap: "1rem" },
  inputGroup: { marginBottom: "0.8rem" },
  label: { display: "block", fontWeight: 700, marginBottom: "0.35rem", color: "#374151" },
  input: {
    width: "100%",
    padding: "0.9rem",
    borderRadius: "14px",
    border: "1px solid #e5e7eb",
    outline: "none",
    fontSize: "1rem",
    background: "#fff",
  },
  select: {
    width: "100%",
    padding: "0.9rem",
    borderRadius: "14px",
    border: "1px solid #e5e7eb",
    outline: "none",
    background: "#fff",
    fontSize: "1rem",
  },
  fileInput: {
    width: "100%",
    padding: "0.5rem",
  },
  fileName: { display: "block", marginTop: "0.3rem", color: "#059669", fontSize: "0.9rem" },
  error: { color: "#dc2626", margin: "0.5rem 0", fontWeight: 500 },
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
  },
  dashboard: {
    background: "#f9fafb",
    minHeight: "100vh",
    padding: "2rem 1.25rem",
    maxWidth: "1400px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    flexWrap: "wrap",
    gap: "1rem",
  },
  heading: { margin: 0, fontWeight: 900, color: "#111827", fontSize: "1.8rem" },
  logoutBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    background: "#fff",
    border: "1px solid #e5e7eb",
    padding: "0.6rem 1.2rem",
    borderRadius: "12px",
    fontWeight: 700,
    cursor: "pointer",
    color: "#dc2626",
  },
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "1rem",
    marginBottom: "2rem",
  },
  summaryCard: {
    background: "#fff",
    border: "1px solid #f3f4f6",
    borderRadius: "20px",
    padding: "1.5rem",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    boxShadow: "0 12px 24px rgba(0,0,0,0.03)",
  },
  summaryIcon: {
    color: "#dc2626",
    background: "#fee2e2",
    padding: "0.7rem",
    borderRadius: "14px",
  },
  summaryTitle: { margin: 0, color: "#6b7280", fontSize: "0.9rem" },
  summaryValue: { margin: 0, fontWeight: 800, fontSize: "1.5rem", color: "#111827" },
  sectionRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
    gap: "1.5rem",
    marginBottom: "2rem",
  },
  sectionCard: {
    background: "#fff",
    border: "1px solid #f3f4f6",
    borderRadius: "24px",
    padding: "1.5rem",
    boxShadow: "0 20px 35px rgba(0,0,0,0.04)",
    marginBottom: "1.5rem",
  },
  sectionTitle: { margin: "0 0 1.2rem", fontWeight: 800, color: "#111827", fontSize: "1.2rem" },
  classList: { display: "flex", flexDirection: "column", gap: "0.8rem" },
  classItem: {
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "14px",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "0.8rem",
  },
  classInfo: { display: "flex", flexDirection: "column", gap: "0.3rem" },
  classCourse: { color: "#6b7280", fontSize: "0.9rem" },
  classDateTime: { display: "flex", alignItems: "center", gap: "0.5rem", color: "#4b5563", fontSize: "0.85rem" },
  classActions: { display: "flex", alignItems: "center", gap: "0.8rem", flexWrap: "wrap" },
  statusBadge: (status) => ({
    padding: "0.25rem 0.75rem",
    borderRadius: "8px",
    fontWeight: 700,
    fontSize: "0.8rem",
    background: status === "live" ? "#fee2e2" : status === "scheduled" ? "#dbeafe" : "#f3f4f6",
    color: status === "live" ? "#dc2626" : status === "scheduled" ? "#1e40af" : "#4b5563",
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
  }),
  startBtn: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "0.4rem 0.8rem",
    borderRadius: "8px",
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
  },
  endBtn: {
    background: "#4b5563",
    color: "#fff",
    border: "none",
    padding: "0.4rem 0.8rem",
    borderRadius: "8px",
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
  },
  recordingBadge: {
    background: "#d1fae5",
    color: "#065f46",
    padding: "0.25rem 0.75rem",
    borderRadius: "8px",
    fontWeight: 700,
    fontSize: "0.8rem",
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
  },
  addBtn: {
    marginTop: "1rem",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "0.7rem 1.2rem",
    borderRadius: "12px",
    fontWeight: 700,
    cursor: "pointer",
  },
  createForm: {
    background: "#f9fafb",
    padding: "1rem",
    borderRadius: "14px",
    marginTop: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
  },
  dateTimeRow: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
  },
  submitBtn: {
    background: "linear-gradient(135deg, #dc2626, #991b1b)",
    color: "#fff",
    border: "none",
    padding: "0.9rem",
    borderRadius: "14px",
    fontWeight: 800,
    cursor: "pointer",
  },
  uploadBtn: {
    width: "100%",
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "0.9rem",
    borderRadius: "14px",
    fontWeight: 800,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    marginTop: "0.5rem",
  },
  sectionTitleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  addStudentBtn: {
    background: "transparent",
    border: "none",
    color: "#dc2626",
    cursor: "pointer",
    fontWeight: 700,
    display: "inline-flex",
    alignItems: "center",
    gap: "0.3rem",
  },
  addStudentForm: {
    background: "#f9fafb",
    padding: "1rem",
    borderRadius: "14px",
    marginBottom: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
  },
  createStudentBtn: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "0.7rem 1.2rem",
    borderRadius: "12px",
    fontWeight: 700,
    cursor: "pointer",
  },
  tableContainer: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" },
  tableHeader: { borderBottom: "1px solid #e5e7eb", color: "#6b7280", fontWeight: 700 },
  tableRow: (hold) => ({
    borderBottom: "1px solid #f3f4f6",
    background: hold ? "#fef2f2" : "transparent",
  }),
  email: { fontSize: "0.8rem", color: "#6b7280" },
  accessDates: { fontSize: "0.85rem", color: "#4b5563" },
  expiredTag: {
    background: "#fee2e2",
    color: "#dc2626",
    padding: "0.15rem 0.5rem",
    borderRadius: "6px",
    fontWeight: 700,
    fontSize: "0.7rem",
    marginLeft: "0.5rem",
  },
  accessSelect: {
    padding: "0.3rem 0.5rem",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontWeight: 700,
    fontSize: "0.8rem",
    background: "#fff",
  },
  holdBadge: { color: "#dc2626", fontWeight: 700, fontSize: "0.8rem" },
  activeBadge: { color: "#166534", fontWeight: 700, fontSize: "0.8rem" },
  actionButtons: { display: "flex", gap: "0.4rem", justifyContent: "center" },
  iconBtn: {
    background: "transparent",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    padding: "0.3rem",
    cursor: "pointer",
    color: "#dc2626",
  },
  fileCell: {
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
  },
  emptyHistory: {
    color: "#6b7280",
    fontStyle: "italic",
    padding: "1rem 0",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    borderRadius: "20px",
    padding: "2rem",
    maxWidth: "400px",
    width: "90%",
    boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
  },
  modalActions: { display: "flex", gap: "1rem", justifyContent: "flex-end", marginTop: "1rem" },
  cancelBtn: {
    background: "#f3f4f6",
    border: "none",
    padding: "0.6rem 1.2rem",
    borderRadius: "12px",
    fontWeight: 700,
    cursor: "pointer",
  },
  deleteBtn: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "0.6rem 1.2rem",
    borderRadius: "12px",
    fontWeight: 700,
    cursor: "pointer",
  },

  // ─── NEW: Credential Modal Styles ──────────────
  credentialModal: {
    background: "#fff",
    borderRadius: "24px",
    padding: "2rem",
    maxWidth: "520px",
    width: "92%",
    boxShadow: "0 30px 60px rgba(0,0,0,0.2)",
    border: "1px solid #fecaca",
  },
  credentialModalHeader: {
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  credentialIconCircle: {
    width: "56px",
    height: "56px",
    background: "linear-gradient(135deg, #059669, #047857)",
    borderRadius: "50%",
    display: "grid",
    placeItems: "center",
    margin: "0 auto 0.75rem",
  },
  credentialTitle: {
    margin: "0 0 0.5rem",
    fontWeight: 900,
    color: "#111827",
    fontSize: "1.3rem",
  },
  credentialSubtitle: {
    margin: 0,
    color: "#6b7280",
    fontSize: "0.95rem",
  },
  credentialBody: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  studentInfoBanner: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    background: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: "12px",
    padding: "0.75rem 1rem",
    color: "#991b1b",
    fontSize: "0.95rem",
  },
  credentialField: {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
  },
  credentialLabel: {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    fontWeight: 700,
    color: "#374151",
    fontSize: "0.85rem",
  },
  credentialInputRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
  },
  credentialInput: {
    flex: 1,
    padding: "0.8rem 1rem",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    background: "#f9fafb",
    fontSize: "0.95rem",
    fontFamily: "monospace",
    color: "#111827",
    outline: "none",
    cursor: "default",
  },
  copyBtn: {
    background: "#fff",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    padding: "0.55rem",
    cursor: "pointer",
    color: "#6b7280",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.15s ease",
    minWidth: "40px",
    minHeight: "40px",
  },
  warningNote: {
    display: "flex",
    alignItems: "flex-start",
    gap: "0.6rem",
    background: "#fffbeb",
    border: "1px solid #fde68a",
    borderRadius: "12px",
    padding: "0.75rem 1rem",
    color: "#92400e",
    fontSize: "0.85rem",
    lineHeight: "1.5",
  },
  credentialModalFooter: {
    marginTop: "1.5rem",
    display: "flex",
    justifyContent: "center",
  },
  doneBtn: {
    width: "100%",
    background: "linear-gradient(135deg, #dc2626, #991b1b)",
    color: "#fff",
    border: "none",
    padding: "0.9rem 1.5rem",
    borderRadius: "14px",
    fontWeight: 800,
    fontSize: "1rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
  },
};