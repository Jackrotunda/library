import { useMemo, useState } from "react";
import { useLibrary } from "../../context/LibraryContext";
import { genres } from "../../data/books";
import BookCard from "../../components/BookCard";
import CatalogControls from "../../components/CatalogControls";
import "./BrowseBooks.css";

export default function BrowseBooks() {
  const { books } = useLibrary();
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [availableOnly, setAvailableOnly] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return books.filter((b) => {
      const matchesQuery =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q);
      const matchesGenre = !genre || b.genre === genre;
      const matchesAvailability = !availableOnly || b.availableCopies > 0;
      return matchesQuery && matchesGenre && matchesAvailability;
    });
  }, [books, query, genre, availableOnly]);

  return (
    <div className="browse">
      <p className="browse__eyebrow">Open stacks</p>
      <h1>Find something to read</h1>
      <p className="browse__sub">
        {books.length} titles currently in the collection.
      </p>

      <CatalogControls
        query={query}
        onQueryChange={setQuery}
        genre={genre}
        onGenreChange={setGenre}
        genres={genres}
        availableOnly={availableOnly}
        onAvailableOnlyChange={setAvailableOnly}
        resultCount={filtered.length}
      />

      {filtered.length === 0 ? (
        <div className="browse__empty">
          <p>Nothing matches that search.</p>
          <p>Try a different title, author, or clear the genre filter.</p>
        </div>
      ) : (
        <div className="browse__grid">
          {filtered.map((book) => (
            <BookCard key={book.id} book={book} linkBase="/student/book" />
          ))}
        </div>
      )}
    </div>
  );
}
