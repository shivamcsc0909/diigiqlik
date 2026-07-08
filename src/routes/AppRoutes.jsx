import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import ServicesPage from "../pages/ServicesPage";
import PortfolioPage from "../pages/PortfolioPage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import CoursesPage from "../pages/CoursesPage";
import StudentCorner from "../pages/StudentCorner";
import MasterPanel from "../pages/MasterPanel";
import LoginCallback from "../pages/LoginCallback";
// ProtectedRoute is no longer needed for these panels – keep it only if you use it elsewhere
// import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes({ onBookCall }) {
  return (
    <Routes>
      <Route path="/" element={<Home onBookCall={onBookCall} />} />
      <Route path="/auth/callback" element={<LoginCallback />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/portfolio" element={<PortfolioPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* Panels handle their own login flow – no external guard */}
      <Route path="/student-corner/*" element={<StudentCorner />} />
      <Route path="/master-panel/*" element={<MasterPanel />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}