import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { SessionProvider } from "../contexts/SessionContext";
import Dashboard from "./Dashboard";
import NewSession from "./NewSession";
import Stats from "./Stats";
import Settings from "./Settings";
import OngoingSession from "./OngoingSession";

const MainContent: React.FC = () => {
  return (
    <SessionProvider>
      <div className="main">
        <Routes>
          <Route path="/*" element={<Dashboard />} />
          <Route path="/new-session" element={<NewSession />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/ongoing-session" element={<OngoingSession />} />
        </Routes>
      </div>
    </SessionProvider>
  );
};

export default MainContent;
