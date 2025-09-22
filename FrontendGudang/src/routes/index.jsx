import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, useParams, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../Modal/Login";
import NotFound from "../pages/NotFound";
import Navbar from "../Components/Navbar";
import AddProduct from "../Modal/AddProduct";
import CreateUser from "../Modal/CreateUser";
import EditProduct from "../Modal/EditProduct";
import { AuthContext } from "../context/AuthContext";

function LoginRoute() {
  const navigate = useNavigate();

  return (
    <>
      <Home />
      <Login 
        isOpen={true} 
        onClose={() => navigate("/")} 
      />
    </>
  )
}

function AddProductRoute() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/" replace />;

  return (
    <>
      <Home />
      <AddProduct 
        isOpen={true} 
        onClose={() => navigate("/")} 
      />
    </>
  )
}

function CreateUserRoute() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  if (!user || user.role !== 'admin') return <Navigate to="/" replace />;

  return (
    <>
      <Home/>
      <CreateUser 
        isOpen={true}
        onClose={() => navigate("/")}
      />
    </>
  )
}

function EditProductRoute() {
  const navigate = useNavigate();
  const { id } = useParams(); // Extract productId from URL
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/" replace />;
  console.log('Product ID from URL:', id);
  
  return (
    <>
      <Home />
      <EditProduct 
        isOpen={true} 
        onClose={() => navigate("/")} 
        productId={id} // Oper productId ke modal
      />
    </>
  );
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
        <Route path="/login" element={<LoginRoute />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/add-product" element={<AddProductRoute />} />
        <Route path="/create-user" element={<CreateUserRoute />} />
        <Route path="/edit-product/:id" element={<EditProductRoute />} />
        <Route path="/api-docs" element={<SwaggerDocs />} />
      </Routes>
    </>
  );
};

const RouterWrapper = () => (
  <Router>
    <AppRoutes />
  </Router>
);

export default RouterWrapper;