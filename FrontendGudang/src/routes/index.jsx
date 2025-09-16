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

function SwaggerDocs() {
  return (
    <iframe
      src="http://localhost:5000/api-docs"
      title="Swagger API Docs"
      style={{ width: "100%", height: "100vh", border: "none" }}
    />
  );
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
        <Route path="/tianicikiwir" element={<SwaggerDocs />} />
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