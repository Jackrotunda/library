import { useState } from "react";
import "./Login.css";

export default function Login() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="login">
      <div className="container login__inner">
        <div className="login__card">
          <p className="login__eyebrow">Library card</p>
          <h1>Sign in</h1>
          <p className="login__sub">
            Use your library card number and PIN. This form is a UI mock —
            it's not wired to an account system yet.
          </p>

          {submitted ? (
            <p className="login__success">
              This is where a signed-in view would appear once the backend
              is connected.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="login__form">
              <label>
                Card number
                <input type="text" placeholder="0000 0000 0000" required />
              </label>
              <label>
                PIN
                <input type="password" placeholder="••••" required />
              </label>
              <button type="submit">Sign in</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
