import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import '../index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Collapse from 'react-bootstrap/Collapse';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function SidebarCMS(){
    const [show, setShow] = useState(false);
    const [openDramas, setOpenDramas] = useState(false);
    const [openAccount, setOpenAccount] = useState(false);
    // const [isAdmin, setIsAdmin] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='));
        if (token) {
            const decodedToken = jwtDecode(token.split('=')[1]); 
            if (decodedToken.role !== 'Admin') {
                // alert('You are not authorized to access this page.');
                navigate('/NotFound');
            }
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = async () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate('/');
    };

    return(
        <>
            <Button variant="outline-light" onClick={handleShow}>
                <i className="fa-solid fa-bars"/>
            </Button>

            <Offcanvas show={show} onHide={handleClose} backdrop="static">
                <Offcanvas.Header closeButton>
                <Offcanvas.Title><b>DramaKu</b></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className='flex-column'>
                        <Nav.Link onClick={() => setOpenDramas(!openDramas)} aria-controls="submenu1" aria-expanded={openDramas}>Dramas</Nav.Link>
                            <Collapse in={openDramas}>
                                <div id='submenu1'>
                                    <Nav.Link className='ms-3 my-1' href="./ValidateDramas">Validate</Nav.Link>
                                    <Nav.Link className='ms-3 my-1' href="./InputDramas">Input New Drama</Nav.Link>
                                </div>
                            </Collapse>
                        <Nav.Link href="./Countries">Countries</Nav.Link>
                        <Nav.Link href="./Awards">Awards</Nav.Link>
                        <Nav.Link href="./Genres">Genres</Nav.Link>
                        <Nav.Link href="./Actors">Actors</Nav.Link>
                        <Nav.Link href="./Comments">Comments</Nav.Link>
                        <Nav.Link href="./Users">Users</Nav.Link>
                        <Nav.Link onClick={() => setOpenAccount(!openAccount)} aria-controls="submenu2" aria-expanded={openAccount}>Account</Nav.Link>
                            <Collapse in={openAccount}>
                                <div id='submenu2'>
                                    <Nav.Link className='ms-3 my-1' href="./Profile">Profile</Nav.Link>
                                    <Nav.Link className='ms-3 my-1' onClick={handleLogout}>Logout</Nav.Link>
                                </div>
                            </Collapse>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default SidebarCMS;