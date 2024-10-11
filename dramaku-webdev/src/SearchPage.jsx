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
  const query = useQuery().get("query");

  const fetchSearchResults = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/search?query=${query}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }, [query]);

  useEffect(() => {
    if (query) {
      fetchSearchResults();
    }
  }, [query, fetchSearchResults]); 

  return (
    <div>
      <Header />
      <main className="main">
        <div className="card-container-result">
        {results.length > 0 ? (
            results.map((movie, index) => (
              <CardSearch
                key={index}
                id={movie.drama_id}
                imgSrc={movie.poster}
                title={movie.title}
                releaseDate={movie.release_d}
                genres={movie.genres}
                rating={movie.rating}
                views={movie.tviews}
              />
            ))
          ) : (
            <p>No results found for "{query}".</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default SearchResult;
