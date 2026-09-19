import { useState } from "react";
import { useLibrary } from "../../context/LibraryContext";
import StatusStamp from "../../components/StatusStamp";
import "../student/RecordsTable.css";
import "./records-filter.css";

export default function BorrowRecords() {
  const { records, books, returnBook } = useLibrary();
  const [filter, setFilter] = useState("all");

  const rows = records
    .map((r) => ({ ...r, book: books.find((b) => b.id === r.bookId) }))
    .filter((r) => filter === "all" || r.status === filter)
    .sort((a, b) => b.borrowDate.localeCompare(a.borrowDate));

  return (
    <div>
      <p className="records-page__eyebrow">Circulation</p>
      <h1>Borrow / return records</h1>
      <p className="records-page__sub">
        Every loan across all student accounts.
      </p>

      <div className="records-filter">
        {["all", "borrowed", "returned"].map((f) => (
          <button
            key={f}
            className={
              filter === f
                ? "records-filter__btn records-filter__btn--active"
                : "records-filter__btn"
            }
            onClick={() => setFilter(f)}
          >
            {f === "all" ? "All" : f === "borrowed" ? "Currently out" : "Returned"}
          </button>
        ))}
      </div>

      {rows.length === 0 ? (
        <div className="records-page__empty">
          <p>No records match this filter.</p>
        </div>
      ) : (
        <table className="records-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Student</th>
              <th>Borrowed</th>
              <th>Due</th>
              <th>Returned</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{r.book?.title ?? "Untitled"}</td>
                <td>{r.username}</td>
                <td>{r.borrowDate}</td>
                <td>{r.dueDate}</td>
                <td>{r.returnDate ?? "—"}</td>
                <td>
                  <StatusStamp tone={r.status === "returned" ? "available" : "out"}>
                    {r.status === "returned" ? "Returned" : "Out"}
                  </StatusStamp>
                </td>
                <td>
                  {r.status === "borrowed" && (
                    <button
                      className="records-table__action"
                      onClick={() => returnBook(r.id)}
                    >
                      Mark returned
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
