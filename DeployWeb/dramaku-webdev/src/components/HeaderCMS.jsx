import React from 'react';
import '../index.css';
import SidebarCMS from './SidebarCMS';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function HeaderCMS() {
    const handleLogoClick = () => {
    window.location.href = '/';
    }
      
    return (
        <Container fluid className="headercms">
            <Row>
                <Col md={1} className="sidebar-button">
                    <SidebarCMS/>
                </Col>
                <Col md="auto" className="logo-container">
                    <h5 onClick={handleLogoClick} style={{ textDecoration: 'none', marginTop: '7px' }} ><b>DramaKu</b></h5>
                </Col>
            </Row>
        </Container>
    );
}

export default HeaderCMS;

