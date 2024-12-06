import './index.css';
import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Header from './components/Header';
import CardSearch from './components/CardSearch';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResult = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const queryParams = useQuery();
  const searchQuery = queryParams.get("query") || '';
  const country = queryParams.get("country") || '';
  const year = queryParams.get("year") || '';
  const genre = queryParams.get("genre") || '';
  const status = queryParams.get("status") || '';
  const availability = queryParams.get("availability") || '';
  const award = queryParams.get("award") || '';
  const sortedBy = queryParams.get("sortedBy") || '';

  const fetchSearchResults = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();

      if (searchQuery) params.append("query", searchQuery);
      if (country) params.append("country", country);
      if (year) params.append("year", year);
      if (genre) params.append("genre", genre);
      if (status) params.append("status", status);
      if (availability) params.append("availability", availability);
      if (award) params.append("award", award);
      if (sortedBy) params.append("sortedBy", sortedBy);

      const response = await fetch(`http://localhost:5000/search?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();
      setResults(data);
    } catch (error) {
      setError("Failed to fetch search results. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [searchQuery, country, year, genre, status, availability, award, sortedBy]);

  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  return (
    <div>
      <Header />
      <main className="main">
        <div className="card-container-result">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : results.length > 0 ? (
            results.map((movie) => (
              <CardSearch
                key={movie.drama_id}
                id={movie.drama_id}
                imgSrc={movie.poster}
                title={movie.title}
                releaseDate={movie.release_d}
                genres={movie.genres}
                rating={movie.rating}
                views={movie.tviews}
                country={movie.country}
              />
            ))
          ) : (
            <p>No results found for "{searchQuery}".</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default SearchResult;