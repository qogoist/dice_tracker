import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Chart } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";

import { AuthProvider } from "./contexts/AuthContext";
import { ColorProvider } from "./contexts/ColorContext";

import "./css/App.css";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PasswordReset from "./pages/PasswordReset";
import MainApp from "./pages/MainApp";
import PrivateRoute from "./components/PrivateRoute";

Chart.register(zoomPlugin);

const App: React.FC = () => {
  return (
    <Router>
      <ColorProvider>
        <AuthProvider>
          <Routes>
            <Route path="/*" element={
              <PrivateRoute>
                <MainApp />
              </PrivateRoute>
            } />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/password-reset" element={<PasswordReset />} />
          </Routes>
        </AuthProvider>
      </ColorProvider>
    </Router>
  );
};

export default App;
