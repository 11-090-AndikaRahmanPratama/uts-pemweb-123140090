"use client";

import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import DataTable from "./components/DataTable";
import DetailCard from "./components/DetailCard";
import "./App.css";

const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;

function App() {
  const [films, setFilms] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = async (filters) => {
    setLoading(true);
    setError("");
    setFilms([]);
    setSelectedFilm(null);

    try {
      const query = new URLSearchParams({
        s: filters.title,
        y: filters.year || "",
        type: filters.type || "movie",
        apikey: OMDB_API_KEY,
      });

      const response = await fetch(`https://www.omdbapi.com/?${query}`);
      const data = await response.json();

      if (data.Search) {
        setFilms(data.Search);
      } else if (data.Response === "False") {
        setError(data.Error || "No films found");
      }
    } catch (err) {
      setError("Failed to fetch films. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilmClick = async (film) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${film.imdbID}&apikey=${OMDB_API_KEY}`
      );
      const data = await response.json();
      setSelectedFilm(data);
    } catch (err) {
      setError("Failed to fetch film details");
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (film) => {
    setFavorites((prev) => {
      const exists = prev.find((f) => f.imdbID === film.imdbID);
      if (exists) {
        return prev.filter((f) => f.imdbID !== film.imdbID);
      } else {
        return [...prev, film];
      }
    });
  };

  const isFavorite = (filmId) => favorites.some((f) => f.imdbID === filmId);

  const displayFilms = showFavorites ? favorites : films;

  return (
    <div className="app">
      <Header
        favoritesCount={favorites.length}
        onToggleFavorites={() => setShowFavorites(!showFavorites)}
        showFavorites={showFavorites}
      />

      {!showFavorites && <SearchForm onSearch={handleSearch} />}

      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading">Loading...</div>}

      {selectedFilm && (
        <DetailCard
          film={selectedFilm}
          onClose={() => setSelectedFilm(null)}
          onToggleFavorite={() => toggleFavorite(selectedFilm)}
          isFavorite={isFavorite(selectedFilm.imdbID)}
        />
      )}

      <DataTable
        films={displayFilms}
        onFilmClick={handleFilmClick}
        onToggleFavorite={toggleFavorite}
        isFavorite={isFavorite}
        emptyMessage={
          showFavorites ? "Belum ada film favorit!" : "Cari film untuk memulai"
        }
      />
    </div>
  );
}

export default App;
