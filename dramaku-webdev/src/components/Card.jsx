import React, {useEffect, useState} from 'react';
// import movieOne from '../image/movieOne.jpg';
// import movieTwo from '../image/movieTwo.jpg';
// import movieThree from '../image/movieThree.jpg';
// import movieFour from '../image/movieFour.jpg';
// import movieFive from '../image/movieFive.jpg';
// import movieSix from '../image/movieSix.jpg';
// import movieSeven from '../image/movieSeven.jpg';
// import movieEight from '../image/movieEight.jpg';
// import movieNine from '../image/movieNine.jpg';
// import movieTen from '../image/movieTen.jpg';
// import movieEleven from '../image/movieEleven.jpg';
// import movieTwelve from '../image/movieTwelve.jpg';

function Card() {
  const handleCardClick = () => {
    window.location.href = 'detailPage';
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
          <img src={movie.poster} onClick={handleCardClick} alt="drama cover" />
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

// function getDramaCards() {
//     return [
//       {
//         imgSrc: movieOne,
//         title: 'Title of the drama 1 that makes two lines',
//         year: '2024',
//         genres: ['Genre 1', 'Genre 2', 'Genre 3'],
//         rating: '3.5',
//         views: '19',
//       },
//       {
//         imgSrc: movieTwo,
//         title: 'Title of the drama 2 that makes two lines',
//         year: '2024',
//         genres: ['Genre 1', 'Genre 2', 'Genre 3'],
//         rating: '3.5',
//         views: '19',
//       },
//       {
//         imgSrc: movieThree,
//         title: 'Title of the drama 3 that makes two lines',
//         year: '2024',
//         genres: ['Genre 1', 'Genre 2', 'Genre 3'],
//         rating: '3.5',
//         views: '19',
//       },
//       {
//         imgSrc: movieFour,
//         title: 'Title of the drama 4 that makes two lines',
//         year: '2024',
//         genres: ['Genre 1', 'Genre 2', 'Genre 3'],
//         rating: '3.5',
//         views: '19',
//       },
//       {
//         imgSrc: movieFive,
//         title: 'Title of the drama 5 that makes two lines',
//         year: '2024',
//         genres: ['Genre 1', 'Genre 2', 'Genre 3'],
//         rating: '3.5',
//         views: '19',
//       },
//       {
//         imgSrc: movieSix,
//         title: 'Title of the drama 6 that makes two lines',
//         year: '2024',
//         genres: ['Genre 1', 'Genre 2', 'Genre 3'],
//         rating: '3.5',
//         views: '19',
//       },
//       {
//         imgSrc: movieSeven,
//         title: 'Title of the drama 7 that makes two lines',
//         year: '2024',
//         genres: ['Genre 1', 'Genre 2', 'Genre 3'],
//         rating: '3.5',
//         views: '19',
//       },
//       {
//         imgSrc: movieEight,
//         title: 'Title of the drama 8 that makes two lines',
//         year: '2024',
//         genres: ['Genre 1', 'Genre 2', 'Genre 3'],
//         rating: '3.5',
//         views: '19',
//       },
//       {
//         imgSrc: movieNine,
//         title: 'Title of the drama 9 that makes two lines',
//         year: '2024',
//         genres: ['Genre 1', 'Genre 2', 'Genre 3'],
//         rating: '3.5',
//         views: '19',
//       },
//       {
//         imgSrc: movieTen,
//         title: 'Title of the drama 10 that makes two lines',
//         year: '2024',
//         genres: ['Genre 1', 'Genre 2', 'Genre 3'],
//         rating: '3.5',
//         views: '19',
//       },
//       {
//         imgSrc: movieEleven,
//         title: 'Title of the drama 11 that makes two lines',
//         year: '2024',
//         genres: ['Genre 1', 'Genre 2', 'Genre 3'],
//         rating: '3.5',
//         views: '19',
//       },
//       {
//         imgSrc: movieTwelve,
//         title: 'Title of the drama 12 that makes two lines',
//         year: '2024',
//         genres: ['Genre 1', 'Genre 2', 'Genre 3'],
//         rating: '3.5',
//         views: '19',
//       },
//     ];
//   }