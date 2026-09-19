import { useLibrary } from "../../context/LibraryContext";
import { useAuth } from "../../context/AuthContext";
import "./Reports.css";

export default function Reports() {
  const { books, records } = useLibrary();
  const { students } = useAuth();

  const totalCopies = books.reduce((sum, b) => sum + b.totalCopies, 0);
  const availableCopies = books.reduce((sum, b) => sum + b.availableCopies, 0);
  const outCopies = totalCopies - availableCopies;
  const todayStr = new Date().toISOString().slice(0, 10);
  const overdue = records.filter(
    (r) => r.status === "borrowed" && r.dueDate < todayStr
  ).length;

  const genreCounts = books.reduce((acc, b) => {
    acc[b.genre] = (acc[b.genre] || 0) + 1;
    return acc;
  }, {});
  const maxGenreCount = Math.max(...Object.values(genreCounts), 1);

  return (
    <div>
      <p className="records-page__eyebrow">Overview</p>
      <h1>Reports</h1>
      <p className="records-page__sub">
        A snapshot of the collection and circulation activity.
      </p>

      <div className="reports__stats">
        <StatCard label="Titles in catalog" value={books.length} />
        <StatCard label="Registered students" value={students.length} />
        <StatCard label="Copies checked out" value={outCopies} />
        <StatCard label="Overdue loans" value={overdue} warn={overdue > 0} />
      </div>

      <h2 className="reports__subheading">Collection by genre</h2>
      <div className="reports__bars">
        {Object.entries(genreCounts)
          .sort((a, b) => b[1] - a[1])
          .map(([genre, count]) => (
            <div className="reports__bar-row" key={genre}>
              <span className="reports__bar-label">{genre}</span>
              <div className="reports__bar-track">
                <div
                  className="reports__bar-fill"
                  style={{ width: `${(count / maxGenreCount) * 100}%` }}
                />
              </div>
              <span className="reports__bar-count">{count}</span>
            </div>
          ))}
      </div>
    </div>
  );
}

function StatCard({ label, value, warn }) {
  return (
    <div className={warn ? "stat-card stat-card--warn" : "stat-card"}>
      <p className="stat-card__value">{value}</p>
      <p className="stat-card__label">{label}</p>
    </div>
  );
}
