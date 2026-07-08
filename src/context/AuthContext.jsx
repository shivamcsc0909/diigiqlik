// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";

export const RAZORPAY_KEY_ID = "rzp_test_TB0lRMCdVDdoz3";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // ─── Student state ──────────────────
  const [studentUser, setStudentUser] = useState(null);

  const loginStudent = (email, password) => {
    if (email === "student@demo.com" && password === "student123") {
      setStudentUser({ email, name: "Anjali Verma" });
      return true;
    }
    return false;
  };

  const logoutStudent = () => setStudentUser(null);

  // ─── Master (admin) state ──────────
  const [masterUser, setMasterUser] = useState(null);

  const loginMaster = (email, password) => {
    // ✅ UPDATED to match the master panel's UI
    if (email === "master@demo.com" && password === "master123") {
      setMasterUser({ email, name: "Admin" });
      return true;
    }
    return false;
  };

  const logoutMaster = () => setMasterUser(null);

  const value = {
    studentUser,
    loginStudent,
    logoutStudent,
    masterUser,
    loginMaster,
    logoutMaster,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}