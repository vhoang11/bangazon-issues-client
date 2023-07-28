/* eslint-disable react/destructuring-assignment */
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// eslint-disable-next-line import/no-extraneous-dependencies
// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import { PiCoatHangersize } from 'react-icons/pi';
import { signOut } from '../utils/auth';
import Cart from './Cart';
import SearchBar from './SearchBar';

function NavBar() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
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
            <SearchBar />
            <NavDropdown style={{ marginRight: '15px' }} title="Account" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/orderHistory">
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
            <Cart />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
