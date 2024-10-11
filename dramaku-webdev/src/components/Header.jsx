import React, {useState} from 'react';
import '../index.css';


function Header() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchClick = () => {
    if (searchTerm) {
      window.location.href = `/search?query=${searchTerm}`;
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

  const handleLoginClick = () => {
    window.location.href = 'login';
  };

  const handleLogoClick = () => {
    window.location.href = '/';
  }
      
return (
  <header className="header">
      <div className="logo-container">
        <h1 onClick={handleLogoClick} style={{ textDecoration: 'none' }} ><b>DramaKu</b></h1>
      </div>
      <div className="search-container">
        <input type="text" placeholder="Search Dramas" value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}/>
        <i className='bx bx-search' onClick={handleSearchClick}></i>
      </div>

      <div className="dropdown-container">
        <p style={{color: 'white', paddingRight:'10px'}}>Filtered by: </p>
        {['Country', 'Year', 'Genre', 'Status', 'Availability', 'Award', 'Sorted By'].map((category, index) => (
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
          <button onClick={handleLoginClick}><b>Login</b></button>
        </div>
      </div>
    </header>
  );
}

export default Header;

function getDropdownOptions(category) {
    switch (category) {
      case 'Country':
        return ['Japan', 'Korea', 'China'];
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

