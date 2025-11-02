"use client";

export default function DetailCard({
  film,
  onClose,
  onToggleFavorite,
  isFavorite,
}) {
  if (!film) return null;

  const getRatingColor = (rating) => {
    const rate = Number.parseFloat(rating);
    if (rate >= 8) return "#4ade80";
    if (rate >= 7) return "#ffd700";
    if (rate >= 6) return "#fb923c";
    return "#e94560";
  };

  return (
    <div className="detail-modal" onClick={onClose}>
      <div className="detail-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <div className="detail-header">
          <div className="detail-poster">
            {film.Poster !== "N/A" ? (
              <img src={film.Poster || "/placeholder.svg"} alt={film.Title} />
            ) : (
              "🎬"
            )}
          </div>

          <div className="detail-title-section">
            <h2>{film.Title}</h2>
            <div className="detail-meta">
              <span>{film.Year}</span>
              <span>•</span>
              <span>{film.Runtime}</span>
              <span>•</span>
              <span>{film.Rated}</span>
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h3>Rating</h3>
          <div
            className="rating-badge"
            style={{
              background: getRatingColor(film.imdbRating),
              color: Number.parseFloat(film.imdbRating) >= 7 ? "#000" : "#fff",
            }}
          >
            IMDB: {film.imdbRating}/10 ({film.imdbVotes} votes)
          </div>
        </div>

        {film.Plot && film.Plot !== "N/A" && (
          <div className="detail-section">
            <h3>Plot</h3>
            <p>{film.Plot}</p>
          </div>
        )}

        {film.Genre && film.Genre !== "N/A" && (
          <div className="detail-section">
            <h3>Genre</h3>
            <p>{film.Genre}</p>
          </div>
        )}

        {film.Director && film.Director !== "N/A" && (
          <div className="detail-section">
            <h3>Director</h3>
            <p>{film.Director}</p>
          </div>
        )}

        {film.Actors && film.Actors !== "N/A" && (
          <div className="detail-section">
            <h3>Cast</h3>
            <p>{film.Actors}</p>
          </div>
        )}

        {film.Production && film.Production !== "N/A" && (
          <div className="detail-section">
            <h3>Production</h3>
            <p>{film.Production}</p>
          </div>
        )}

      </div>
    </div>
  );
}
