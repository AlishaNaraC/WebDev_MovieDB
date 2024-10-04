import './index.css';
import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";

import Header from './components/Header';
import CardSearch from './components/CardSearch';

// import movieOne from './image/movieOne.jpg';
// import movieTwo from './image/movieTwo.jpg';
// import movieThree from './image/movieThree.jpg';
// import movieFour from './image/movieFour.jpg';
// import movieFive from './image/movieFive.jpg';
// import movieSix from './image/movieSix.jpg';
// import movieSeven from './image/movieSeven.jpg';
// import movieEight from './image/movieEight.jpg';
// import movieNine from './image/movieNine.jpg';
// import movieTen from './image/movieTen.jpg';
// import movieEleven from './image/movieEleven.jpg';
// import movieTwelve from './image/movieTwelve.jpg';
// import 'boxicons/css/boxicons.min.css';

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
      <MainContent results={results} query={query}/>
    </div>
  );
};

const MainContent = ({ results, query }) => {
  return (
    <main className="main">
      {/* <h4 className='justify-content-start align-items-start'>Search Results for "{query}"</h4> */}
      <div className="card-container-result">
      {results.length > 0 ? (
          results.map((movie, index) => (
            <CardSearch
              key={index}
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
  );
};

export default SearchResult;
