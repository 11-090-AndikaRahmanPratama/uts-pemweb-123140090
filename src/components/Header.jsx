"use client";

export default function Header({
  favoritesCount,
  onToggleFavorites,
  showFavorites,
}) {
  return (
    <header className="header">
      <div className="header-content">
        <h1>🎬 Movie Explorer</h1>
      </div>
      <div className="header-actions">
        <button
          className={`search-button ${showFavorites ? "active" : ""}`}
          onClick={onToggleFavorites}
          style={{
            background: showFavorites
              ? "linear-gradient(135deg, #e94560 0%, #d63447 100%)"
              : "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)",
          }}
        >
          {showFavorites
            ? "← Kembali ke Pencarian"
            : `Favorit (${favoritesCount})`}
        </button>
      </div>
    </header>
  );
}
