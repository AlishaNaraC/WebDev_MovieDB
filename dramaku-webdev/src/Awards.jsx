import React from 'react';
import { Container, Row, Col, Form, Table, Pagination, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import HeaderCMS from './components/HeaderCMS';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';

function Awards() {
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
                  <h1>Awards</h1>
                </div>
                <div id="table-container" className="content-section">
                    <div id="forms-submit">
                      <Form className="row g-3 mx-auto">
                        <Form.Group className="col-md-4">
                          <Form.Label>Country</Form.Label>
                          <Form.Control type="text" placeholder="Country" />
                        </Form.Group>
                        <Form.Group className="col-md-4">
                          <Form.Label>Award</Form.Label>
                          <Form.Control type="text" placeholder="Award" />
                        </Form.Group>
                        <Form.Group className="col-md-4">
                          <Form.Label>Year</Form.Label>
                          <Form.Control type="text" placeholder="Year" />
                        </Form.Group>
                        <div className="col-md-4 mb-3">
                          <Button variant="secondary" type="submit">Submit</Button>
                        </div>
                      </Form>
                    </div>
                    
                    <div className="search-cms-container">
                        <input type="text" placeholder="Search Award" />
                        <i className='bx bx-search'></i>
                    </div>

                    <Table hover>
                      <thead>
                        <tr>
                          <th></th>
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
                            <FontAwesomeIcon className="custom-link2" icon={faPenToSquare} /> | <FontAwesomeIcon className="custom-link2" icon={faTrashCan} />
                          </td>
                        </tr>
                        <tr className="table-light">
                          <td>2</td>
                          <td>Canada</td>
                          <td>2021</td>
                          <td>Oscar</td>
                          <td>
                            <FontAwesomeIcon className="custom-link2" icon={faPenToSquare} /> | <FontAwesomeIcon className="custom-link2" icon={faTrashCan} />
                          </td>
                        </tr>
                        <tr className="table-light">
                          <td>3</td>
                          <td>Brazil</td>
                          <td>2020</td>
                          <td>Oscar</td>
                          <td>
                            <FontAwesomeIcon className="custom-link2" icon={faPenToSquare} /> | <FontAwesomeIcon className="custom-link2" icon={faTrashCan} />
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                </div>

                <Pagination className="justify-content-end">
                  <Pagination.Prev />
                  <Pagination.Item active>1</Pagination.Item>
                  <Pagination.Item>2</Pagination.Item>
                  <Pagination.Item>3</Pagination.Item>
                  <Pagination.Next />
                </Pagination>

              </Col>
            </Row>
          </Container>
        </>
    );
}

export default Awards;