import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {Container, Row, Col, Table, Form, Button, Pagination } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import PutriMarino from './image/putri-marino.png';
import HeaderCMS from './components/HeaderCMS';

function DramaKuActors() {
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
                <div className="column-content">
                  <h1>Actors</h1>
                </div>
                <div id="table-container" className="content-section">
                  <div id="forms-submit">
                    <Form className="row g-3 mx-auto">
                      <Form.Group as={Col} md={3} controlId="formCountry">
                        <Form.Label>Country</Form.Label>
                        <Form.Control type="text" placeholder="Country" />
                      </Form.Group>
        
                      <Form.Group as={Col} md={3} controlId="formActorName">
                        <Form.Label>Actor Name</Form.Label>
                        <Form.Control type="text" placeholder="Actor Name" />
                      </Form.Group>
        
                      <Form.Group as={Col} md={3} controlId="formBirthDate">
                        <Form.Label>Birth Date</Form.Label>
                        <Form.Control type="text" placeholder="Birth Date" />
                      </Form.Group>
        
                      <Form.Group as={Col} md={3} controlId="formPictureUpload">
                        <Form.Label>Upload Picture</Form.Label>
                        <Form.Control type="file" accept="image/*" />
                      </Form.Group>
                      <Form.Group as={Col} md={2} className="mb-3">
                        <Button variant='secondary' type="submit">Submit</Button>
                      </Form.Group>
                    </Form>
                  </div>

                  <div className="search-cms-container">
                      <input type="text" placeholder="Search Actor" />
                      <i className='bx bx-search'></i>
                  </div>

                  <Table striped hover className='table' responsive="sm">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Country</th>
                        <th scope="col">Actor Name</th>
                        <th scope="col">Birth Date</th>
                        <th scope="col">Photos</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="table-light">
                        <td>1</td>
                        <td>Indonesia</td>
                        <td>Putri Marino</td>
                        <td>4 Agustus 1993</td>
                        <td>
                          <img src={PutriMarino} className="img-fluid custom-img" alt="Putri Marino" />
                        </td>
                        <td>
                            <FontAwesomeIcon icon={faPenToSquare} className="custom-link2" /> | <FontAwesomeIcon icon={faTrashCan} className="custom-link2" />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>               
    
                <Pagination className="justify-content-end">
                  <Pagination.Prev />
                  <Pagination.Item active>{1}</Pagination.Item>
                  <Pagination.Item>{2}</Pagination.Item>
                  <Pagination.Item>{3}</Pagination.Item>
                  <Pagination.Next />
                </Pagination>
              </Col>
            </Row>
          </Container>
        </>
      );
    }
export default DramaKuActors;
