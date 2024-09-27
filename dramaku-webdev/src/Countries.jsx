import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './script.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import HeaderCMS from './components/HeaderCMS';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination';

function Countries() {
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
                <Form>
                  <Row className="align-items-center">
                    <Col sm={1}>
                      <Form.Label htmlFor="inlineFormInput" id="input-data-forms">Country</Form.Label>
                    </Col>
                    <Col sm="auto">
                      <Form.Control type='text' id="input-data-forms" placeholder='country'/>
                    </Col>
                    <Col xs="auto">
                      <Button variant='secondary' type='submit'>Submit</Button>
                    </Col>
                  </Row>
                </Form>
              </div>

              <div className="search-cms-container">
                  <input type="text" placeholder="Search Country" />
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
                  <tr className="table-light">
                    <th scope="row">1</th>
                    <td>USA</td>
                    <td>
                        <FontAwesomeIcon icon={faPenToSquare} className="custom-link2" /> | <FontAwesomeIcon icon={faTrashCan} className="custom-link2" />
                    </td>
                  </tr>
                  <tr className="table-light">
                    <th scope="row">2</th>
                    <td>Canada</td>
                    <td>
                        <FontAwesomeIcon icon={faPenToSquare} className="custom-link2" /> | <FontAwesomeIcon icon={faTrashCan} className="custom-link2" />
                    </td>
                  </tr>
                  <tr className="table-light">
                    <th scope="row">3</th>
                    <td>Brazil</td>
                    <td>
                        <FontAwesomeIcon icon={faPenToSquare} className="custom-link2" /> | <FontAwesomeIcon icon={faTrashCan} className="custom-link2" />
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

export default Countries;