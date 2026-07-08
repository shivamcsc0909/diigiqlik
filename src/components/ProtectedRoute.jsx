import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ role, children }) {
  const { studentUser, masterUser } = useAuth();

  if (role === "student") {
    if (!studentUser) return <Navigate to="/student-corner/login" replace />;
    return children;
  }

  if (role === "master") {
    if (!masterUser) return <Navigate to="/master-panel/login" replace />;
    return children;
  }

  return <Navigate to="/" replace />;
}