import "./CatalogControls.css";

export default function CatalogControls({
  query,
  onQueryChange,
  genre,
  onGenreChange,
  genres,
  availableOnly,
  onAvailableOnlyChange,
  resultCount,
}) {
  return (
    <div className="catalog-controls">
      <div className="catalog-controls__row">
        <input
          type="search"
          className="catalog-controls__search"
          placeholder="Search by title or author…"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          aria-label="Search the catalog"
        />
        <select
          className="catalog-controls__select"
          value={genre}
          onChange={(e) => onGenreChange(e.target.value)}
          aria-label="Filter by genre"
        >
          <option value="">All genres</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <label className="catalog-controls__checkbox">
          <input
            type="checkbox"
            checked={availableOnly}
            onChange={(e) => onAvailableOnlyChange(e.target.checked)}
          />
          On the shelf only
        </label>
      </div>
      <p className="catalog-controls__count">
        {resultCount} {resultCount === 1 ? "book" : "books"}
      </p>
    </div>
  );
}
