import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

export default function Login() {
  const { login, error } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const user = login(username.trim(), password);
    if (user) {
      navigate(user.role === "admin" ? "/admin" : "/student");
    }
  }

  return (
    <div className="login">
      <div className="container login__inner">
        <div className="login__card">
          <p className="login__eyebrow">Library account</p>
          <h1>Sign in</h1>
          <p className="login__sub">
            Admin and student accounts share this sign-in. You'll land on
            the right dashboard automatically.
          </p>

          <form onSubmit={handleSubmit} className="login__form">
            <label>
              Username
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            {error && <p className="login__error">{error}</p>}
            <button type="submit">Sign in</button>
          </form>

          <p className="login__hint">
            Demo accounts — admin / admin123, or student1 / pass123
          </p>
          <p className="login__switch">
            New here? <Link to="/register">Create a student account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
