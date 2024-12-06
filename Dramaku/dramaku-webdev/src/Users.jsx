import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { Container, Row, Col, Pagination, Table, Modal, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import HeaderCMS from './components/HeaderCMS';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [userToSuspend, setUserToSuspend] = useState(null);
  const [suspendSuccess, setSuspendSuccess] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexLastItem = currentPage * itemsPerPage;
  const indexFirstItem = indexLastItem - itemsPerPage;
  const currentUsers = users.slice(indexFirstItem, indexLastItem);
  const totalPages = Math.ceil(users.length/itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

    const getUsers = async () => {
        try {
        const response = await fetch(`http://localhost:5000/users`);
        const jsonData = await response.json();
        setUsers(jsonData);
        } catch (err) {
        console.error(err.message);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const handleSuspendClick = (user) => {
        setUserToSuspend(user);
        setShowSuspendModal(true);
    };

    const handleSuspendCancel = () => {
        setShowSuspendModal(false);
        setUserToSuspend(null);
    };

    const handleSuspend = async (userId) => {
        try {
            await fetch(`http://localhost:5000/users/${userId}/status`, { 
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "Suspended" }) 
            });
            getUsers(); // Refresh the user list
            setShowSuspendModal(false);
            setUserToSuspend(null);
            setSuspendSuccess(true);
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleClose = () => setSuspendSuccess(false);

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const handleDeleteCancel = () => {
        setShowDeleteModal(false);
        setUserToDelete(null);
    };

    const handleDelete = async (userId) => {
        try {
          await fetch(`http://localhost:5000/users/${userId}`, { 
            method: 'DELETE'
         });
          getUsers(); // Refresh the user list
          setShowDeleteModal(false);
          setUserToDelete(null);
        } catch (err) {
          console.error(err.message);
        }
    };

    const renderSuspendTooltip = (props) => (
        <Tooltip id="suspend-tooltip" {...props}>
          Suspend User
        </Tooltip>
    );

    const renderDeleteTooltip = (props) => (
        <Tooltip id="delete-tooltip" {...props}>
            Delete User
        </Tooltip>
    );

    const filteredUsers = currentUsers.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
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
                            <div className="search-cms-container">
                                <input 
                                    type="text" 
                                    placeholder="Search User"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <i className='bx bx-search'></i>
                            </div>

                            <Table striped hover className='table' responsive="sm">
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Role</th>
                                        <th scope="col">Created At</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((user, index) =>(
                                        <tr key={user.user_id} className="table-light">
                                            <th scope="row">{index + 1 + (currentPage - 1) * itemsPerPage}</th>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>
                                                {new Date(user.created_at).toLocaleDateString("en-GB", {
                                                    day: "2-digit",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </td>
                                            <td>{user.status}</td>
                                            <td>
                                                {user.role === 'Writer' && (
                                                <div style={{display:'flex', alignItems:'center', gap: '4px'}}>
                                                    <OverlayTrigger
                                                        placement="bottom"
                                                        delay={{ show: 250, hide: 400 }}
                                                        overlay={renderSuspendTooltip}
                                                        >
                                                        <FontAwesomeIcon
                                                            icon={faCircleXmark}
                                                            className="custom-link2"
                                                            onClick={() => handleSuspendClick(user)}
                                                        />
                                                    </OverlayTrigger>
                                                    <span>|</span>
                                                    <OverlayTrigger
                                                        placement="bottom"
                                                        delay={{ show: 250, hide: 400 }}
                                                        overlay={renderDeleteTooltip}
                                                        >
                                                        <FontAwesomeIcon
                                                            icon={faTrashCan}
                                                            className="custom-link2"
                                                            onClick={() => handleDeleteClick(user)}
                                                        />
                                                    </OverlayTrigger>
                                                </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>    
                        </div>

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
            </Container>

            <Modal show={showDeleteModal} onHide={handleDeleteCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete the user: {userToDelete?.username}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => handleDelete(userToDelete.user_id)}>
                        Delete
                    </Button>
                    <Button variant="secondary" onClick={handleDeleteCancel}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showSuspendModal} onHide={handleSuspendCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to suspend the user: {userToSuspend?.username}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => handleSuspend(userToSuspend.user_id)}>
                        Suspend
                    </Button>
                    <Button variant="secondary" onClick={handleSuspendCancel}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={suspendSuccess} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>The user has been successfully suspended!</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
          </Modal>
        </div>
    );
};

export default Users;
