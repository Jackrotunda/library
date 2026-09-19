import { Link } from "react-router-dom";
import { useLibrary } from "../../context/LibraryContext";
import { useAuth } from "../../context/AuthContext";
import StatusStamp from "../../components/StatusStamp";
import "./RecordsTable.css";

export default function MyBooks() {
  const { records, books, returnBook } = useLibrary();
  const { currentUser } = useAuth();

  const myLoans = records
    .filter((r) => r.username === currentUser.username && r.status === "borrowed")
    .map((r) => ({ ...r, book: books.find((b) => b.id === r.bookId) }))
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  const todayStr = new Date().toISOString().slice(0, 10);

  return (
    <div className="records-page">
      <p className="records-page__eyebrow">Your account</p>
      <h1>My borrowed books</h1>
      <p className="records-page__sub">
        {myLoans.length} {myLoans.length === 1 ? "book" : "books"} out right
        now.
      </p>

      {myLoans.length === 0 ? (
        <div className="records-page__empty">
          <p>Nothing checked out.</p>
          <Link to="/student">Browse the catalog →</Link>
        </div>
      ) : (
        <table className="records-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Borrowed</th>
              <th>Due date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {myLoans.map((r) => {
              const overdue = r.dueDate < todayStr;
              return (
                <tr key={r.id}>
                  <td>
                    <Link to={`/student/book/${r.bookId}`}>
                      {r.book?.title ?? "Untitled"}
                    </Link>
                  </td>
                  <td>{r.borrowDate}</td>
                  <td>{r.dueDate}</td>
                  <td>
                    <StatusStamp tone={overdue ? "out" : "warn"}>
                      {overdue ? "Overdue" : "Due soon"}
                    </StatusStamp>
                  </td>
                  <td>
                    <button
                      className="records-table__action"
                      onClick={() => returnBook(r.id)}
                    >
                      Return
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
