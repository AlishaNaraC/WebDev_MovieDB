import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import HeaderCMS from './components/HeaderCMS';
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from 'axios';

const DramaInput = () => {
  // Add these new states
  // const [showYearSuggestions, setShowYearSuggestions] = useState(false);
  // const [showCountrySuggestions, setShowCountrySuggestions] = useState(false);
  // const [showAvailSuggestions, setShowAvailSuggestions] = useState(false);
  // const [yearInput, setYearInput] = useState('');
  // const [countryInput, setCountryInput] = useState('');
  // const [availInput, setAvailInput] = useState('');

  // States for all form data
  const [formData, setFormData] = useState({
    title: '',
    altTitle: '',
    release_d: '',
    country: '',
    synopsis: '',
    availability: [],
    genres: [],
    actors: [],
    trailer: '',
    awards: []
  });

  // States for dropdown data from backend
  const [years, setYears] = useState([]);
  const [countries, setCountries] = useState([]);
  const [genres, setGenres] = useState([]);
  const [availabilities, setAvailabilities] = useState([]);
  const [awards, setAwards] = useState([]);
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actorSearch, setActorSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [actorsPerPage] = useState(12); // Show 12 actors per page

  // Fetch all necessary data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [yearsRes, countriesRes, genresRes, availRes, awardsRes, actorsRes] = await Promise.all([
          axios.get('http://localhost:5000/filters/years'),
          axios.get('http://localhost:5000/countries'),
          axios.get('http://localhost:5000/genres'),
          axios.get('http://localhost:5000/filters/availability'),
          axios.get('http://localhost:5000/awards'),
          axios.get('http://localhost:5000/actors') // You'll need to add this endpoint
        ]);

        setYears(yearsRes.data);
        setCountries(countriesRes.data);
        setGenres(genresRes.data);
        setAvailabilities(availRes.data);
        setAwards(awardsRes.data);
        setActors(actorsRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle genre selection
  const handleGenreChange = (genreId) => {
    setFormData(prev => ({
      ...prev,
      genres: prev.genres.includes(genreId)
        ? prev.genres.filter(id => id !== genreId)
        : [...prev.genres, genreId]
    }));
  };

  // Handle actor selection
  const handleActorSelect = (actorId) => {
    if (formData.actors.length >= 9 && !formData.actors.includes(actorId)) {
      alert('Maximum 9 actors allowed');
      return;
    }

    setFormData(prev => ({
      ...prev,
      actors: prev.actors.includes(actorId)
        ? prev.actors.filter(id => id !== actorId)
        : [...prev.actors, actorId]
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/movies', formData);
      if (response.status === 201) {
        alert('Drama added successfully!');
        // Reset form
        setFormData({
          title: '',
          altTitle: '',
          release_d: '',
          country: '',
          synopsis: '',
          availability: [],
          genres: [],
          actors: [],
          trailer: '',
          awards: []
        });
      }
    } catch (error) {
      console.error('Error submitting drama:', error);
      alert('Failed to add drama');
    }
  };

  // Add this pagination calculation function
  const paginate = (items, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row>
        <Col>
          <HeaderCMS/>
        </Col>
      </Row>
      <Row>
        <Col className='viewport-cms'>
          <div className="column-content">
            <h1>Input New Drama</h1>
          </div>
          <div className="col-md-8 column-content">
            <form onSubmit={handleSubmit} className="input-container">
              {/* Title and Alt Title */}
              <div className="input-content">
                <div className="input-content-input">
                  <p>Title</p>
                  <input 
                    type="text" 
                    name="title" 
                    value={formData.title}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="input-content-input">
                  <p>Alternative Title</p>
                  <input 
                    type="text" 
                    name="altTitle"
                    value={formData.altTitle}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Year and Country */}
              <div className="input-content-2">
                <div className="dropdown">
                  <select 
                    name="release_d"
                    value={formData.release_d}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Year</option>
                    {years.map(year => (
                      <option key={year.release_d} value={year.release_d}>
                        {year.release_d}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-content-input">
                  <p>Country</p>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Country</option>
                    {countries.map(country => (
                      <option key={country.country_id} value={country.country_id}>
                        {country.country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Synopsis */}
              <div className="input-content">
                <div className="input-content-input">
                  <p>Synopsis</p>
                  <textarea 
                    name="synopsis"
                    value={formData.synopsis}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
              </div>

              {/* Availability */}
              <div className="input-content">
                <div className="input-content-input">
                  <p>Availability</p>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Availability</option>
                    {availabilities.map(avail => (
                      <option key={avail.avail_id} value={avail.avail_id}>
                        {avail.availability}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Genres */}
              <div className="input-content-genre">
                <p>Add Genre</p>
                <ul className="d-flex flex-wrap justify-content-center gap-3">
                  {genres.map(genre => (
                    <li key={genre.genre_id}>
                      <input
                        type="checkbox"
                        id={`genre${genre.genre_id}`}
                        checked={formData.genres.includes(genre.genre_id)}
                        onChange={() => handleGenreChange(genre.genre_id)}
                      />
                      <label htmlFor={`genre${genre.genre_id}`}>{genre.genres}</label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actors */}
              <div className="input-content">
                <div className="input-actor">
                  <p>Add Actors (Up to 9)</p>
                  <div className="search-container position-relative mb-3">
                    <input 
                      type="text" 
                      placeholder="Search Actor Names"
                      value={actorSearch}
                      onChange={(e) => {
                        setActorSearch(e.target.value);
                        setCurrentPage(1); // Reset to first page when searching
                      }}
                    />
                    <i className="bx bx-search"></i>
                  </div>

                  <div className="input-actor-card-container">
                    {paginate(
                      actors.filter(actor => 
                        actor.actor_name.toLowerCase().includes(actorSearch.toLowerCase())
                      ),
                      currentPage,
                      actorsPerPage
                    ).map(actor => (
                      <div 
                        key={actor.actor_id}
                        className={`input-actor-card ${
                          formData.actors.includes(actor.actor_id) ? 'selected' : ''
                        }`}
                        onClick={() => handleActorSelect(actor.actor_id)}
                      >
                        <img src={actor.actor_poster} alt={actor.actor_name} />
                        <p>{actor.actor_name}</p>
                      </div>
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  <div className="pagination-controls d-flex justify-content-center gap-2 mt-3">
                    <button 
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      <i className="bx bx-chevron-left"></i>
                    </button>
                    
                    {[...Array(Math.ceil(
                      actors.filter(actor => 
                        actor.actor_name.toLowerCase().includes(actorSearch.toLowerCase())
                      ).length / actorsPerPage
                    ))].map((_, index) => (
                      <button
                        key={index + 1}
                        className={`btn btn-sm ${
                          currentPage === index + 1 ? 'btn-primary' : 'btn-outline-secondary'
                        }`}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}
                    
                    <button 
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => setCurrentPage(prev => 
                        Math.min(
                          prev + 1, 
                          Math.ceil(
                            actors.filter(actor => 
                              actor.actor_name.toLowerCase().includes(actorSearch.toLowerCase())
                            ).length / actorsPerPage
                          )
                        )
                      )}
                      disabled={currentPage === Math.ceil(
                        actors.filter(actor => 
                          actor.actor_name.toLowerCase().includes(actorSearch.toLowerCase())
                        ).length / actorsPerPage
                      )}
                    >
                      <i className="bx bx-chevron-right"></i>
                    </button>
                  </div>
                </div>
              </div>

              {/* Trailer and Awards */}
              <div className="input-content">
                <div className="input-content-input">
                  <p>Link Trailer</p>
                  <input 
                    type="text" 
                    name="trailer"
                    value={formData.trailer}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="input-content-input">
                  <p>Award</p>
                  <select
                    name="awards"
                    value={formData.awards}
                    onChange={handleInputChange}
                    multiple
                  >
                    {awards.map(award => (
                      <option key={award.award_id} value={award.award_id}>
                        {award.award}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="user-buttons">
                <Button variant='secondary' type='submit'>Submit</Button>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DramaInput;
