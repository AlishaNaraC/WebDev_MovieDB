import React from 'react';
import { Navbar, Nav, Container, Row, Col, Form, Table, Pagination, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';

function Awards() {
    return (
        <>
          {/* Navbar */}
          <Navbar style={{ backgroundColor: 'darkblue' }}>
            <Container fluid>
              <Navbar.Brand href="WebDev_MovieDB/home.html">DramaKu</Navbar.Brand>
            </Container>
          </Navbar>
    
          <Container fluid>
            <Row>
              <Col md={2}>
                {/* Sidebar */}
                <Nav className="flex-column p-3">
                  <Nav.Link href="#" data-bs-toggle="collapse" data-bs-target="#submenu1">Dramas</Nav.Link>
                  <Nav className="ms-3">
                    <Nav.Link href="ValidateDramas">Validate</Nav.Link>
                    <Nav.Link href="InputDramas">Input New Drama</Nav.Link>
                  </Nav>
                  <Nav.Link href="Countries">Countries</Nav.Link>
                  <Nav.Link href="Awards">Awards</Nav.Link>
                  <Nav.Link href="Genres">Genres</Nav.Link>
                  <Nav.Link href="Actors">Actors</Nav.Link>
                  <Nav.Link href="Comments">Comments</Nav.Link>
                  <Nav.Link href="Users">Users</Nav.Link>
                  <Nav.Link data-bs-toggle="collapse" href="#" data-bs-target="#submenu2">Account</Nav.Link>
                  <Nav className="ms-3">
                    <Nav.Link href="Profile">Profile</Nav.Link>
                    <Nav.Link href="/">Logout</Nav.Link>
                  </Nav>
                </Nav>
              </Col>
    
              <Col md={8}>
                <h1>Awards</h1>
                {/* Form */}
                <Form className="row g-3 mx-auto">
                  <Form.Group className="col-md-4 mb-3">
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="text" placeholder="Country" />
                  </Form.Group>
                  <Form.Group className="col-md-4 mb-3">
                    <Form.Label>Award</Form.Label>
                    <Form.Control type="text" placeholder="Award" />
                  </Form.Group>
                  <Form.Group className="col-md-4 mb-3">
                    <Form.Label>Year</Form.Label>
                    <Form.Control type="text" placeholder="Year" />
                  </Form.Group>
                  <div className="col-md-4 mb-3">
                    <Button variant="light" type="submit">Submit</Button>
                  </div>
                </Form>
    
                {/* Search */}
                <div className="search-container my-3">
                  <Form.Control type="text" placeholder="Search Award" />
                </div>
    
                {/* Table */}
                <Table hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Countries</th>
                      <th>Years</th>
                      <th>Awards</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="table-light">
                      <td>1</td>
                      <td>USA</td>
                      <td>2023</td>
                      <td>Oscar</td>
                      <td>
                        <FontAwesomeIcon icon={faPenToSquare} /> | <FontAwesomeIcon icon={faTrashCan} />
                      </td>
                    </tr>
                    <tr className="table-light">
                      <td>2</td>
                      <td>Canada</td>
                      <td>2021</td>
                      <td>Oscar</td>
                      <td>
                        <FontAwesomeIcon icon={faPenToSquare} /> | <FontAwesomeIcon icon={faTrashCan} />
                      </td>
                    </tr>
                    <tr className="table-light">
                      <td>3</td>
                      <td>Brazil</td>
                      <td>2020</td>
                      <td>Oscar</td>
                      <td>
                        <FontAwesomeIcon icon={faPenToSquare} /> | <FontAwesomeIcon icon={faTrashCan} />
                      </td>
                    </tr>
                  </tbody>
                </Table>
    
                {/* Pagination */}
                <Pagination className="justify-content-end">
                  <Pagination.Prev>Previous</Pagination.Prev>
                  <Pagination.Item active>1</Pagination.Item>
                  <Pagination.Item>2</Pagination.Item>
                  <Pagination.Item>3</Pagination.Item>
                  <Pagination.Next>Next</Pagination.Next>
                </Pagination>
              </Col>
            </Row>
          </Container>
        </>
    );
}

export default Awards;