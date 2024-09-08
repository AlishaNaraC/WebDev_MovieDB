import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown, Container, Row, Col, Table, Form, Button, Pagination } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import PutriMarino from './image/putri-marino.png';

function DramaKuActors() {
    return (
        <>
          <Navbar style={{ backgroundColor: 'darkblue' }}>
            <Container fluid>
              <Navbar.Brand href="WebDev_MovieDB/home.html">DramaKu</Navbar.Brand>
            </Container>
          </Navbar>
    
          <Container fluid>
            <Row>
              <Col md={2}>
                <Nav defaultActiveKey="/home" className="flex-column p-3">
                  <Nav.Link href="#" onClick={() => {}}>Dramas</Nav.Link>
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
                  <NavDropdown title="Account" id="nav-dropdown">
                    <NavDropdown.Item href="Profile.html">Profile</NavDropdown.Item>
                    <NavDropdown.Item href="WebDev_MovieDB/home.html">Logout</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Col>
    
              <Col md={8}>
                <h1>Actors</h1>
    
                <Form className="row g-3 mx-auto">
                  <Form.Group as={Col} md={2} className="mb-3" controlId="formCountry">
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="text" placeholder="Country" />
                  </Form.Group>
    
                  <Form.Group as={Col} md={4} className="mb-3" controlId="formActorName">
                    <Form.Label>Actor Name</Form.Label>
                    <Form.Control type="text" placeholder="Actor Name" />
                  </Form.Group>
    
                  <Form.Group as={Col} md={4} className="mb-3" controlId="formBirthDate">
                    <Form.Label>Birth Date</Form.Label>
                    <Form.Control type="text" placeholder="Birth Date" />
                  </Form.Group>
    
                  <Form.Group as={Col} md={6} className="mb-3" controlId="formPictureUpload">
                    <Form.Label>Upload Picture</Form.Label>
                    <Form.Control type="file" accept="image/*" />
                  </Form.Group>
    
                  <Button className="btn-light" type="submit">Submit</Button>
                </Form>
    
                <div className="search-actor-container my-3">
                    <input type="text" placeholder="Search Actor"></input>
                    <i class='bx bx-search'></i>
                    
                </div>
    
                <Table hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Country</th>
                      <th>Actor Name</th>
                      <th>Birth Date</th>
                      <th>Photos</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Indonesia</td>
                      <td>Putri Marino</td>
                      <td>4 Agustus 1993</td>
                      <td>
                        <img src={PutriMarino} className="img-fluid custom-img" alt="Putri Marino" />
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faPenToSquare} /> | <FontAwesomeIcon icon={faTrashCan} />
                      </td>
                    </tr>
                  </tbody>
                </Table>
    
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
export default DramaKuActors;
