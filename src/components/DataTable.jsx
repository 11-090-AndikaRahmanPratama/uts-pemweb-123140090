"use client";

export default function DataTable({
  films,
  onFilmClick,
  onToggleFavorite,
  isFavorite,
  emptyMessage,
}) {
  if (films.length === 0) {
    return (
      <div className="data-table">
        <div className="empty-state">{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div className="data-table">
      <div className="films-grid">
        {films.map((film) => (
          <div key={film.imdbID} className="film-card">
            <div
              className="film-poster"
              onClick={() => onFilmClick(film)}
              style={{ cursor: "pointer" }}
            >
              {film.Poster !== "N/A" ? (
                <img src={film.Poster || "/placeholder.svg"} alt={film.Title} />
              ) : (
                "🎬"
              )}
            </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
