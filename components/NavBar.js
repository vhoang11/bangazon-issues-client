/* eslint-disable react/destructuring-assignment */
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import { PiCoatHangersize } from 'react-icons/pi';
// import Cart from './Cart';
import { Form } from 'react-bootstrap';
import { useContext } from 'react';
import Cart from './Cart';
import { signOut } from '../utils/auth';
import { CartContext } from '../pages/CartContext';

function NavBar() {
  const cart = useContext(CartContext);
  const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);

  return (
    <>

      <Navbar expand="lg" className="bg-body-tertiary shadow-sm" id="navbar">
        <Container fluid>
          <Navbar.Brand href="/">CLOSET SHARE</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              {/* <PiCoatHangersize size={25} /> */}
              <Nav.Link href="/products">Products</Nav.Link>
              <Nav.Link href="/categories">Categories</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success" style={{ marginRight: '15px' }}>Search</Button>
            </Form>
            <NavDropdown style={{ marginRight: '15px' }} title="Account" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/orderHistory">
                Order History
              </NavDropdown.Item>
              <NavDropdown.Item href="/products/new">Add Product</NavDropdown.Item>
              <NavDropdown.Divider />
              <Button
                style={{ marginLeft: '15px' }}
                variant="danger"
                onClick={signOut}
              >
                Sign Out
              </Button>
            </NavDropdown>
            <Cart />
            <div>{productsCount}</div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </>
  );
}

export default NavBar;
