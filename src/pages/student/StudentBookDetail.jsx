import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLibrary } from "../../context/LibraryContext";
import { useAuth } from "../../context/AuthContext";
import StatusStamp from "../../components/StatusStamp";
import "./StudentBookDetail.css";

export default function StudentBookDetail() {
  const { id } = useParams();
  const { books, borrowBook } = useLibrary();
  const { currentUser } = useAuth();
  const book = books.find((b) => b.id === id);
  const [justBorrowed, setJustBorrowed] = useState(null);

  if (!book) {
    return (
      <div className="student-detail__missing">
        <h1>We can't find that book</h1>
        <Link to="/student">← Back to search</Link>
      </div>
    );
  }

  const available = book.availableCopies > 0;

  function handleBorrow() {
    const ok = borrowBook(book.id, currentUser.username);
    if (ok) {
      const due = new Date();
      due.setDate(due.getDate() + 14);
      setJustBorrowed(due.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" }));
    }
  }

  return (
    <div className="student-detail">
      <Link to="/student" className="student-detail__back">
        ← Back to search
      </Link>

      <div className="index-card">
        <div
          className="index-card__cover"
          style={{
            background: `linear-gradient(155deg, ${book.spine[0]}, ${book.spine[1]})`,
          }}
        >
          <span>{book.title}</span>
        </div>

        <div className="index-card__tab">Shelf {book.shelf}</div>

        <div className="index-card__body">
          <p className="index-card__genre">{book.genre}</p>
          <h1>{book.title}</h1>
          <p className="index-card__author">by {book.author}</p>

          <div className="index-card__row">
            <StatusStamp tone={available ? "available" : "out"}>
              {available
                ? `${book.availableCopies} of ${book.totalCopies} available`
                : "Book unavailable — all copies checked out"}
            </StatusStamp>
            <span className="index-card__rating">★ {book.rating}</span>
          </div>

          <p className="index-card__description">{book.description}</p>

          <dl className="index-card__meta">
            <div>
              <dt>Published</dt>
              <dd>{book.year}</dd>
            </div>
            <div>
              <dt>Pages</dt>
              <dd>{book.pages}</dd>
            </div>
            <div>
              <dt>ISBN</dt>
              <dd>{book.isbn}</dd>
            </div>
            <div>
              <dt>Shelf</dt>
              <dd>{book.shelf}</dd>
            </div>
          </dl>

          {justBorrowed ? (
            <p className="index-card__hold-note">
              Borrowed — due back {justBorrowed}. Find it under "My borrowed
              books."
            </p>
          ) : available ? (
            <button className="index-card__cta" onClick={handleBorrow}>
              Borrow this book
            </button>
          ) : (
            <p className="index-card__unavailable">
              This title is fully checked out right now. Check back later or
              browse a similar genre.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
