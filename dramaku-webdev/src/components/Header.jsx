import React, { useState, useEffect } from 'react';
import '../index.css';
import { jwtDecode } from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import {Nav, NavDropdown} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState({username: ''});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Dropdown options with plural keys
  const [dropdownOptions, setDropdownOptions] = useState({
    countries: [],
    years: [],
    genres: [],
    status: [],
    availability: [],
    awards: []
  });

  // Selected filters with singular keys
  const [filters, setFilters] = useState({
    country: '',
    year: '',
    genre: '',
    status: '',
    availability: '',
    award: '',
    sortedBy: ''
  });

  const [dropdownOpen, setDropdownOpen] = useState({
    country: false,
    year: false,
    genre: false,
    status: false,
    availability: false,
    award: false,
    sortedBy: false
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        // Fetch countries
        const countriesRes = await fetch('http://localhost:5000/countries');
        const countriesData = await countriesRes.json();
        setDropdownOptions(prevState => ({
          ...prevState,
          countries: countriesData.map(item => item.country)
        }));

        // Fetch years
        const yearsRes = await fetch('http://localhost:5000/filters/years');
        const yearsData = await yearsRes.json();
        setDropdownOptions(prevState => ({
          ...prevState,
          years: yearsData.map(item => item.release_d)
        }));

        // Fetch genres
        const genresRes = await fetch('http://localhost:5000/genres');
        const genresData = await genresRes.json();
        setDropdownOptions(prevState => ({
          ...prevState,
          genres: genresData.map(item => item.genres)
        }));

        // Fetch status
        const statusRes = await fetch('http://localhost:5000/filters/status');
        const statusData = await statusRes.json();
        setDropdownOptions(prevState => ({
          ...prevState,
          status: statusData.map(item => item.status)
        }));

        // Fetch availability
        const availabilityRes = await fetch('http://localhost:5000/filters/availability');
        const availabilityData = await availabilityRes.json();
        setDropdownOptions(prevState => ({
          ...prevState,
          availability: availabilityData.map(item => item.availability)
        }));

        // Fetch awards
        const awardsRes = await fetch('http://localhost:5000/awards');
        const awardsData = await awardsRes.json();
        setDropdownOptions(prevState => ({
          ...prevState,
          awards: awardsData.map(item => item.award)
        }));
      } catch (err) {
        console.error('Error fetching dropdown options:', err);
      }
    };

    fetchOptions();
  }, []);

  const buildQueryParams = () => {
    const params = new URLSearchParams();

    // Append the search term only if present
    if (searchTerm) {
      params.append('query', searchTerm);
    }

    // Append filters only if they are selected
    Object.keys(filters).forEach((filterKey) => {
      if (filters[filterKey]) {
        params.append(filterKey, filters[filterKey]);
      }
    });

    return params;
  };

  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (token) {
      try {
        const decodedToken = jwtDecode(token.split('=')[1]);
        setUser(decodedToken);
        const fetchUserDetail = async () => {
          try {
              const response = await fetch(`http://localhost:5000/users/${decodedToken.username}`, {
                  method: 'GET',
                  headers: {
                      'Authorization': `Bearer ${token.split('=')[1]}`,
                      'Content-Type': 'application/json',
                  },
              });

              if (response.ok) {
                  const data = await response.json();
                  setUser(prevUser => ({ 
                      ...prevUser, 
                      email: data.email 
                  }));
              } else {
                  console.error('Failed to fetch user email');
              }
          } catch (error) {
              console.error('Error fetching user email:', error);
          }
        };
        fetchUserDetail();
      } catch (err) {
        console.error('Error decoding token:', err);
      }
    }
  }, []);

  const handleLogout = async () => {
    setIsLoading(true);
    setTimeout(() => {
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setUser('');
      setIsLoading(false);
      navigate('/');
    }, 1500); // 1.5-second delay
  };  

  // Function to handle search (with or without filters)
  const handleSearchClick = () => {
    const query = buildQueryParams();
    // Redirect to the search page with the constructed query string
    window.location.href = `/search?${query.toString()}`;
  };

  // Function to handle filter-specific behavior
  const handleFilterClick = () => {
    const query = new URLSearchParams();

    // Append filters only if they are selected
    Object.keys(filters).forEach((filterKey) => {
      if (filters[filterKey]) {
        query.append(filterKey, filters[filterKey]);
      }
    });

    // Redirect to the search page with the constructed filter query string
    window.location.href = `/search?${query.toString()}`;
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

  const handleLoginClick = () => {
    window.location.href = '/login';
  };

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  // Toggle dropdown visibility
  const toggleDropdown = (category) => {
    setDropdownOpen(prevState => ({
      ...prevState,
      [category]: !prevState[category]
    }));
  };

  const getSelectedLabel = (category) => {
    const filterValue = filters[category];
    return filterValue || category.charAt(0).toUpperCase() + category.slice(1);
  };

  const getDropdownOptions = (category) => {
    const keyMap = {
      country: 'countries',
      year: 'years',
      genre: 'genres',
      status: 'status',
      availability: 'availability',
      award: 'awards'
    };
    if (category === 'sortedBy') {
      return ['Alphabet', 'Rating', 'Year', 'Views'];
    }
    return dropdownOptions[keyMap[category]] || [];
  };

  const handleFilterSelect = (category, option) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [category]: option
    }));
    setDropdownOpen(prevState => ({
      ...prevState,
      [category]: false // Close the dropdown after selecting an option
    }));
  };

  return (
    <header className="header">
      <div className="logo-container">
        <h1 onClick={handleLogoClick} className="logo">
          <b>DramaKu</b>
        </h1>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Dramas"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="search-input"
        />
        <i className="bx bx-search search-icon" onClick={handleSearchClick}></i>
      </div>

      <div className="dropdown-container">
        <p className="filter-label">Filtered by: </p>
        {['country', 'year', 'genre', 'status', 'availability', 'award', 'sortedBy'].map((category, index) => (
          <div
            className="dropdown"
            key={index}
            onMouseEnter={() => toggleDropdown(category)}
            onMouseLeave={() => toggleDropdown(category)}
          >
            <div className="select">
              <span className="selected">{getSelectedLabel(category)}</span>
              <div className="caret"></div>
            </div>
            {dropdownOpen[category] && (
              <ul className="dropdown-menu">
                {getDropdownOptions(category).map((option, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleFilterSelect(category, option)}
                    className="dropdown-item"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="filter-button-container">
        <button onClick={handleFilterClick} className="filter-button">
          <b>Apply Filters</b>
        </button>
      </div>

      <div className="user-buttons-container">
        <div className="user-buttons">
          {user ? (
              <span className="username-display">
                <FontAwesomeIcon icon={faCircleUser} style={{ fontSize: "25px" }}/>
                <Nav>
                    <NavDropdown
                      id="nav-dropdown-light"
                      title={<span className="dropdown-title">{user.username}</span>}
                      menuVariant="light"
                    >
                    <NavDropdown.Item>{user.email}</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <Nav.Link onClick={handleLogout}>
                      {isLoading ? (
                        <span>Loading...</span> // Display loading text
                      ) : (
                        <b>Logout</b>
                      )}
                    </Nav.Link>
                  </NavDropdown>
                </Nav>
              </span>
            ) : (
              <button onClick={handleLoginClick} className="login-button">
                <b>Login</b>
              </button>
            )}
        </div>
      </div>
    </header>
  );
}

export default Header;
