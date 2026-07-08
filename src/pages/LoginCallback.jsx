import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginCallback() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const saved = localStorage.getItem("digiklik_pending_login");
    if (saved) {
      login(JSON.parse(saved));
      localStorage.removeItem("digiklik_pending_login");
      navigate("/student-corner", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [login, navigate]);

  return <div style={{ padding: 24 }}>Signing in...</div>;
}