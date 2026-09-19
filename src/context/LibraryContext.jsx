import { createContext, useContext, useState } from "react";
import { initialBooks } from "../data/books";

// Mock "backend" for books + borrow/return records. Everything lives in
// memory and resets on refresh — this is the piece a real API/database
// will eventually replace.
const LibraryContext = createContext(null);

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

const today = new Date().toISOString().slice(0, 10);

const seedRecords = [
  {
    id: "r001",
    bookId: "b004",
    username: "student1",
    borrowDate: addDays(today, -10),
    dueDate: addDays(today, 4),
    returnDate: null,
    status: "borrowed",
  },
  {
    id: "r002",
    bookId: "b007",
    username: "student1",
    borrowDate: addDays(today, -20),
    dueDate: addDays(today, -6),
    returnDate: null,
    status: "borrowed",
  },
  {
    id: "r003",
    bookId: "b002",
    username: "student1",
    borrowDate: addDays(today, -30),
    dueDate: addDays(today, -16),
    returnDate: addDays(today, -18),
    status: "returned",
  },
];

export function LibraryProvider({ children }) {
  const [books, setBooks] = useState(initialBooks);
  const [records, setRecords] = useState(seedRecords);

  function addBook(book) {
    const id = "b" + Math.random().toString(36).slice(2, 8);
    setBooks((prev) => [
      ...prev,
      { ...book, id, availableCopies: Number(book.totalCopies) },
    ]);
  }

  function updateBook(id, changes) {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...changes } : b))
    );
  }

  function deleteBook(id) {
    setBooks((prev) => prev.filter((b) => b.id !== id));
    setRecords((prev) => prev.filter((r) => r.bookId !== id));
  }

  function borrowBook(bookId, username, loanDays = 14) {
    const book = books.find((b) => b.id === bookId);
    if (!book || book.availableCopies < 1) return false;

    setBooks((prev) =>
      prev.map((b) =>
        b.id === bookId
          ? { ...b, availableCopies: b.availableCopies - 1 }
          : b
      )
    );
    const record = {
      id: "r" + Math.random().toString(36).slice(2, 8),
      bookId,
      username,
      borrowDate: today,
      dueDate: addDays(today, loanDays),
      returnDate: null,
      status: "borrowed",
    };
    setRecords((prev) => [record, ...prev]);
    return true;
  }

  function returnBook(recordId) {
    const record = records.find((r) => r.id === recordId);
    if (!record || record.status === "returned") return;

    setRecords((prev) =>
      prev.map((r) =>
        r.id === recordId
          ? { ...r, status: "returned", returnDate: today }
          : r
      )
    );
    setBooks((prev) =>
      prev.map((b) =>
        b.id === record.bookId
          ? {
              ...b,
              availableCopies: Math.min(
                b.totalCopies,
                b.availableCopies + 1
              ),
            }
          : b
      )
    );
  }

  return (
    <LibraryContext.Provider
      value={{
        books,
        records,
        addBook,
        updateBook,
        deleteBook,
        borrowBook,
        returnBook,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  return useContext(LibraryContext);
}
