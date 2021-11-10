import React from 'react';
import Nav from 'react-bootstrap/Nav'
import {Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import './NavBar.styles.css'

class Navbar extends React.Component
{

    render()
    {
       
        return(
            <Container>
                <Nav fill variant="tabs">
                <Nav.Item>
                    <Nav.Link eventKey="link-0" as={Link} to="/">HOME</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" as={Link} to="/all_tokens">All Tokens</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2" as={Link} to="/your_tokens">Your Tokens</Nav.Link>
                </Nav.Item>

                   
                </Nav>
            </Container>
        )
    }
}


export default (Navbar);