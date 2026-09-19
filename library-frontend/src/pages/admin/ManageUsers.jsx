import { useAuth } from "../../context/AuthContext";
import { useLibrary } from "../../context/LibraryContext";
import "../student/RecordsTable.css";

export default function ManageUsers() {
  const { students } = useAuth();
  const { records } = useLibrary();

  return (
    <div>
      <p className="records-page__eyebrow">Accounts</p>
      <h1>Manage users</h1>
      <p className="records-page__sub">
        {students.length} registered student{students.length === 1 ? "" : "s"}.
      </p>

      {students.length === 0 ? (
        <div className="records-page__empty">
          <p>No student accounts yet.</p>
        </div>
      ) : (
        <table className="records-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Active loans</th>
              <th>Total borrowed</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => {
              const theirRecords = records.filter(
                (r) => r.username === s.username
              );
              const active = theirRecords.filter(
                (r) => r.status === "borrowed"
              ).length;
              return (
                <tr key={s.username}>
                  <td>{s.name}</td>
                  <td>{s.username}</td>
                  <td>{s.email}</td>
                  <td>{active}</td>
                  <td>{theirRecords.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
