import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import SignIn from "./components/Signin";
import SafeMindLayout from "./components/SafeMindLayout";

import ChatInterface from "./components/ChatInterface";
import MoodTracker from "./components/MoodTracker";
import MusicPlaylist from "./components/MusicPlaylist";
import EmergencyContacts from "./components/EmergencyContacts";
import Settings from "./components/Settings";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={<Login onLogin={() => setIsLoggedIn(true)} />}
      />
      <Route path="/signin" element={<SignIn />} />

      {/* Protected Dashboard routes */}
      <Route
        path="/dashboard/*"
        element={
          isLoggedIn ? (
            <DashboardLayout />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

// Dashboard layout using SafeMindLayout
function DashboardLayout() {
  const [activeSection, setActiveSection] = useState("chat");

  const renderSection = () => {
    switch (activeSection) {
      case "chat":
        return <ChatInterface />;
      case "mood":
        return <MoodTracker />;
      case "music":
        return <MusicPlaylist />;
      case "emergency":
        return <EmergencyContacts />;
      case "settings":
        return <Settings />;
      default:
        return <ChatInterface />;
    }
  };

  return (
    <SafeMindLayout
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      {renderSection()}
    </SafeMindLayout>
  );
}

export default App;
