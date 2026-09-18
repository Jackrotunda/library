import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
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
          <NavLink to="/" end className={navClass}>
            Catalog
          </NavLink>
          <NavLink to="/my-books" className={navClass}>
            My Books
          </NavLink>
          <NavLink to="/login" className={navClass}>
            Sign in
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

function navClass({ isActive }) {
  return isActive ? "navbar__link navbar__link--active" : "navbar__link";
}
