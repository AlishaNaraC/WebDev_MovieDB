import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Table, Pagination, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import HeaderCMS from './components/HeaderCMS';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';

// Add this new component at the top of your file
const AutoResizingTextarea = ({ value, onChange, minWidth = 100 }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to get the correct scrollHeight
      textareaRef.current.style.height = 'auto';
      
      // Set new height based on scrollHeight
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scrollHeight}px`;
      
      // Check if content width exceeds viewport
      const contentWidth = textareaRef.current.scrollWidth;
      const viewportWidth = textareaRef.current.offsetWidth;
      
      if (contentWidth > viewportWidth) {
        textareaRef.current.style.height = `${scrollHeight + 24}px`; // Add extra height for new line
      }
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      style={{
        minWidth: `${minWidth}px`,
        width: '100%',
        resize: 'none',
        overflow: 'hidden',
        padding: '4px 8px',
        border: '1px solid #ced4da',
        borderRadius: '4px',
        fontSize: 'inherit',
        lineHeight: '1.5',
        transition: 'height 0.2s ease-in-out'
      }}
      className="form-control"
    />
  );
};

function Awards() {
  const [awards, setAwards] = useState([]);
  const [newAward, setNewAward] = useState('');
  const [editingAward, setEditingAward] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [awardToDelete, setAwardToDelete] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexLastItem = currentPage * itemsPerPage;
  const indexFirstItem = indexLastItem - itemsPerPage;
  const currentAwards = awards.slice(indexFirstItem, indexLastItem);
  const totalPages = Math.ceil(awards.length/itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchAwards();
  }, []);

  const fetchAwards = async () => {
    try {
      const response = await fetch('http://localhost:5000/awards');
      if (!response.ok) {
        throw new Error('Failed to fetch awards');
      }
      const data = await response.json();
      console.log('Fetched awards:', data); // Debug log
      setAwards(data);
    } catch (error) {
      console.error('Error fetching awards:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (awards.some(award => award.award === newAward)) {
      alert('This award already exists. Please enter a different award.'); // You can replace this with a more user-friendly modal or toast notification
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/awards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ awards: newAward.trim() }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to add award');
      }

      const newAwardData = await response.json();
      setAwards(prevAwards => [...prevAwards, newAwardData]);
      setNewAward('');
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error adding award:', error);
      alert(error.message);
    }
  };

  const handleClose = () => setSubmitSuccess(false);

  const handleEdit = (award) => {
    setEditingAward({
      ...award,
      award: award.award // Make sure we're using the correct property name
    });
  };

  const handleUpdate = async () => {
    try {
      if (!editingAward.award || editingAward.award.trim() === '') {
        alert('Award name cannot be empty');
        return;
      }

      const response = await fetch(`http://localhost:5000/awards/${editingAward.award_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ awards: editingAward.award }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update award');
      }

      const updatedAward = await response.json();
      setAwards(prevAwards => 
        prevAwards.map(award => 
          award.award_id === updatedAward.award_id ? updatedAward : award
        )
      );
      setEditingAward(null);
    } catch (error) {
      console.error('Error updating award:', error);
      alert(error.message);
    }
  };

  const handleDeleteClick = (award) => {
    setAwardToDelete(award);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(`http://localhost:5000/awards/${awardToDelete.award_id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setAwards(prevAwards => prevAwards.filter(award => award.award_id !== awardToDelete.award_id));
        setShowDeleteModal(false);
        setAwardToDelete(null);
      }
    } catch (error) {
      console.error('Error deleting award:', error);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setAwardToDelete(null);
  };

  const filteredAwards = currentAwards.filter(award =>
    award && award.award ? award.award.toLowerCase().includes(searchTerm.toLowerCase()) : false
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
              <h1>Awards</h1>
            </div>
            <div id="table-container" className="content-section">
              <div id="forms-submit">
                <Form onSubmit={handleSubmit}>
                  <Row className="align-items-center">
                    <Col sm={1}>
                      <Form.Label htmlFor="inlineFormInput" id="input-data-forms">Award</Form.Label>
                    </Col>
                    <Col sm="auto">
                      <Form.Control
                        type='text'
                        id="input-data-forms"
                        placeholder='award'
                        value={newAward}
                        onChange={(e) => setNewAward(e.target.value)}
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
                  placeholder="Search Award"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className='bx bx-search'></i>
              </div>

              <Table striped hover className='table w-100' responsive="sm">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: '5%' }}></th>
                    <th scope="col" style={{ width: '75%', textAlign: 'left' }}>Awards</th>
                    <th scope="col" style={{ width: '20%' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAwards.map((award, index) => (
                    <tr key={award.award_id} className="table-light">
                      <th scope="row">{index + 1 + (currentPage - 1) * itemsPerPage}</th>
                      <td style={{ 
                        maxWidth: '60%', 
                        textAlign: 'left', 
                        verticalAlign: 'middle' 
                      }}>
                        {editingAward && editingAward.award_id === award.award_id ? (
                          <AutoResizingTextarea
                            value={editingAward.award}
                            onChange={(e) => setEditingAward({...editingAward, award: e.target.value})}
                          />
                        ) : (
                          <div style={{ 
                            wordWrap: 'break-word',
                            whiteSpace: 'pre-wrap',
                            textAlign: 'left',
                            padding: '6px 0'
                          }}>
                            {award.award}
                          </div>
                        )}
                      </td>
                      <td>
                        {editingAward && editingAward.award_id === award.award_id ? (
                          <>
                            <Button variant="primary" onClick={handleUpdate}>Save</Button>
                            <Button variant="secondary" onClick={() => setEditingAward(null)} className="ms-2">Cancel</Button>
                          </>
                        ) : (
                          <>
                            <FontAwesomeIcon 
                              icon={faPenToSquare} 
                              className="custom-link2" 
                              onClick={() => handleEdit(award)} 
                            /> | 
                            <FontAwesomeIcon 
                              icon={faTrashCan} 
                              className="custom-link2" 
                              onClick={() => handleDeleteClick(award)}
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

      <Modal show={showDeleteModal} onHide={handleDeleteCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the award: {awardToDelete?.award}?
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

export default Awards;