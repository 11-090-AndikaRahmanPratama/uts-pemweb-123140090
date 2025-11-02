"use client";

import { useState } from "react";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (filters.title.trim()) {
      onSearch(filters);
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        <div className="form-group">
          <label htmlFor="title">Judul Film</label>
          <input
            id="title"
            type="text"
            name="title"
            value={filters.title}
            onChange={handleChange}
            placeholder="Masukkan judul film..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="year">Tahun Rilis</label>
          <input
            id="year"
            type="number"
            name="year"
            value={filters.year}
            onChange={handleChange}
            min="1800"
            max={new Date().getFullYear()}
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Tipe</label>
          <select
            name="type"
            id="type"
            value={filters.type}
            onChange={handleChange}
          >
            <option value="movie">Film</option>
            <option value="series">Serial</option>
            <option value="episode">Episode</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="minRating">Rating Minimal</label>
          <input
            id="minRating"
            type="number"
            name="minRating"
            value={filters.minRating}
            onChange={handleChange}
            min="0"
            max="10"
            step="0.1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="releaseStatus">Status Rilis</label>
          <select
            name="releaseStatus"
            id="releaseStatus"
            value={filters.releaseStatus}
            onChange={handleChange}
          >
            <option value="any">Semua</option>
            <option value="released">Telah dirilis</option>
            <option value="coming">Akan Datang</option>
          </select>
        </div>

        <div
          className="form-group"
          style={{ display: "flex", alignItems: "flex-end" }}
        >
          <button
            type="submit"
            className="search-button"
            style={{ width: "100%" }}
          >
            Cari
          </button>
        </div>
      </div>
    </form>
  );
}
