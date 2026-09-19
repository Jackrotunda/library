import { createContext, useContext, useState } from "react";

// Mock auth — no backend yet. Users live in memory only and reset on
// page refresh. One seeded admin account; students are created via
// the Register flow and seeded with a demo account below.
const AuthContext = createContext(null);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const seedUsers = [
  {
    username: "admin",
    password: "admin123",
    role: "admin",
    name: "Head Librarian",
    email: "librarian@rosemont.edu",
  },
  {
    username: "student1",
    password: "pass123",
    role: "student",
    name: "Ana Cruz",
    email: "ana.cruz@students.rosemont.edu",
  },
];

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(seedUsers);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState("");

  function login(username, password, expectedRole) {
    const found = users.find(
      (u) => u.username === username && u.password === password
    );
    if (!found) {
      setError("Account not found, or username/password is incorrect.");
      return null;
    }
    if (expectedRole && found.role !== expectedRole) {
      setError(
        expectedRole === "admin"
          ? "That account isn't an admin account. Use the student tab instead."
          : "That account isn't a student account. Use the admin tab instead."
      );
      return null;
    }
    setError("");
    setCurrentUser(found);
    return found;
  }

  function register({ username, password, name, email }) {
    if (!EMAIL_PATTERN.test(email || "")) {
      setError("Enter a valid email address (e.g. name@example.com).");
      return false;
    }
    if (users.some((u) => u.username === username)) {
      setError("That username is already taken.");
      return false;
    }
    if (users.some((u) => u.email === email)) {
      setError("An account with that email already exists.");
      return false;
    }
    setUsers((prev) => [
      ...prev,
      { username, password, role: "student", name, email },
    ]);
    setError("");
    return true;
  }

  function logout() {
    setCurrentUser(null);
  }

  const students = users.filter((u) => u.role === "student");

  return (
    <AuthContext.Provider
      value={{ currentUser, login, register, logout, students, error, setError }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
