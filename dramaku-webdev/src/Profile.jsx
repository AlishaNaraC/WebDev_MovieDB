import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './script.js';
import HeaderCMS from './components/HeaderCMS';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { jwtDecode } from 'jwt-decode';

function Profile(){
    const [user, setUser] = useState({ username: '', email: '', role: '', created_at: '' });
    const [, setIsLoggedin] = useState(false);

    useEffect(() => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='));
        if (token) {
            try {
                const decodedToken = jwtDecode(token.split('=')[1]);
                console.log("Decoded Token:", decodedToken);

                // Set initial user data from the token
                const { username, role } = decodedToken;
                setUser({ username, role, email: '', created_at:'' });
                setIsLoggedin(true);

                const fetchUserDetail = async () => {
                    try {
                        const response = await fetch(`http://localhost:5000/users/${username}`, {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${token.split('=')[1]}`,
                                'Content-Type': 'application/json',
                            },
                        });

                        if (response.ok) {
                            const data = await response.json();
                            setUser(prevUser => ({ 
                                ...prevUser, 
                                email: data.email, 
                                created_at: data.created_at 
                            }));
                        } else {
                            console.error('Failed to fetch user email');
                        }
                    } catch (error) {
                        console.error('Error fetching user email:', error);
                    }
                };
                fetchUserDetail();
            } catch (error) {
                console.error("Invalid token:", error);
                setIsLoggedin(false);
            }
        } else {
            setIsLoggedin(false);
        }
    }, []);

    return(
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
                            <h1>Profile</h1>
                        </div>
                        <div id="table-container">
                            <p class="adjust-text"><b>Username</b></p>
                            <p>{user.username}</p><br></br>
                            <p class="adjust-text"><b>Email</b></p>
                            <p>{user.email}</p><br></br>
                            <p class="adjust-text"><b>Role</b></p>
                            <p>{user.role}</p><br></br>
                            <p class="adjust-text"><b>Created At</b></p>
                            <p>{user.created_at}</p><br></br>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default Profile;