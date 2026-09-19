import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./DashboardLayout.css";

export default function DashboardLayout({ title, links, children }) {
  const { currentUser, logout } = useAuth();

  return (
    <div className="dash">
      <aside className="dash__sidebar">
        <div>
          <p className="dash__eyebrow">{title}</p>
          <p className="dash__user">{currentUser?.name}</p>
          <nav className="dash__nav">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  isActive ? "dash__link dash__link--active" : "dash__link"
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <button className="dash__logout" onClick={logout}>
          Log out
        </button>
      </aside>
      <div className="dash__content">{children}</div>
    </div>
  );
}
