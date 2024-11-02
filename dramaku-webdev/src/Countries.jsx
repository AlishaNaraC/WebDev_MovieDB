import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import HeaderCMS from './components/HeaderCMS';
import { Container, Row, Col, Form, Button, Table, Pagination, Modal } from 'react-bootstrap';

function Countries() {
  const [countries, setCountries] = useState([]);
  const [newCountry, setNewCountry] = useState('');
  const [editingCountry, setEditingCountry] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [countryToDelete, setCountryToDelete] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexLastItem = currentPage * itemsPerPage;
  const indexFirstItem = indexLastItem - itemsPerPage;
  const currentCountries = countries.slice(indexFirstItem, indexLastItem);
  const totalPages = Math.ceil(countries.length/itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch('http://localhost:5000/countries');
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (countries.some(country => country.country === newCountry)) {
      alert('This country already exists. Please enter a different country.'); // You can replace this with a more user-friendly modal or toast notification
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/countries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country: newCountry }),
      });
      if (response.ok) {
        const newCountryData = await response.json();
        setCountries(prevCountries => [...prevCountries, newCountryData]);
        setNewCountry('');
        setSubmitSuccess(true);
      }
    } catch (error) {
      console.error('Error adding country:', error);
    }
  };

  const handleClose = () => setSubmitSuccess(false);

  const handleEdit = (country) => {
    setEditingCountry({ ...country });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/countries/${editingCountry.country_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country: editingCountry.country }),
      });
      if (response.ok) {
        const updatedCountry = await response.json();
        setCountries(prevCountries => 
          prevCountries.map(country => 
            country.country_id === updatedCountry.country_id ? updatedCountry : country
          )
        );
        setEditingCountry(null);
      }
    } catch (error) {
      console.error('Error updating country:', error);
    }
  };

  const handleDeleteClick = (country) => {
    setCountryToDelete(country);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(`http://localhost:5000/countries/${countryToDelete.country_id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setCountries(prevCountries => prevCountries.filter(country => country.country_id !== countryToDelete.country_id));
        setShowDeleteModal(false);
        setCountryToDelete(null);
      }
    } catch (error) {
      console.error('Error deleting country:', error);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setCountryToDelete(null);
  };

  const filteredCountries = currentCountries.filter(country =>
    country.country.toLowerCase().includes(searchTerm.toLowerCase())
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
              <h1>Countries</h1>
            </div>
            <div id="table-container" className="content-section">
              <div id="forms-submit">
                <Form onSubmit={handleSubmit}>
                  <Row className="align-items-center">
                    <Col sm={1}>
                      <Form.Label htmlFor="inlineFormInput" id="input-data-forms">Country</Form.Label>
                    </Col>
                    <Col sm="auto">
                      <Form.Control
                        type='text'
                        id="input-data-forms"
                        placeholder='country'
                        value={newCountry}
                        onChange={(e) => setNewCountry(e.target.value)}
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
                  placeholder="Search Country"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className='bx bx-search'></i>
              </div>

              <Table striped hover className='table w-100' responsive="sm">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Countries</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCountries.map((country, index) => (
                    <tr key={country.country_id} className="table-light">
                      <th scope="row">{index + 1 + (currentPage - 1) * itemsPerPage}</th>
                      <td>
                        {editingCountry && editingCountry.country_id === country.country_id ? (
                          <input
                            type="text"
                            value={editingCountry.country}
                            onChange={(e) => setEditingCountry({...editingCountry, country: e.target.value})}
                          />
                        ) : (
                          country.country
                        )}
                      </td>
                      <td>
                        {editingCountry && editingCountry.country_id === country.country_id ? (
                          <>
                            <Button variant="primary" onClick={handleUpdate}>Save</Button>
                            <Button variant="secondary" onClick={() => setEditingCountry(null)} className="ms-2">Cancel</Button>
                          </>
                        ) : (
                          <>
                            <FontAwesomeIcon 
                              icon={faPenToSquare} 
                              className="custom-link2" 
                              onClick={() => handleEdit(country)} 
                            /> | 
                            <FontAwesomeIcon 
                              icon={faTrashCan} 
                              className="custom-link2" 
                              onClick={() => handleDeleteClick(country)}
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
          Are you sure you want to delete the country: {countryToDelete?.country}?
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

export default Countries;