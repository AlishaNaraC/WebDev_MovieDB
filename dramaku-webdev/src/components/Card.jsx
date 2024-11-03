import React, {useEffect, useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { GoArrowUp } from "react-icons/go";


function Card() {
  const navigate = useNavigate();
  const [nOfDrama, setnOfDrama] = useState(12);
  const [movies, setMovies] = useState([]);
  const lastCard = useRef(null);

  const loadMore = () =>{
    setnOfDrama(prevCount => prevCount + 8);
  }

  const handleCardClick = (id) => {
    navigate(`/movie/${id}`);
  };

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
    },[]);

  useEffect(() => {
    if (lastCard.current) {
      lastCard.current.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  }, [nOfDrama]);

  const dramaMovies = movies.slice(0, nOfDrama);

  const toTop = () =>{
    window.scrollTo(0,0);
  }

  return (
    <div>
      <div className='card-container'>
        {dramaMovies.map((movie, index) => (
          <div className="card" key={index} ref={index === dramaMovies.length - 1 ? lastCard : null}>
            <img src={movie.poster} onClick={() => handleCardClick(movie.drama_id)} alt={movie.title} />
            <div className="card-content">
              <h3>{movie.title}</h3>
              <p>{movie.release_d}</p>
              <p>{movie.genres}</p>
              <p>Rate {movie.rating ? movie.rating : "0.0"}/5</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="d-flex justify-content-center">
        <Button variant="dark" onClick={loadMore}>Load More</Button>
      </div>
      <div className='d-flex justify-content-end toTop'>
        <Button variant="outline-primary" onClick={toTop}><GoArrowUp size={25}/></Button>
      </div>
    </div>
  );
}

export default Card;