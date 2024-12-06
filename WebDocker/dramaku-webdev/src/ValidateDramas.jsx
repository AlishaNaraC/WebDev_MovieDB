import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import './index.css';
import HeaderCMS from './components/HeaderCMS';
import ModalCMS from './components/ModalCMS';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { Container, Row, Col, Table, Pagination } from 'react-bootstrap';


function ValidateDramas() {
  const [dramas, setDramas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDrama, setSelectedDrama] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch dramas from backend
  const fetchDramas = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/dramas/pending', {
        params: {
          page: currentPage,
          limit: itemsPerPage,
          filter: filter,
          search: searchQuery
        }
      });

      if (response.data && response.data.dramas) {
        setDramas(response.data.dramas);
        setTotalPages(Math.ceil(response.data.total / itemsPerPage));
      } else {
        console.error('Invalid response format:', response.data);
        alert('Failed to fetch dramas: Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching dramas:', error);
      alert('Failed to fetch dramas: ' + (error.response?.data?.error || error.message));
    }
  }, [currentPage, itemsPerPage, filter, searchQuery]); // Memoize based on dependencies

  useEffect(() => {
    fetchDramas();  // fetchDramas will now be stable
  }, [fetchDramas]);

  // Handle drama approval
  // const handleApproveDrama = async (dramaId) => {
  //   try {
  //     await axios.patch(`${process.env.REACT_APP_API_URL}/api/dramas/${dramaId}/approve`);
  //     alert('Drama approved successfully');
  //     fetchDramas(); 
  //   } catch (error) {
  //     alert('Failed to approve drama');
  //     console.error('Error approving drama:', error);
  //   }
  // };

  // Handle drama deletion
  const handleDeleteDrama = async (dramaId) => {
    if (window.confirm('Are you sure you want to delete this drama?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/dramas/${dramaId}`);
        alert('Drama deleted successfully');
        fetchDramas(); // Refresh the list
      } catch (error) {
        alert('Failed to delete drama');
        console.error('Error deleting drama:', error);
      }
    }
  };

  // Handle bulk actions
  const handleBulkAction = async (action) => {
    const selectedIds = dramas
      .filter(drama => drama.isSelected)
      .map(drama => drama.id);

    if (selectedIds.length === 0) {
      alert('Please select at least one drama');
      return;
    }

    try {
      if (action === 'approve') {
        await axios.patch(`${process.env.REACT_APP_API_URL}/api/dramas/bulk-approve`, {
          dramaIds: selectedIds
        });
        alert('Selected dramas approved successfully');
      } else if (action === 'delete') {
        if (window.confirm('Are you sure you want to delete the selected dramas?')) {
          await axios.delete(`${process.env.REACT_APP_API_URL}/api/dramas/bulk-delete`, {
            data: { dramaIds: selectedIds }
          });
          alert('Selected dramas deleted successfully');
        }
      }
      fetchDramas();
    } catch (error) {
      alert(`Failed to ${action} dramas`);
      console.error(`Error performing bulk ${action}:`, error);
    }
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Add these new handler functions
  const handleEditClick = (drama) => {
    setSelectedDrama(drama);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDrama(null);
  };

  // Add this function to handle status updates in the modal
  const handleStatusUpdate = async (dramaId, newStatus) => {
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}/api/dramas/${dramaId}/status`, {
        status: newStatus
      });
      fetchDramas();
      setShowModal(false);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Update the table body to include new functionality
  const renderTableBody = () => (
    <>
      {dramas.length === 0 ? (
        <tr>
          <td colSpan="7" className="text-center">No dramas found</td>
        </tr>
      ) : (
        dramas.map((drama) => (
          <tr key={drama.id}>
            <td>
              <input 
                type="checkbox" 
                checked={drama.isSelected || false}
                onChange={() => {
                  setDramas(dramas.map(d => 
                    d.id === drama.id ? {...d, isSelected: !d.isSelected} : d
                  ));
                }}
              />
            </td>
            <td>{drama.title}</td>
            <td>{drama.actors}</td>
            <td>{drama.genres}</td>
            <td>{drama.synopsis}</td>
            <td>
              <span className={`status-${drama.status.toLowerCase()}`}>
                {drama.status}
              </span>
            </td>
            <td>
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="custom-link2 me-2"
                onClick={() => handleEditClick(drama)}
              />
              <FontAwesomeIcon
                icon={faTrashCan}
                className="custom-link2"
                onClick={() => handleDeleteDrama(drama.id)}
              />
            </td>
          </tr>
        ))
      )}
    </>
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
            <div className='column-content'>
              <h1>Validate Drama</h1>
            </div>
            <div id="table-container" className="content-section">
              <Row>
                <Col className='md-3'>
                  <Dropdown onSelect={(value) => setFilter(value)}>
                    <label htmlFor="dropdownapprove-filter" className="btn-label me-2">Filtered by:</label>
                    <Dropdown.Toggle variant='secondary' id='dropdownapprove-filter'>
                      {filter === 'all' ? 'All' : 
                       filter === 'approved' ? 'Approved' : 'Unapproved'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="all">All</Dropdown.Item>
                      <Dropdown.Item eventKey="approved">Approved</Dropdown.Item>
                      <Dropdown.Item eventKey="unapproved">Unapproved</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col className='md-6'>
                  <Dropdown onSelect={(value) => setItemsPerPage(Number(value))}>
                    <label htmlFor="dropdownshows" className="btn-label me-2">Shows:</label>
                    <Dropdown.Toggle variant='secondary' id="dropdownshows">
                      {itemsPerPage}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="10">10</Dropdown.Item>
                      <Dropdown.Item eventKey="25">25</Dropdown.Item>
                      <Dropdown.Item eventKey="50">50</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col className='md-2'>
                  <div className="search-cms-container">
                    <input 
                      type="text" 
                      placeholder="Search Drama" 
                      value={searchQuery}
                      onChange={handleSearch}
                    />
                    <i className='bx bx-search'></i>
                  </div>
                </Col>
              </Row>

              <Table striped hover className='table' responsive="sm">
                <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">Drama</th>
                      <th scope="col" className="med-column">Actors</th>
                      <th scope="col" className="med-column">Genres</th>
                      <th scope="col" className="long-column">Synopsis</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody id="formApprove">
                    {renderTableBody()}
                  </tbody>
              </Table>
            </div>

            <Row>
              <Col className='md-4 act-comment'>
                <ButtonGroup>
                    <Button variant="primary" onClick={() => handleBulkAction('approve')}>
                      Approve Selected
                    </Button>
                    <Button variant="danger" onClick={() => handleBulkAction('delete')}>
                      Delete Selected
                    </Button>
                  </ButtonGroup>
              </Col>
              <Col className='md-4'>
                <Pagination className='justify-content-end'>
                  <Pagination.Prev 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  />
                  {[...Array(totalPages)].map((_, idx) => (
                    <Pagination.Item
                      key={idx + 1}
                      active={currentPage === idx + 1}
                      onClick={() => setCurrentPage(idx + 1)}
                    >
                      {idx + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </Col>
            </Row>
          </Col>
        </Row>
        {showModal && (
          <ModalCMS 
            show={showModal} 
            onHide={handleCloseModal} 
            drama={selectedDrama}
            onUpdate={fetchDramas}
            onStatusUpdate={handleStatusUpdate}
          />
        )}
      </Container>
    </div>
  );
}

export default ValidateDramas;