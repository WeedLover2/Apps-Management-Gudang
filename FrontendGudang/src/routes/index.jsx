import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../Components/Login";
import NotFound from "../pages/NotFound";
import Navbar from "../Components/Navbar";

function LoginRoute() {
  const navigate = useNavigate();
  return <Login isOpen={true} onClose={() => navigate("/")} />;
}

const AppRoutes = () => {
  const location = useLocation();
  const state = location.state;
  const backgroundLocation = state && state.backgroundLocation;

  return (
    <>
      <Navbar />
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Modal Login */}
      {location.pathname === "/login" && (
        <LoginRoute />
      )}
    </>
  );
};

const RouterWrapper = () => (
  <Router>
    <AppRoutes />
  </Router>
);

export default RouterWrapper;