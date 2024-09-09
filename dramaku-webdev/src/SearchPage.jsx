import './index.css';

import Header from './components/Header';
import CardSearch from './components/CardSearch';

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
// import 'boxicons/css/boxicons.min.css';

const SearchResult = () => {
  return (
    <div>
      <Header />
      <MainContent />
    </div>
  );
};

const MainContent = () => {
    const cards = [
        { src: movieOne }, { src: movieTwo }, { src: movieThree },
        { src: movieFour }, { src: movieFive }, { src: movieSix },
        { src: movieSeven }, { src: movieEight }, { src: movieNine },
        { src: movieTen }, { src: movieEleven }, { src: movieTwelve }
      ];

  return (
    <main className="main">
      <div className="card-container-result">
        {cards.map((card, index) => (
          <CardSearch key={index} imgSrc={card.src} />
        ))}
      </div>
    </main>
  );
};

export default SearchResult;
