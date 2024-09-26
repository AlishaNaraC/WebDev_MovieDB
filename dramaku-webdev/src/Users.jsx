import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareFromSquare, faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { Container, Row, Col, Form, Button, Pagination, Table } from 'react-bootstrap';
import HeaderCMS from './components/HeaderCMS';

const Users = () => {
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
                            <h1>Users</h1>
                        </div>
                        <div id="table-container" className="content-section">
                            <div id="forms-submit">
                                <Form>
                                    <Row className="align-items-center">
                                        <Col sm={1}>
                                            <Form.Label htmlFor="inlineFormInput" id="input-data-forms">Username</Form.Label>
                                        </Col>
                                        <Col sm={3}>
                                            <Form.Control type='text' id="input-data-forms" placeholder='username'/>
                                        </Col>
                                        <Col sm={1}>
                                            <Form.Label htmlFor="inlineFormInput" id="input-data-forms">Email</Form.Label>
                                        </Col>
                                        <Col sm={3}>
                                            <Form.Control type='email' id="input-data-forms" placeholder='email'/>
                                        </Col>
                                        <Col sm={1}>
                                            <Button variant='secondary' type='submit'>Submit</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>

                            <div className="search-cms-container">
                                <input type="text" placeholder="Search User" />
                                <i className='bx bx-search'></i>
                            </div>

                            <Table striped hover className='table' responsive="sm">
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="table-light">
                                        <th scope="row">1</th>
                                        <td>Nara</td>
                                        <td>nara123@gmail.com</td>
                                        <td>
                                            <FontAwesomeIcon icon={faShareFromSquare} className="custom-link2" /> | <FontAwesomeIcon icon={faPenToSquare} className="custom-link2" /> | <FontAwesomeIcon icon={faTrashCan} className="custom-link2" />
                                        </td>
                                    </tr>
                                    <tr className="table-light">
                                        <th scope="row">2</th>
                                        <td>Sarah</td>
                                        <td>sarah000@gmail.com</td>
                                        <td>
                                            <FontAwesomeIcon icon={faShareFromSquare} className="custom-link2" /> | <FontAwesomeIcon icon={faPenToSquare} className="custom-link2" /> | <FontAwesomeIcon icon={faTrashCan} className="custom-link2" />
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>    
                        </div>

                        <Pagination className='justify-content-end'>
                            <Pagination.Prev />
                            <Pagination.Item active>{1}</Pagination.Item>
                            <Pagination.Item>{2}</Pagination.Item>
                            <Pagination.Item>{3}</Pagination.Item>
                            <Pagination.Next />
                        </Pagination>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Users;
