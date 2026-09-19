import { createContext, useContext, useState } from "react";

// Mock auth — no backend yet. Users live in memory only and reset on
// page refresh. One seeded admin account; students are created via
// the Register flow and seeded with a couple of demo accounts below.
const AuthContext = createContext(null);

const seedUsers = [
  { username: "admin", password: "admin123", role: "admin", name: "Head Librarian" },
  { username: "student1", password: "pass123", role: "student", name: "Ana Cruz" },
];

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(seedUsers);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState("");

  function login(username, password) {
    const found = users.find(
      (u) => u.username === username && u.password === password
    );
    if (!found) {
      setError("Account not found, or username/password is incorrect.");
      return null;
    }
    setError("");
    setCurrentUser(found);
    return found;
  }

  function register({ username, password, name }) {
    if (users.some((u) => u.username === username)) {
      setError("That username is already taken.");
      return false;
    }
    setUsers((prev) => [
      ...prev,
      { username, password, role: "student", name },
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
