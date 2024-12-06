import React, { useState, useEffect } from 'react';
import { Container, Row, Col, HeaderCMS, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const DramaInput = () => {
  // Add states for database items
  const [genres, setGenres] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [dramaData, setDramaData] = useState({
    title: '',
    description: '',
    release_d: '', // Changed to match backend
    episodes: '',
    country: '', // Added country field
    status: '', // Added status field
    genres: [],
    rating: '', // Added rating field
    tviews: 0 // Added views field
  });

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [genresRes, countriesRes] = await Promise.all([
          axios.get('http://localhost:5000/genres'),
          axios.get('http://localhost:5000/countries')
        ]);
        
        setGenres(genresRes.data);
        setCountries(countriesRes.data);
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
    setDramaData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle genre selection
  const handleGenreChange = (e) => {
    const { value, checked } = e.target;
    setDramaData(prev => ({
      ...prev,
      genres: checked 
        ? [...prev.genres, value]
        : prev.genres.filter(genre => genre !== value)
    }));
  };

  // Modified submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // First, insert the drama
      const dramaResponse = await axios.post('http://localhost:5000/dramas', dramaData);
      
      if (dramaResponse.status === 201) {
        const dramaId = dramaResponse.data.drama_id;
        
        // Then, insert genre relationships
        await Promise.all(dramaData.genres.map(genreId => 
          axios.post('http://localhost:5000/genre-drama', {
            drama_id: dramaId,
            genre_id: genreId
          })
        ));

        alert('Drama added successfully!');
        // Reset form
        setDramaData({
          title: '',
          description: '',
          release_d: '',
          episodes: '',
          country: '',
          status: '',
          genres: [],
          rating: '',
          tviews: 0
        });
      }
    } catch (error) {
      console.error('Error adding drama:', error);
      alert('Failed to add drama. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container fluid className="p-0">
      <Row>
        <Col>
          <HeaderCMS />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={10} lg={8} className="viewport-cms">
          <div className="column-content text-center">
            <h1 className="mb-4">Input New Drama</h1>
          </div>
          
          <Form onSubmit={handleSubmit}>
            <div className="input-container mx-auto">
              <Form.Group className="mb-3">
                <Form.Label>Drama Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={dramaData.title}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={dramaData.description}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Release Year</Form.Label>
                <Form.Control
                  type="number"
                  name="release_d"
                  value={dramaData.release_d}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Number of Episodes</Form.Label>
                <Form.Control
                  type="number"
                  name="episodes"
                  value={dramaData.episodes}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Country</Form.Label>
                <Form.Select
                  name="country"
                  value={dramaData.country}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Country</option>
                  {countries.map(country => (
                    <option key={country.country_id} value={country.country_id}>
                      {country.country}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={dramaData.status}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Completed">Completed</option>
                  <option value="Ongoing">Ongoing</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  type="number"
                  name="rating"
                  value={dramaData.rating}
                  onChange={handleInputChange}
                  step="0.1"
                  min="0"
                  max="10"
                  required
                />
              </Form.Group>
            </div>

            {/* Genre section */}
            <div className="input-content-genre">
              <p className="text-center">Add Genre</p>
              <div className="genre-grid">
                <ul className="list-unstyled d-flex flex-wrap justify-content-center gap-3">
                  {genres.map((genre) => (
                    <li key={genre.genre_id}>
                      <input
                        type="checkbox"
                        id={`genre${genre.genre_id}`}
                        value={genre.genre_id}
                        onChange={handleGenreChange}
                        checked={dramaData.genres.includes(genre.genre_id)}
                      />
                      <label htmlFor={`genre${genre.genre_id}`}>{genre.genres}</label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="user-buttons text-center mt-4 mb-5">
              <Button variant="primary" type="submit">Submit</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default DramaInput;
