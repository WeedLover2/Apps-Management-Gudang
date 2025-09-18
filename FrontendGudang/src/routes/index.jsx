import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../Modal/Login";
import NotFound from "../pages/NotFound";
import Navbar from "../Components/Navbar";
import AddProduct from "../Modal/AddProduct";
import CreateUser from "../Modal/CreateUser";
import EditProduct from "../Modal/EditProduct";

function LoginRoute() {
  const navigate = useNavigate();
  return <Login isOpen={true} onClose={() => navigate("/")} />;
}

function AddProductRoute() {
  const navigate = useNavigate();
  return <AddProduct isOpen={true} onClose={() => navigate("/")} />;
}

function CreateUserRoute() {
  const navigate = useNavigate();
  return <CreateUser isOpen={true} onClose={() => navigate("/")} />;
}

function EditProductRoute() {
  const navigate = useNavigate();
  return <EditProduct isOpen={true} onClose={() => navigate("/")} />;
}

function SwaggerDocs() {
  return (
    <iframe
      src="http://localhost:4000/api-docs"
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
        <Route path="/add-product" element={<Home />} />
        <Route path="/create-user" element={<Home />} />
        <Route path="/edit-product/:id" element={<Home />} />
        <Route path="/tianicikiwir" element={<SwaggerDocs />} />
      </Routes>

      {/* Modal Login */}
      {location.pathname === "/login" && (
        <LoginRoute />
      )}

      {/* Modal Add Product */}
      {location.pathname === "/add-product" && (
        <AddProductRoute />
      )}

      {/* Modal Create User */}
      {location.pathname === "/create-user" && (
        <CreateUserRoute />
      )}

      {/* Modal Edit Product */}
      {location.pathname.startsWith("/edit-product/") && (
        <EditProductRoute />
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