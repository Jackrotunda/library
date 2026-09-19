import { useState } from "react";
import { useLibrary } from "../../context/LibraryContext";
import "./ManageBooks.css";

const blankForm = {
  title: "",
  author: "",
  genre: "",
  year: "",
  isbn: "",
  shelf: "",
  totalCopies: 1,
  description: "",
  pages: "",
  rating: "",
};

const spinePalette = [
  ["#8C4A2F", "#C97C4B"],
  ["#1E3A2E", "#3C6B52"],
  ["#4A3B6B", "#7A66A6"],
  ["#0F4C5C", "#1B7A8C"],
  ["#6B1E2B", "#A13D2B"],
];

export default function ManageBooks() {
  const { books, addBook, updateBook, deleteBook } = useLibrary();
  const [form, setForm] = useState(blankForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  function startAdd() {
    setForm(blankForm);
    setEditingId(null);
    setShowForm(true);
  }

  function startEdit(book) {
    setForm({
      title: book.title,
      author: book.author,
      genre: book.genre,
      year: book.year,
      isbn: book.isbn,
      shelf: book.shelf,
      totalCopies: book.totalCopies,
      description: book.description,
      pages: book.pages,
      rating: book.rating,
    });
    setEditingId(book.id);
    setShowForm(true);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      ...form,
      year: Number(form.year),
      pages: Number(form.pages),
      rating: Number(form.rating) || 0,
      totalCopies: Number(form.totalCopies),
    };

    if (editingId) {
      updateBook(editingId, payload);
    } else {
      const spine =
        spinePalette[Math.floor(Math.random() * spinePalette.length)];
      addBook({ ...payload, spine });
    }
    setShowForm(false);
    setForm(blankForm);
    setEditingId(null);
  }

  function handleDelete(id) {
    if (confirm("Remove this book from the catalog?")) {
      deleteBook(id);
    }
  }

  return (
    <div className="manage-books">
      <div className="manage-books__header">
        <div>
          <p className="records-page__eyebrow">Catalog</p>
          <h1>Manage books</h1>
          <p className="records-page__sub">
            {books.length} titles — add, edit, or remove from the collection.
          </p>
        </div>
        <button className="manage-books__add-btn" onClick={startAdd}>
          + Add a book
        </button>
      </div>

      {showForm && (
        <form className="manage-books__form" onSubmit={handleSubmit}>
          <h2>{editingId ? "Edit book" : "Add a book"}</h2>
          <div className="manage-books__grid">
            <label>
              Title
              <input name="title" value={form.title} onChange={handleChange} required />
            </label>
            <label>
              Author
              <input name="author" value={form.author} onChange={handleChange} required />
            </label>
            <label>
              Genre
              <input name="genre" value={form.genre} onChange={handleChange} required />
            </label>
            <label>
              Year
              <input type="number" name="year" value={form.year} onChange={handleChange} required />
            </label>
            <label>
              ISBN
              <input name="isbn" value={form.isbn} onChange={handleChange} required />
            </label>
            <label>
              Shelf
              <input name="shelf" value={form.shelf} onChange={handleChange} required />
            </label>
            <label>
              Total copies
              <input type="number" min="0" name="totalCopies" value={form.totalCopies} onChange={handleChange} required />
            </label>
            <label>
              Pages
              <input type="number" name="pages" value={form.pages} onChange={handleChange} />
            </label>
            <label>
              Rating (0–5)
              <input type="number" step="0.1" min="0" max="5" name="rating" value={form.rating} onChange={handleChange} />
            </label>
          </div>
          <label className="manage-books__description">
            Description
            <textarea name="description" rows={3} value={form.description} onChange={handleChange} />
          </label>
          <div className="manage-books__form-actions">
            <button type="submit" className="manage-books__save-btn">
              {editingId ? "Save changes" : "Add to catalog"}
            </button>
            <button
              type="button"
              className="manage-books__cancel-btn"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <table className="records-table manage-books__table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Copies</th>
            <th>Shelf</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.genre}</td>
              <td>
                {b.availableCopies} / {b.totalCopies}
              </td>
              <td>{b.shelf}</td>
              <td className="manage-books__row-actions">
                <button
                  className="records-table__action"
                  onClick={() => startEdit(b)}
                >
                  Edit
                </button>
                <button
                  className="records-table__action records-table__action--danger"
                  onClick={() => handleDelete(b.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
