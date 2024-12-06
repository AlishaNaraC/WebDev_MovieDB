import React, {useState, useEffect, useRef} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {Container, Row, Col, Table, Form, Button, Pagination, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import HeaderCMS from './components/HeaderCMS';

function DramaKuActors() {
  const [actors, setActors] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [actorName, setActorName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [actorPoster, setActorPoster] = useState(null);
  const [editingActor, setEditingActor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [actorToDelete, setActorToDelete] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexLastItem = currentPage * itemsPerPage;
  const indexFirstItem = indexLastItem - itemsPerPage;
  const currentActors = actors.slice(indexFirstItem, indexLastItem);
  const totalPages = Math.ceil(actors.length/itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  const getActors = async () => {
    try {
      const response = await fetch(`http://localhost:5000/actors`);
      const jsonData = await response.json();
      setActors(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getActors();
  }, []);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await fetch("http://localhost:5000/countries");
        const jsonData = await response.json();
        setCountries(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };
    getCountries();
  }, []);

  const onSubmitActor = async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append("selectedCountry", selectedCountry);
        formData.append("actorName", actorName);
        formData.append("birthDate", birthDate);
        formData.append("actorPoster", actorPoster);

        const response = await fetch(`http://localhost:5000/actors`, {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            await response.json();
            // Reset form fields
            setSelectedCountry("");
            setActorName("");
            setBirthDate("");
            setActorPoster(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
            getActors();
            setSubmitSuccess(true);
        } else {
          const errorData = await response.json();
          alert(errorData.error || "This actor already exists. Please enter a different actor.");
        }
    } catch (err) {
      console.error(err.message);
      alert("An error occurred while adding actor");
    }
  };

  const handleClose = () => setSubmitSuccess(false);

  const handleEdit = (actor) => {
    setEditingActor({ ...actor});
  };

  const handleActorUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/actors/${editingActor.actor_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          actor_name: editingActor.actor_name,
          birth_date: editingActor.birth_date,
        }),
      });
      if (response.ok) {
        const updatedActor = await response.json();
        setActors((prevActors) =>
          prevActors.map((actor) =>
            actor.actor_id === updatedActor.actor_id ? updatedActor : actor
          )
        );
        await getActors();
        setEditingActor(null);
      }
    } catch (error) {
      console.error('Error updating Actor:', error);
    }
  };

  const handleDeleteClick = (actor) => {
    setActorToDelete(actor);
    setShowDeleteModal(true);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setActorToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(`http://localhost:5000/actors/${actorToDelete.actor_id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        getActors();
        setShowDeleteModal(false);
        setActorToDelete(null);
      }
    } catch (error) {
      console.error('Error deleting actor:', error);
    }
  };

  const filteredActors = currentActors.filter(actor =>
    actor.actor_name.toLowerCase().includes(searchTerm.toLowerCase())
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
                <div className="column-content">
                  <h1>Actors</h1>
                </div>
                <div id="table-container" className="content-section">
                  <div id="forms-submit">
                    <Form className="row g-3 mx-auto" onSubmit={onSubmitActor}>
                      <Form.Group as={Col} md={3} controlId="formCountry">
                        <Form.Label>Country</Form.Label>
                        <Form.Control 
                            as="select" 
                            value={selectedCountry} 
                            onChange={(e) => setSelectedCountry(e.target.value)}
                            required
                        >
                          <option value="">Select a Country</option>
                          {countries.map((country) => (
                            <option key={country.country_id} value={country.country_id}>
                              {country.country}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
        
                      <Form.Group as={Col} md={3} controlId="formActorName">
                        <Form.Label>Actor Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Actor Name"
                          value={actorName}
                          onChange={(e) => setActorName(e.target.value)}
                          required
                        />
                      </Form.Group>
        
                      <Form.Group as={Col} md={3} controlId="formBirthDate">
                        <Form.Label>Birth Date</Form.Label>
                        <Form.Control
                          type="date"
                          placeholder="Birth Date"
                          value={birthDate}
                          onChange={(e) => setBirthDate(e.target.value)}
                          required
                        />
                      </Form.Group>
        
                      <Form.Group as={Col} md={3} controlId="formPictureUpload">
                        <Form.Label>Upload Picture</Form.Label>
                        <Form.Control
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={(e) => setActorPoster(e.target.files[0])}
                          required
                        />
                      </Form.Group>

                      <Form.Group as={Col} md={2} className="mb-3">
                        <Button variant='secondary' type="submit">Submit</Button>
                      </Form.Group>
                    </Form>
                  </div>

                  <div className="search-cms-container">
                      <input 
                        type="text" 
                        placeholder="Search Actor on This Page"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} />
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
                    {filteredActors.map((actor, index) => (
                      <tr key={actor.actor_id} className="table-light">
                        <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                        <td>
                          {actor.country}
                        </td>
                        <td>
                          {editingActor && editingActor.actor_id === actor.actor_id ? (
                            <input
                              type="text"
                              value={editingActor.actor_name}
                              onChange={(e) =>
                                setEditingActor({ ...editingActor, actor_name: e.target.value })
                              }
                            />
                          ) : (
                            actor.actor_name
                          )}
                        </td>
                        <td>
                          {editingActor && editingActor.actor_id === actor.actor_id ? (
                            <input
                              type="date"
                              value={new Date(editingActor.birth_date).toISOString().split("T")[0]}
                              onChange={(e) =>
                                setEditingActor({ ...editingActor, birth_date: e.target.value })
                              }
                            />
                          ) : (
                            new Date(actor.birth_date).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            })
                          )}
                        </td>
                        <td>
                          <img src={actor.actor_poster} className="img-fluid custom-img" alt={actor.actor_name} />
                        </td>
                        <td>
                          {editingActor && editingActor.actor_id === actor.actor_id ? (
                            <>
                              <Button variant="primary" onClick={handleActorUpdate}>Save</Button>
                              <Button variant="secondary" onClick={() => setEditingActor(null)} className="ms-2">Cancel</Button>
                            </>
                          ) : (
                            <>
                              <FontAwesomeIcon
                                icon={faPenToSquare}
                                className="custom-link2"
                                onClick={() => handleEdit(actor)}
                              /> |
                              <FontAwesomeIcon
                                icon={faTrashCan}
                                className="custom-link2"
                                onClick={() => handleDeleteClick(actor)}
                              />
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </Table>
                </div>               
    
                <Pagination className="justify-content-end">
                  <Pagination.Prev 
                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                  {totalPages <= 5 ? (
                    [...Array(totalPages)].map((_, index) => (
                      <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </Pagination.Item>
                    ))
                  ) : (
                    <>
                      <Pagination.Item
                        active={1 === currentPage}
                        onClick={() => handlePageChange(1)}
                      >
                        1
                      </Pagination.Item>

                      {currentPage > 4 && <Pagination.Ellipsis disabled />}

                      {Array.from({ length: 3 }, (_, i) => currentPage - 1 + i)
                        .filter(page => page > 1 && page < totalPages)
                        .map(page => (
                          <Pagination.Item
                            key={page}
                            active={page === currentPage}
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </Pagination.Item>
                        ))}

                      {currentPage < totalPages - 3 && <Pagination.Ellipsis disabled />}

                      <Pagination.Item
                        active={totalPages === currentPage}
                        onClick={() => handlePageChange(totalPages)}
                      >
                        {totalPages}
                      </Pagination.Item>
                    </>
                  )}
                  <Pagination.Next
                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </Col>
            </Row>
          </Container>

          <Modal show={showDeleteModal} onHide={handleDeleteCancel}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete the actor: {actorToDelete?.actor_name}?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleDeleteConfirm}>
                Delete
              </Button>
              <Button variant="secondary" onClick={handleDeleteCancel}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={submitSuccess} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>Your submit was completed successfully!</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
export default DramaKuActors;
