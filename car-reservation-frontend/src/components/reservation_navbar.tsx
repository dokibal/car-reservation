import { useEffect } from "react";
import { Observer } from 'mobx-react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {MAIN_PAGE, SIGN_IN_PAGE, SIGN_UP_PAGE, RESERVATION_PAGE} from '../constants/config';

const ReservationNavbar = () => {

    return (
        <Observer>
            {() => {
                return (
                    <Navbar expand="lg" className="bg-body-tertiary">
                        <Container>
                            <Navbar.Brand href={MAIN_PAGE}>Car Reservation Manager</Navbar.Brand>
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href={MAIN_PAGE}>Home</Nav.Link>
                                    <Nav.Link href={RESERVATION_PAGE}>Reservations</Nav.Link>
                                    <Nav.Link href={MAIN_PAGE}>Cars</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                            <Navbar.Collapse className="justify-content-end">
                                <Nav className="me-auto">
                                    <Nav.Link href={SIGN_IN_PAGE}>Sign in</Nav.Link>
                                    <Nav.Link href={SIGN_UP_PAGE}>Sign up</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                )
            }}
        </Observer>
    )
}

export default ReservationNavbar;