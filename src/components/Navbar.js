import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg glass-navbar shadow-sm px-4 py-2 sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fs-4 text-light" to="/">iNotebook</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link text-light ${location.pathname === "/home" ? "active fw-bold" : ""}`}
                to="/home"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link text-light ${location.pathname === "/about" ? "active fw-bold" : ""}`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>

          <div className="d-flex">
            {localStorage.getItem('token') ? (
              <button onClick={handleLogout} className="btn btn-outline-warning mx-1" role="button">
                Logout
              </button>
            ) : (
              <>
                <Link className="btn btn-outline-light mx-1" to="/login" role="button">Login</Link>
                <Link className="btn btn-outline-light mx-1" to="/signup" role="button">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
