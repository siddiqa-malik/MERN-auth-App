import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import './Navbar.css';
function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // ← location hook

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // check token on mount AND on route change
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]); // ← dependency array

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false); 
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h1>MERN Auth App</h1>
      <div className="nav-links">
        {!isLoggedIn && (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
        {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
      </div>
    </nav>
  );
}

export default Navbar;
