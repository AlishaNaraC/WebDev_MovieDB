import React, { useEffect, useState } from 'react';
import './script.js';
import './index.css';
import HeaderCMS from './components/HeaderCMS';
import { Button, ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { Container, Row, Col, Table, Pagination, Modal } from 'react-bootstrap';

function Comments() {
  const [reviews, setReviews] = useState([]);
  const [, setSelectedReviews] = useState("None"); //for filter below
  const [checkedItems, setCheckedItems] = useState({});   //for filter below
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [, setCommentToDelete] = useState(null);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [, setCommentToApprove] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexLastItem = currentPage * itemsPerPage;
  const indexFirstItem = indexLastItem - itemsPerPage;
  const currentReview = reviews.slice(indexFirstItem, indexLastItem);
  const totalPages = Math.ceil(reviews.length/itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getReviews = async () => {
      try {
        const response = await fetch(`http://localhost:5000/reviews`);
        const jsonData = await response.json();
        setReviews(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };

  useEffect(() => {
    getReviews();
  }, []);

  const handleDeleteClick = (review) => {
    setCommentToDelete(review);
    setShowDeleteModal(true);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setCommentToDelete(null);
  };

  const delReview = async () => {
    const idsToDelete = Object.keys(checkedItems).filter(
      (comment_id) => checkedItems[comment_id]
    );

    try {
      for (const id of idsToDelete) {
        const response = await fetch(`http://localhost:5000/reviews/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setReviews((prevReviews) =>
            prevReviews.filter((review) => !idsToDelete.includes(review.comment_id))
          );
          setCheckedItems({});
          setShowDeleteModal(false);
          setCommentToDelete(null);
          getReviews();
        }
      };
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleApproveClick = (review) => {
    setCommentToApprove(review);
    setShowApproveModal(true);
  };

  const handleApproveCancel = () => {
    setShowApproveModal(false);
    setCommentToApprove(null);
  };

  const updateApproval = async () => {
    const idsToApprove = Object.keys(checkedItems).filter(
      (comment_id) => checkedItems[comment_id]
    );

    try {
      for (const id of idsToApprove) {
            const response = await fetch(`http://localhost:5000/reviews/${id}/approve`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ approval: "Approved" })
            });

            if (!response.ok) {
                throw new Error("Failed to update approval status");
            }
        }

        setReviews(prevReviews =>
          prevReviews.map(review =>
              idsToApprove.includes(review.comment_id)
                  ? { ...review, approval: "Approved" }
                  : review
          )
        );
        setCheckedItems({});
        setShowApproveModal(false);
        setCommentToApprove(null);
        getReviews();
    } catch (error) {
      console.error("Error changing approval status:", error);
    }
  };

  const handleDropdownSelect = (filter) => {
    setSelectedReviews(filter);
    updateCheckboxes(filter);
  };
  
  const updateCheckboxes = (filter) => {
    const newCheckedItems = {};
    
    reviews.forEach((review) => {
      if (filter === "All") {
        newCheckedItems[review.comment_id] = true;
      } else if (filter === "Unapproved" && review.approval === "Unapproved") {
        newCheckedItems[review.comment_id] = true;
      } else if (filter === "Approved" && review.approval === "Approved") {
        newCheckedItems[review.comment_id] = true;
      } else{
        newCheckedItems[review.comment_id] = false;
      }
    });
    setCheckedItems(newCheckedItems);
  };

  const handleCheckboxChange = (comment_id) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [comment_id]: !prevCheckedItems[comment_id],
    }));
  };

  const filteredComments = currentReview.filter(comment =>
    comment.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

    return (
      <>
          <Container fluid>
            <Row>
              <Col md={12}>
                <HeaderCMS/>
              </Col>
            </Row>

            <Row>
              <Col md={12} className='viewport-cms'>
                <div className='column-content'>
                  <h1>Comments</h1>
                </div>
                <div id="table-container" className="content-section">
                  <Row>
                    <Col className='md-2 justify-content-end'>
                      <div className="search-cms-container">
                          <input 
                            type="text" 
                            placeholder="Search Drama"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} />
                          <i className='bx bx-search'></i>
                      </div>
                    </Col>
                  </Row>

                  <Table striped hover className='table' responsive="sm">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Username</th>
                        <th scope="col">Rate</th>
                        <th scope="col">Drama</th>
                        <th scope="col">Comment</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody id="formApprove">
                      {filteredComments.map((review) => (
                        <tr key={review.comment_id} className="table-light">
                          <th scope="row">
                            <input 
                              type="checkbox" 
                              name="check" 
                              checked={!!checkedItems[review.comment_id]}
                              onChange={() => handleCheckboxChange(review.comment_id)}
                            />
                          </th>
                            <td>{review.username}</td>
                            <td>{review.rate}</td>
                            <td>{review.title}</td>
                            <td>{review.comment}</td>
                            <td>{review.approval}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>

                <Row>
                  <Col className='md-4 act-comment'>
                    <ButtonGroup>
                        <DropdownButton 
                          as={ButtonGroup} 
                          title="Select" 
                          id="bg-nested-dropdown" 
                          variant="outline-secondary"
                          onSelect={handleDropdownSelect}
                        >
                          <Dropdown.Item eventKey="All">All</Dropdown.Item>
                          <Dropdown.Item eventKey="Unapproved">Unapproved</Dropdown.Item>
                          <Dropdown.Item eventKey="Approved">Approved</Dropdown.Item>
                          <Dropdown.Item eventKey="None">None</Dropdown.Item>
                        </DropdownButton>
                        <Button variant="primary" onClick={() => handleApproveClick(reviews)}>Approve</Button>
                        <Button variant="danger" onClick={() => handleDeleteClick(reviews)}>Delete</Button>
                      </ButtonGroup>
                  </Col>
                  <Col className='md-4'>
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
              </Col>
            </Row>
          </Container>

          <Modal show={showDeleteModal} onHide={handleDeleteCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete the comment?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={delReview}>
              Delete
            </Button>
            <Button variant="secondary" onClick={handleDeleteCancel}>
              Cancel
            </Button>
          </Modal.Footer>
          </Modal>

          <Modal show={showApproveModal} onHide={handleApproveCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Approve</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to approve the comment?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={updateApproval}>
              Approve
            </Button>
            <Button variant="secondary" onClick={handleApproveCancel}>
              Cancel
            </Button>
          </Modal.Footer>
          </Modal>
      </>
    );
}

export default Comments;