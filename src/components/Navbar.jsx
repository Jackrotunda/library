import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <NavLink to="/" className="navbar__brand">
          <span className="navbar__mark">Ⓛ</span>
          <span>
            Cebu Commons
            <small>Public Library</small>
          </span>
        </NavLink>
        <nav className="navbar__links">
          {currentUser ? (
            <>
              <NavLink
                to={currentUser.role === "admin" ? "/admin" : "/student"}
                className={navClass}
              >
                Dashboard
              </NavLink>
              <button className="navbar__link navbar__link--btn" onClick={handleLogout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navClass}>
                Sign in
              </NavLink>
              <NavLink to="/register" className={navClass}>
                Register
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

function navClass({ isActive }) {
  return isActive ? "navbar__link navbar__link--active" : "navbar__link";
}
