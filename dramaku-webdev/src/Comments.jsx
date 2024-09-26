import React from 'react';
import './script.js';
import './index.css';
import HeaderCMS from './components/HeaderCMS';
import { Button, ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { Container, Row, Col, Table, Pagination } from 'react-bootstrap';

function Comments() {
    return (
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
                          <input type="text" placeholder="Search Comment" />
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
                        <th scope="col" className="med-column">Drama</th>
                        <th scope="col" className="long-column">Comments</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody id="formApprove">
                      <tr className="table-light">
                        <th scope="row"><input type="checkbox" name="check" value="Value 1" /></th>
                        <td>SeriesStreamer</td>
                        <td>4 Star</td>
                        <td>Young Sheldon</td>
                        <td>Never get bored, even it has alot of episodes, which more than one hundred, i watched all of them</td>
                        <td>Unapproved</td>
                      </tr>
                      <tr className="table-light">
                        <th scope="row"><input type="checkbox" name="check" value="Value 2" /></th>
                        <td>asdfghjkl</td>
                        <td>4 Star</td>
                        <td>Dark</td>
                        <td>Confused but entertaining</td>
                        <td>Unapproved</td>
                      </tr>
                      <tr className="table-light">
                        <th scope="row"><input type="checkbox" name="check" value="Value 3" /></th>
                        <td>qwerty</td>
                        <td>5 Star</td>
                        <td>Sherlock Holmes</td>
                        <td>Finally, a good mystery Movie</td>
                        <td>Approved</td>
                      </tr>
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
          </Container>
    );
}

export default Comments;