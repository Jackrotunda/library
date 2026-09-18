import { Link } from "react-router-dom";
import { books } from "../data/books";
import StatusStamp from "../components/StatusStamp";
import "./MyBooks.css";

// Mock: treat the checked-out titles in the catalog as "my" current loans,
// since there's no backend/auth yet to track a real per-user list.
const myLoans = books.filter((b) => b.status === "checked-out");

export default function MyBooks() {
  return (
    <div className="my-books">
      <div className="container">
        <p className="my-books__eyebrow">Your account</p>
        <h1>My books</h1>
        <p className="my-books__sub">
          {myLoans.length} {myLoans.length === 1 ? "loan" : "loans"} out right
          now.
        </p>

        {myLoans.length === 0 ? (
          <div className="my-books__empty">
            <p>Nothing checked out.</p>
            <Link to="/">Browse the catalog →</Link>
          </div>
        ) : (
          <table className="my-books__table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Due</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {myLoans.map((b) => (
                <tr key={b.id}>
                  <td>
                    <Link to={`/book/${b.id}`}>{b.title}</Link>
                  </td>
                  <td>{b.author}</td>
                  <td>
                    {new Date(b.dueDate).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td>
                    <StatusStamp status={b.status} dueDate={b.dueDate} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
