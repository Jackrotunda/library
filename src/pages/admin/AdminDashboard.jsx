import { Outlet } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";

const links = [
  { to: "/admin", label: "Manage books", end: true },
  { to: "/admin/users", label: "Manage users" },
  { to: "/admin/records", label: "Borrow / return records" },
  { to: "/admin/reports", label: "Reports" },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout title="Admin dashboard" links={links}>
      <Outlet />
    </DashboardLayout>
  );
}
