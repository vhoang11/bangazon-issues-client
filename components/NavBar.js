import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { signOut } from '../utils/auth';

function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand style={{ marginLeft: '75px' }} href="/">CLOSET SHARE</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Products</Nav.Link>
            <Nav.Link href="/products">Categories</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button
              style={{ marginRight: '15px' }}
              variant="outline-success"
            >Search
            </Button>
          </Form>
          <NavDropdown style={{ marginRight: '15px' }} title="Account" id="navbarScrollingDropdown">
            <NavDropdown.Item href="profile">Profile</NavDropdown.Item>
            <NavDropdown.Item href="orderHistory">
              Order History
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <Button
              style={{ marginLeft: '15px' }}
              variant="danger"
              onClick={signOut}
            >
              Sign Out
            </Button>
          </NavDropdown>
          <Nav.Link href="/cart" style={{ marginRight: '75px' }}>Cart</Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
