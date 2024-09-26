import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './script.js';
import HeaderCMS from './components/HeaderCMS';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Profile(){
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
                            <p>asdfghjkl</p><br></br>
                            <p class="adjust-text"><b>Email</b></p>
                            <p>nara123@gmail.com</p><br></br>
                            <p class="adjust-text"><b>Password</b></p>
                            <p>admin123</p><br></br>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default Profile;