import { Outlet } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";

const links = [
  { to: "/student", label: "Search / view books", end: true },
  { to: "/student/my-books", label: "My borrowed books" },
  { to: "/student/history", label: "Borrowing history" },
];

export default function StudentDashboard() {
  return (
    <DashboardLayout title="Student dashboard" links={links}>
      <Outlet />
    </DashboardLayout>
  );
}
