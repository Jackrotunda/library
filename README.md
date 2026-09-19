# Rosemont Library — Frontend

A UI-only prototype for a library catalog system. No backend yet — all
book data lives in `src/data/books.js` as mock data, structured so it can
be swapped for real API calls later.

## Pages

- **Catalog** (`/`) — searchable, filterable grid of the collection
- **Book detail** (`/book/:id`) — card-catalog-style detail view, with a
  mock "borrow" / "place a hold" action
- **My Books** (`/my-books`) — mock view of currently checked-out titles
- **Login** (`/login`) — static sign-in form, not wired to auth yet

## Run locally (no Docker)

```bash
npm install
npm run dev
```

Visit http://localhost:5173

## Run with Docker

```bash
docker compose up
```

Visit http://localhost:5173. Source is mounted as a volume, so edits
hot-reload inside the container.

For a production-style static build:

```bash
docker build --target production -t library-frontend:prod .
docker run -p 8080:80 library-frontend:prod
```

## Project structure

```
src/
├── components/   Navbar, BookCard, StatusStamp, CatalogControls, Footer
├── pages/        Catalog, BookDetail, MyBooks, Login
├── data/         books.js — mock catalog data
├── App.jsx       routes
└── main.jsx      entry point
```

## Next steps (not yet built)

- Backend/API to replace `src/data/books.js`
- Real authentication for Login and My Books
- Admin flow for adding/editing books
- GitHub Actions workflow for lint/build on push
