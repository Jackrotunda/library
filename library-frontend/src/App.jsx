import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { LibraryProvider } from "./context/LibraryContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageBooks from "./pages/admin/ManageBooks";
import ManageUsers from "./pages/admin/ManageUsers";
import BorrowRecords from "./pages/admin/BorrowRecords";
import Reports from "./pages/admin/Reports";

import StudentDashboard from "./pages/student/StudentDashboard";
import BrowseBooks from "./pages/student/BrowseBooks";
import StudentBookDetail from "./pages/student/StudentBookDetail";
import MyBooks from "./pages/student/MyBooks";
import History from "./pages/student/History";

function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

function Landing() {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" replace />;
  return (
    <Navigate to={currentUser.role === "admin" ? "/admin" : "/student"} replace />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LibraryProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<ManageBooks />} />
              <Route path="users" element={<ManageUsers />} />
              <Route path="records" element={<BorrowRecords />} />
              <Route path="reports" element={<Reports />} />
            </Route>

            <Route
              path="/student"
              element={
                <ProtectedRoute role="student">
                  <StudentDashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<BrowseBooks />} />
              <Route path="book/:id" element={<StudentBookDetail />} />
              <Route path="my-books" element={<MyBooks />} />
              <Route path="history" element={<History />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </LibraryProvider>
    </AuthProvider>
  );
}
