import { useMemo, useState } from "react";
import { books, genres } from "../data/books";
import BookCard from "../components/BookCard";
import CatalogControls from "../components/CatalogControls";
import "./Catalog.css";

export default function Catalog() {
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
      const matchesAvailability = !availableOnly || b.status === "available";
      return matchesQuery && matchesGenre && matchesAvailability;
    });
  }, [query, genre, availableOnly]);

  return (
    <div className="catalog-page">
      <div className="container">
        <div className="catalog-page__hero">
          <p className="catalog-page__eyebrow">Open stacks</p>
          <h1>Find something to read</h1>
          <p className="catalog-page__sub">
            {books.length} titles currently in the collection.
          </p>
        </div>

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
          <div className="catalog-page__empty">
            <p>Nothing matches that search.</p>
            <p>Try a different title, author, or clear the genre filter.</p>
          </div>
        ) : (
          <div className="catalog-page__grid">
            {filtered.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
