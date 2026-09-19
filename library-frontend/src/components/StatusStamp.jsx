import "./StatusStamp.css";

// A stamped-label motif instead of a generic rounded status pill —
// reads like a due-date stamp inside the back cover of a library book.
export default function StatusStamp({ tone = "available", children }) {
  return <span className={`stamp stamp--${tone}`}>{children}</span>;
}
