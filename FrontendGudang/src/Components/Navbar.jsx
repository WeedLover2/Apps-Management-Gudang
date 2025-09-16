import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Login from "./Login";

const Logo = () => (
  <Link to="/">
    <div className="hover:cursor-pointer">
      <img src="logo.png" alt="Logo" className="h-10 w-auto" />
    </div>
  </Link>
);

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const renderUserBox = () => {
    if (user) {
      return (
        <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 font-semibold hover:cursor-pointer" onClick={logout}>
          {user.name}
        </button>
      );
    }
    return <div className="px-4 py-2 text-gray-400">Guest</div>;
  };

  const renderRightButtons = () => {
    if (!user) {
      return (
        <Link to="/login">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 hover:cursor-pointer transition-colors">
            Login
          </button>
        </Link>
      );
    }
    if (user.role === "user") {
      return (
        <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
          Tambah Produk
        </button>
      );
    }
    if (user.role === "admin") {
      return (
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
            Tambah Produk
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
            Tambah Akun
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    <nav className="w-full flex items-center justify-between px-6 py-3 bg-white shadow">
      <div className="flex-1 flex justify-start">{renderUserBox()}</div>
      <div className="flex-1 flex justify-center"><Logo /></div>
      <div className="flex-1 flex justify-end">{renderRightButtons()}</div>
    </nav>
  );
};

export default Navbar;