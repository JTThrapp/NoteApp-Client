import React from 'react';
import {Navbar, NavbarBrand, Nav, NavItem, Button} from 'reactstrap';
import './Navbar.css'

const Sitebar = (props) => {

    return(
        <Navbar className="sitebar" color="faded" light expand="md">
            <NavbarBrand style={{color: '#174793'}} href ="/"><b>JT's NoteApp</b></NavbarBrand>
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <Button style={{backgroundColor: '#174793' }} onClick={props.clickLogout}>Logout</Button>
                </NavItem>
            </Nav>
        </Navbar>
    )
}

export default Sitebar;