import React from 'react';
import movieOne from './image/movieOne.jpg';
import movieTwo from './image/movieTwo.jpg';
import movieThree from './image/movieThree.jpg';
import movieFour from './image/movieFour.jpg';
import movieFive from './image/movieFive.jpg';
import movieSix from './image/movieSix.jpg';
import movieSeven from './image/movieSeven.jpg';
import movieEight from './image/movieEight.jpg';
import movieNine from './image/movieNine.jpg';
import movieTen from './image/movieTen.jpg';
import movieEleven from './image/movieEleven.jpg';
import movieTwelve from './image/movieTwelve.jpg';

function Home() {
  const handleSearchClick = () => {
    window.location.href = 'searchResultPage';
  };

  const handleLoginClick = () => {
    window.location.href = 'login';
  };

  const handleCardClick = () => {
    window.location.href = 'detailPage';
  };

  return (
    <div>
      <header className="header">
        <div className="search-container">
          <input type="text" placeholder="Search Dramas" />
          <i className='bx bx-search' onClick={handleSearchClick}></i>
        </div>

        <div className="dropdown-container">
          {['Year', 'Genre', 'Status', 'Availability', 'Award', 'Sorted By'].map((category, index) => (
            <div className="dropdown" key={index}>
              <div className="select">
                <span className="selected">{category}</span>
                <div className="caret"></div>
              </div>
              <ul className="dropdown-menu">
                {getDropdownOptions(category).map((option, idx) => (
                  <li key={idx}>{option}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="user-buttons-container">
          <div className="user-buttons">
            <button onClick={handleLoginClick}>Login</button>
          </div>
        </div>
      </header>

      <section className="sidebar">
        <header className="header">
          <a href="/" style={{ textDecoration: 'none' }}>DramaKu</a>
        </header>
        <ul>
          <li>Japan</li>
          <li>Korea</li>
          <li>China</li>
        </ul>
      </section>

      <main className="main">
        <div className="card-container">
          {getDramaCards().map((card, index) => (
            <div className="card" key={index}>
              <img src={card.imgSrc} onClick={handleCardClick} alt="drama cover" />
              <div className="card-content">
                <h3>{card.title}</h3>
                <p>{card.year}</p>
                <p>{card.genres.join(', ')}</p>
                <p>Rate {card.rating}/5 {card.views} views</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function getDropdownOptions(category) {
  switch (category) {
    case 'Year':
      return ['2021', '2020', '2019', '2018', '2017'];
    case 'Genre':
      return ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Thriller'];
    case 'Status':
      return ['Completed', 'Ongoing'];
    case 'Availability':
      return ['Free', 'Paid'];
    case 'Award':
      return ['Yes', 'No'];
    case 'Sorted By':
      return ['Alphabet', 'Rating', 'Year', 'Views'];
    default:
      return [];
  }
}

function getDramaCards() {
  return [
    {
      imgSrc: movieOne,
      title: 'Title of the drama 1 that makes two lines',
      year: '2024',
      genres: ['Genre 1', 'Genre 2', 'Genre 3'],
      rating: '3.5',
      views: '19',
    },
    {
      imgSrc: movieTwo,
      title: 'Title of the drama 2 that makes two lines',
      year: '2024',
      genres: ['Genre 1', 'Genre 2', 'Genre 3'],
      rating: '3.5',
      views: '19',
    },
    {
      imgSrc: movieThree,
      title: 'Title of the drama 3 that makes two lines',
      year: '2024',
      genres: ['Genre 1', 'Genre 2', 'Genre 3'],
      rating: '3.5',
      views: '19',
    },
    {
      imgSrc: movieFour,
      title: 'Title of the drama 4 that makes two lines',
      year: '2024',
      genres: ['Genre 1', 'Genre 2', 'Genre 3'],
      rating: '3.5',
      views: '19',
    },
    {
      imgSrc: movieFive,
      title: 'Title of the drama 5 that makes two lines',
      year: '2024',
      genres: ['Genre 1', 'Genre 2', 'Genre 3'],
      rating: '3.5',
      views: '19',
    },
    {
      imgSrc: movieSix,
      title: 'Title of the drama 6 that makes two lines',
      year: '2024',
      genres: ['Genre 1', 'Genre 2', 'Genre 3'],
      rating: '3.5',
      views: '19',
    },
    {
      imgSrc: movieSeven,
      title: 'Title of the drama 7 that makes two lines',
      year: '2024',
      genres: ['Genre 1', 'Genre 2', 'Genre 3'],
      rating: '3.5',
      views: '19',
    },
    {
      imgSrc: movieEight,
      title: 'Title of the drama 8 that makes two lines',
      year: '2024',
      genres: ['Genre 1', 'Genre 2', 'Genre 3'],
      rating: '3.5',
      views: '19',
    },
    {
      imgSrc: movieNine,
      title: 'Title of the drama 9 that makes two lines',
      year: '2024',
      genres: ['Genre 1', 'Genre 2', 'Genre 3'],
      rating: '3.5',
      views: '19',
    },
    {
      imgSrc: movieTen,
      title: 'Title of the drama 10 that makes two lines',
      year: '2024',
      genres: ['Genre 1', 'Genre 2', 'Genre 3'],
      rating: '3.5',
      views: '19',
    },
    {
      imgSrc: movieEleven,
      title: 'Title of the drama 11 that makes two lines',
      year: '2024',
      genres: ['Genre 1', 'Genre 2', 'Genre 3'],
      rating: '3.5',
      views: '19',
    },
    {
      imgSrc: movieTwelve,
      title: 'Title of the drama 12 that makes two lines',
      year: '2024',
      genres: ['Genre 1', 'Genre 2', 'Genre 3'],
      rating: '3.5',
      views: '19',
    },
  ];
}

export default Home;
