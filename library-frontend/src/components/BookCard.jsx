import { Link } from "react-router-dom";
import StatusStamp from "./StatusStamp";
import "./BookCard.css";

export default function BookCard({ book }) {
  return (
    <Link to={`/book/${book.id}`} className="book-card">
      <div
        className="book-card__spine"
        style={{
          background: `linear-gradient(155deg, ${book.spine[0]}, ${book.spine[1]})`,
        }}
      >
        <span className="book-card__spine-title">{book.title}</span>
      </div>
      <div className="book-card__body">
        <p className="book-card__genre">{book.genre}</p>
        <h3 className="book-card__title">{book.title}</h3>
        <p className="book-card__author">{book.author}</p>
        <StatusStamp status={book.status} dueDate={book.dueDate} />
      </div>
    </Link>
  );
}
