import { observer } from 'mobx-react-lite';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { MAIN_PAGE, SIGN_IN_PAGE, SIGN_UP_PAGE, RESERVATION_PAGE, CAR_PAGE } from '../constants/config';
import { UserStore } from "../stores/user_store";

interface ReservationNavbarProps {
    userStore: UserStore;
}

const ReservationNavbar = ({ userStore }: ReservationNavbarProps) => {

    let handleSignout = () => {
        userStore.signout();
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href={MAIN_PAGE}>Car Reservation Manager</Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href={MAIN_PAGE}>Home</Nav.Link>
                        <Nav.Link href={RESERVATION_PAGE + "/0"}>Reservations</Nav.Link>
                        <Nav.Link href={CAR_PAGE}>Cars</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                {userStore.currentUser && userStore.currentUser.id ?
                    <Navbar.Collapse className="justify-content-end">
                        <Nav.Link >{userStore.currentUser.displayName}</Nav.Link>
                        <Nav.Link onClick={handleSignout}>Sign out</Nav.Link>
                        <Nav className="me-auto"></Nav>
                    </Navbar.Collapse>
                    :
                    <Navbar.Collapse className="justify-content-end">
                        <Nav.Link href={SIGN_IN_PAGE}>Sign in</Nav.Link>
                        <Nav.Link href={SIGN_UP_PAGE}>Sign up</Nav.Link>
                        <Nav className="me-auto"></Nav>
                    </Navbar.Collapse>
                }
            </Container>
        </Navbar>
    )
}

export default observer(ReservationNavbar);