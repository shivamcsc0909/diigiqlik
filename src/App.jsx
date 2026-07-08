import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CursorFluid from "./components/CursorFluid";
import ScheduleMeetingModal from "./components/ScheduleMeetingModal";
import Chatbot from "./components/Chatbot";
import AppRoutes from "./routes/AppRoutes";   // ✅ import the centralised routes

function App() {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const handleCloseScheduleModal = () => {
    setIsScheduleModalOpen(false);
  };

  return (
    <Router>
      <AuthProvider>
        <Chatbot />
        <div className="app-wrapper">
          <ScheduleMeetingModal
            isOpen={isScheduleModalOpen}
            onClose={handleCloseScheduleModal}
          />

          <CursorFluid />
          <Header onBookCall={() => setIsScheduleModalOpen(true)} />

          {/* ✅ All routes live inside AppRoutes – pass the modal opener */}
          <AppRoutes onBookCall={() => setIsScheduleModalOpen(true)} />

          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;