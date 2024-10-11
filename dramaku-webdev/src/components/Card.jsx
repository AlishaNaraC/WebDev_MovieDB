import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Card() {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/movie/${id}`);
  };

  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    try {
      const response = await fetch("http://localhost:5000/movies");
      const jsonData = await response.json();
      setMovies(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => 
    {
      getMovies();
    },
  []);

  return (
    <div className="card-container">
      {movies.map((movie, index) => (
        <div className="card" key={index}>
          <img src={movie.poster} onClick={() => handleCardClick(movie.drama_id)} alt={movie.title} />
          <div className="card-content">
            <h3>{movie.title}</h3>
            <p>{movie.release_d}</p>
            <p>{movie.genres}</p>
            <p>Rate {movie.rating}/5 | {movie.tviews} views</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;