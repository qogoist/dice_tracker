import React from "react";
import { Routes, Route } from "react-router-dom";

import { SessionProvider } from "../contexts/SessionContext";
import { SettingsProvider } from "../contexts/SettingsContext";
import Dashboard from "./Dashboard";
import NewSession from "./NewSession";
import Stats from "./Stats";
import Settings from "./Settings";
import OngoingSession from "./OngoingSession";
import SessionPage from "./SessionPage";

const MainContent: React.FC = () => {
  return (
    <SettingsProvider>
      <SessionProvider>
        <div className="main">
          <Routes>
            <Route path="/*" element={<Dashboard />} />
            <Route path="/new-session" element={<NewSession />} />
            <Route path="/edit-session" element={<NewSession />} />
            <Route path="/sessions/">
              <Route path=":sessionId" element={<SessionPage />} />
            </Route>
            <Route path="/stats" element={<Stats />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/ongoing-session" element={<OngoingSession />} />
            <Route path="/continue-session" element={<OngoingSession />} />
          </Routes>
        </div>
      </SessionProvider>
    </SettingsProvider>
  );
};

export default MainContent;
