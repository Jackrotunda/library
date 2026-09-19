import { Link } from "react-router-dom";
import { useLibrary } from "../../context/LibraryContext";
import { useAuth } from "../../context/AuthContext";
import StatusStamp from "../../components/StatusStamp";
import "./RecordsTable.css";

export default function History() {
  const { records, books } = useLibrary();
  const { currentUser } = useAuth();

  const history = records
    .filter((r) => r.username === currentUser.username)
    .map((r) => ({ ...r, book: books.find((b) => b.id === r.bookId) }))
    .sort((a, b) => b.borrowDate.localeCompare(a.borrowDate));

  return (
    <div className="records-page">
      <p className="records-page__eyebrow">Your account</p>
      <h1>Borrowing history</h1>
      <p className="records-page__sub">
        Every loan on your account, returned and current.
      </p>

      {history.length === 0 ? (
        <div className="records-page__empty">
          <p>No borrowing history yet.</p>
          <Link to="/student">Browse the catalog →</Link>
        </div>
      ) : (
        <table className="records-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Borrowed</th>
              <th>Due date</th>
              <th>Returned</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((r) => (
              <tr key={r.id}>
                <td>
                  <Link to={`/student/book/${r.bookId}`}>
                    {r.book?.title ?? "Untitled"}
                  </Link>
                </td>
                <td>{r.borrowDate}</td>
                <td>{r.dueDate}</td>
                <td>{r.returnDate ?? "—"}</td>
                <td>
                  <StatusStamp tone={r.status === "returned" ? "available" : "out"}>
                    {r.status === "returned" ? "Returned" : "Still out"}
                  </StatusStamp>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
