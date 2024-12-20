import React, { useState, useEffect } from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import HeaderCMS from './components/HeaderCMS';
import { Container, Row, Col, Form, Button, Table, Pagination, Modal } from 'react-bootstrap';

function Genres() {
  const [genres, setGenres] = useState([]);
  const [newGenre, setNewGenre] = useState('');
  const [editingGenre, setEditingGenre] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [genreToDelete, setGenreToDelete] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexLastItem = currentPage * itemsPerPage;
  const indexFirstItem = indexLastItem - itemsPerPage;
  const currentGenres = genres.slice(indexFirstItem, indexLastItem);
  const totalPages = Math.ceil(genres.length/itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await fetch('http://localhost:5000/genres');
      const data = await response.json();
      setGenres(data);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (genres.some(genre => genre.genres === newGenre)) {
      alert('This genre already exists. Please enter a different genre.'); // You can replace this with a more user-friendly modal or toast notification
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/genres', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ genres: newGenre }),
      });
      if (response.ok) {
        const newGenreData = await response.json();
        setGenres(prevGenres => [...prevGenres, newGenreData]);
        setNewGenre('');
        setSubmitSuccess(true);
      }
    } catch (error) {
      console.error('Error adding genre:', error);
    }
  };

  const handleClose = () => setSubmitSuccess(false);

  const handleEdit = (genre) => {
    setEditingGenre({ ...genre });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/genres/${editingGenre.genre_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ genres: editingGenre.genres }),
      });
      if (response.ok) {
        const updatedGenre = await response.json();
        setGenres(prevGenres => 
          prevGenres.map(genre => 
            genre.genre_id === updatedGenre.genre_id ? updatedGenre : genre
          )
        );
        setEditingGenre(null);
      }
    } catch (error) {
      console.error('Error updating genre:', error);
    }
  };

  const handleDeleteClick = (genre) => {
    setGenreToDelete(genre);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(`http://localhost:5000/genres/${genreToDelete.genre_id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setGenres(prevGenres => prevGenres.filter(genre => genre.genre_id !== genreToDelete.genre_id));
        setShowDeleteModal(false);
        setGenreToDelete(null);
      }
    } catch (error) {
      console.error('Error deleting genre:', error);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setGenreToDelete(null);
  };

  const filteredGenres = currentGenres.filter(genre =>
    genre.genres.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Container fluid>
        <Row>
          <Col md={12}>
            <HeaderCMS/>
          </Col>
        </Row>

        <Row>
          <Col md={12} className='viewport-cms'>
            <div className="column-content">
              <h1>Genres</h1>
            </div>
            <div id="table-container" className="content-section">
              <div id="forms-submit">
                <Form onSubmit={handleSubmit}>
                  <Row className="align-items-center">
                    <Col sm={1}>
                      <Form.Label htmlFor="inlineFormInput" id="input-data-forms">Genre</Form.Label>
                    </Col>
                    <Col sm="auto">
                      <Form.Control
                        type='text'
                        id="input-data-forms"
                        placeholder='genre'
                        value={newGenre}
                        onChange={(e) => setNewGenre(e.target.value)}
                      />
                    </Col>
                    <Col xs="auto">
                      <Button variant='secondary' type='submit'>Submit</Button>
                    </Col>
                  </Row>
                </Form>
              </div>

              <div className="search-cms-container">
                <input
                  type="text"
                  placeholder="Search Genre"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className='bx bx-search'></i>
              </div>

              <Table striped hover className='table w-100' responsive="sm">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Genres</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGenres.map((genre, index) => (
                    <tr key={genre.genre_id} className="table-light">
                      <th scope="row">{index + 1 + (currentPage - 1) * itemsPerPage}</th>
                      <td>
                        {editingGenre && editingGenre.genre_id === genre.genre_id ? (
                          <input
                            type="text"
                            value={editingGenre.genres}
                            onChange={(e) => setEditingGenre({...editingGenre, genres: e.target.value})}
                          />
                        ) : (
                          genre.genres
                        )}
                      </td>
                      <td>
                        {editingGenre && editingGenre.genre_id === genre.genre_id ? (
                          <>
                            <Button variant="primary" onClick={handleUpdate}>Save</Button>
                            <Button variant="secondary" onClick={() => setEditingGenre(null)} className="ms-2">Cancel</Button>
                          </>
                        ) : (
                          <>
                            <FontAwesomeIcon 
                              icon={faPenToSquare} 
                              className="custom-link2" 
                              onClick={() => handleEdit(genre)} 
                            /> | 
                            <FontAwesomeIcon 
                              icon={faTrashCan} 
                              className="custom-link2" 
                              onClick={() => handleDeleteClick(genre)}
                            />
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            <Pagination className='justify-content-end'>
              <Pagination.Prev 
                  onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />
                {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                      key={index + 1}
                      active={index + 1 === currentPage}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
              />
            </Pagination>

          </Col>
        </Row>
      </Container>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleDeleteCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the genre: {genreToDelete?.genres}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
          <Button variant="secondary" onClick={handleDeleteCancel}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={submitSuccess} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your submit was completed successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Genres;