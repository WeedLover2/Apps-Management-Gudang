import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../Components/Login";
import NotFound from "../pages/NotFound";
import Navbar from "../Components/Navbar";

// Komponen khusus agar modal login bisa close dengan navigate
function LoginRoute() {
  const navigate = useNavigate();
  return <Login isOpen={true} onClose={() => navigate("/")} />;
}

const AppRoutes = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginRoute />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default AppRoutes;