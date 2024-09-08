import './index.css';
import movieOne from './image/movieOne.jpg';
import movieTwo from './image/movieTwo.jpg';
import movieThree from './image/movieThree.jpg';
import movieFour from './image/movieFour.jpg';
import movieFive from './image/movieFive.jpg';
import movieSix from './image/movieSix.jpg';
import movieSeven from './image/movieSeven.jpg';
import movieEight from './image/movieEight.jpg';
// import 'boxicons/css/boxicons.min.css';

const SearchResult = () => {
  const handleSearch = () => {
    window.location.href = 'searchResultPage';
  };

  const handleNavigation = (url) => {
    window.location.href = url;
  };

  return (
    <div>
      <header className="header">
        <div className="search-container">
          <input type="text" placeholder="Search Dramas" />
          <i onClick={handleSearch} className='bx bx-search'></i>
        </div>

        <div className="dropdown-container">
          {["Year", "Genre", "Status", "Availability", "Award", "Sorted By"].map((item, index) => (
            <Dropdown key={index} title={item} options={getDropdownOptions(item)} />
          ))}
        </div>

        <div className="user-buttons-container">
          <div className="user-buttons">
            <button onClick={() => handleNavigation('login')}>Login</button>
          </div>
        </div>
      </header>

      <Sidebar />
      <MainContent />
    </div>
  );
};

const Dropdown = ({ title, options }) => {
  return (
    <div className="dropdown">
      <div className="select">
        <span className="selected">{title}</span>
        <div className="caret"></div>
      </div>
      <ul className="dropdown-menu">
        {options.map((option, index) => (
          <li key={index}>{option}</li>
        ))}
      </ul>
    </div>
  );
};

const Sidebar = () => {
  return (
    <section className="sidebar">
      <header>
        <a href="/" style={{ textDecoration: 'none' }}>DramaKu</a>
      </header>
      {["Japan", "Korea", "China"].map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </section>
  );
};

const MainContent = () => {
    const cards = [
        { src: movieOne }, { src: movieTwo }, { src: movieThree },
        { src: movieFour }, { src: movieFive }, { src: movieSix },
        { src: movieSeven }, { src: movieEight }
      ];

  return (
    <main className="main">
      <div className="card-container-result">
        {cards.map((card, index) => (
          <Card key={index} imgSrc={card.src} />
        ))}
      </div>
    </main>
  );
};

const Card = ({ imgSrc }) => {
  const handleCardClick = () => {
    window.location.href = 'detailPage';
  };
  return (
    <div className="card-search">
      <div className="card-search-content">
      <img src={imgSrc} onClick={handleCardClick} alt="movie" />
      <div className="card-search-info">
        <h3>Title of the drama that makes two lines</h3>
        <p>2024</p>
        <p>Genre 1, Genre 2, Genre 3</p>
        <p>Rate 3.5/5 19 views</p>
      </div>
      </div>
    </div>
  );
};

const getDropdownOptions = (title) => {
  switch (title) {
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
};

export default SearchResult;
