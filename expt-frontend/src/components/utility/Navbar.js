import React from 'react'
import {Link} from 'react-router-dom';

export default function NavbarComponent() {
    return (
        <nav bg="light" expand="sm">
            <h4 as={Link} to="/">
                ezPT
            </h4>
            {/* <Nav>
                <Nav.Link as={Link} to="/user">Profile</Nav.Link>
            </Nav> */}

            
        </nav>
    )
}
