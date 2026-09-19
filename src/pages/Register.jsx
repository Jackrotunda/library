import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

export default function Register() {
  const { register, error } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", username: "", password: "" });
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const ok = register(form);
    if (ok) setSuccess(true);
  }

  return (
    <div className="login">
      <div className="container login__inner">
        <div className="login__card">
          <p className="login__eyebrow">Student registration</p>
          <h1>Create an account</h1>

          {success ? (
            <>
              <p className="login__success">
                Registration successful. Your student account is ready.
              </p>
              <p className="login__switch">
                <Link to="/login">Go to login →</Link>
              </p>
            </>
          ) : (
            <>
              <p className="login__sub">
                Student accounts can search the catalog and borrow books.
                Staff accounts are set up separately by the library.
              </p>
              <form onSubmit={handleSubmit} className="login__form">
                <label>
                  Full name
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Choose a username
                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Choose a password
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </label>
                {error && <p className="login__error">{error}</p>}
                <button type="submit">Create account</button>
              </form>
              <p className="login__switch">
                Already registered? <Link to="/login">Sign in</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
