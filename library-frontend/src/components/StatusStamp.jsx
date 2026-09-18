import "./StatusStamp.css";

// A stamped-label motif instead of a generic rounded status pill —
// reads like a due-date stamp inside the back cover of a library book.
export default function StatusStamp({ status, dueDate }) {
  if (status === "available") {
    return <span className="stamp stamp--available">On the shelf</span>;
  }

  const due = dueDate
    ? new Date(dueDate).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <span className="stamp stamp--out">
      Checked out{due ? ` · due ${due}` : ""}
    </span>
  );
}
