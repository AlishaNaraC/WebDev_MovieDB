import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import './script.js';
import './index.css';
import HeaderCMS from './components/HeaderCMS';
import ModalCMS from './components/ModalCMS';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { Container, Row, Col, Table, Pagination } from 'react-bootstrap';

function ValidateDramas() {
  const [showModal, setShowModal] = useState(false);
  const [selectedDrama, setSelectedDrama] = useState(null);

// Function to open the modal
const handleEditClick = (drama) => {
  setSelectedDrama(drama); // Save the clicked drama info (if needed)
  setShowModal(true);
};

// Function to close the modal
const handleCloseModal = () => {
  setShowModal(false);
  setSelectedDrama(null); // Reset selected drama
};

const dramas = [
  {
    contributor: 'SeriesStreamer',
    title: 'Young Sheldon',
    actors: 'Iain Armitage',
    genres: 'Comedy, Drama',
    synopsis: 'Never get bored, even it has a lot of episodes, which more than one hundred, I watched all of them',
    status: 'Unapproved',
  },
  {
    contributor: 'asdfghjkl',
    title: 'Dark',
    actors: 'German people',
    genres: 'Thriller, Mystery, Sci-Fi',
    synopsis: 'Confused but entertaining',
    status: 'Unapproved',
  },
];

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
                  <Dropdown>
                    <label htmlFor="dropdownapprove-filter" className="btn-label me-2">Filtered by:</label>
                    <Dropdown.Toggle variant='secondary' id='dropdownapprove-filter'>
                      None
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href='#'>Approved</Dropdown.Item>
                      <Dropdown.Item href='#'>Unapproved</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col className='md-6'>
                  <Dropdown>
                      <label htmlFor="dropdownshows" className="btn-label me-2">Shows:</label>
                      <Dropdown.Toggle variant='secondary' id="dropdownshows">
                        10
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href='#'>25</Dropdown.Item>
                        <Dropdown.Item href='#'>50</Dropdown.Item>
                        <Dropdown.Item href='#'>100</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col className='md-2'>
                  <div className="search-cms-container">
                      <input type="text" placeholder="Search Drama" />
                      <i className='bx bx-search'></i>
                  </div>
                </Col>
              </Row>

              <Table striped hover className='table' responsive="sm">
                <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">Contributor</th>
                      <th scope="col">Drama</th>
                      <th scope="col" className="med-column">Actors</th>
                      <th scope="col" className="med-column">Genres</th>
                      <th scope="col" className="long-column">Synopsis</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody id="formApprove">
                    {dramas.map((drama, index) => (
                      <tr className="table-light" key={index}>
                        <th scope="row">
                          <input type="checkbox" name="check" value="Value 1" />
                        </th>
                        <td>{drama.contributor}</td>
                        <td>{drama.title}</td>
                        <td>{drama.actors}</td>
                        <td>{drama.genres}</td>
                        <td>{drama.synopsis}</td>
                        <td>{drama.status}</td>
                        <td>
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            className="custom-link2"
                            onClick={() => handleEditClick(drama)} // Show modal on icon click
                          />{' '}
                          |{' '}
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            className="custom-link2"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
              </Table>
            </div>

            <Row>
              <Col className='md-4 act-comment'>
                <ButtonGroup>
                    <DropdownButton as={ButtonGroup} title="Select" id="bg-nested-dropdown" variant="outline-secondary">
                      <Dropdown.Item eventKey="1">All</Dropdown.Item>
                      <Dropdown.Item eventKey="2">Unapproved</Dropdown.Item>
                      <Dropdown.Item eventKey="3">Approved</Dropdown.Item>
                      <Dropdown.Item eventKey="4">None</Dropdown.Item>
                      {/* <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                        <li><a className="dropdown-item" href="#" onClick={() => selectAllComment()}>All</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => selectUnappComment()}>Unapproved</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => selectAppComment()}>Approved</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => selectNoneComment()}>None</a></li>
                      </ul> */}
                    </DropdownButton>
                    <Button variant="primary">Approve</Button>
                    <Button variant="danger">Delete</Button>
                  </ButtonGroup>
              </Col>
              <Col className='md-4'>
                <Pagination className='justify-content-end'>
                  <Pagination.Prev />
                  <Pagination.Item active>{1}</Pagination.Item>
                  <Pagination.Item>{2}</Pagination.Item>
                  <Pagination.Item>{3}</Pagination.Item>
                  <Pagination.Next />
                </Pagination>
              </Col>
            </Row>
          </Col>
        </Row>
        {showModal && (
          <ModalCMS show={showModal} onHide={handleCloseModal} />
        )}
      </Container>
    </div>
  );
}

export default ValidateDramas;