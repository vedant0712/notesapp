import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      <div>
        <Link to="/"><img className="logo-img" src={require("../images/Notey.png")} alt="Notey logo" /></Link>
      </div>
      <ul>
        {user ? (
          <button className="btn" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
