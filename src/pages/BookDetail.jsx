import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { books } from "../data/books";
import StatusStamp from "../components/StatusStamp";
import "./BookDetail.css";

export default function BookDetail() {
  const { id } = useParams();
  const book = books.find((b) => b.id === id);
  const [holdPlaced, setHoldPlaced] = useState(false);

  if (!book) {
    return (
      <div className="container book-detail__missing">
        <h1>We can't find that book</h1>
        <p>It may have been removed from the catalog.</p>
        <Link to="/" className="book-detail__back">
          ← Back to catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="book-detail">
      <div className="container">
        <Link to="/" className="book-detail__back">
          ← Back to catalog
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
              <StatusStamp status={book.status} dueDate={book.dueDate} />
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

            {book.status === "available" ? (
              <button className="index-card__cta">Borrow this book</button>
            ) : holdPlaced ? (
              <p className="index-card__hold-note">
                Hold placed — we'll notify you when it's back on the shelf.
              </p>
            ) : (
              <button
                className="index-card__cta index-card__cta--secondary"
                onClick={() => setHoldPlaced(true)}
              >
                Place a hold
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
