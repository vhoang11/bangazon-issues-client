/* eslint-disable react/destructuring-assignment */
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useContext, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { GiShoppingCart } from 'react-icons/gi';
import { signOut } from '../utils/auth';
import { CartContext } from '../pages/CartContext';
import CartProduct from './products/CartProduct';

function NavBar() {
  const cart = useContext(CartContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const checkout = async () => {
    await fetch('http://localhost:4000/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: cart.items }),
    }).then((response) => response.json()).then((response) => {
      if (response.url) {
        window.location.assign(response.url); // Forwarding user to Stripe
      }
    });
  };

  const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);

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
            <Button
              style={{ backgroundColor: 'transparent', color: 'black', borderColor: 'transparent' }}
              onClick={handleShow}
            ><GiShoppingCart size={25} /> ({productsCount} Items)
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productsCount > 0
            ? (
              <>
                <p>Items in your cart:</p>
                {cart.items.map((currentProduct, idx) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <CartProduct key={idx} id={currentProduct.id} quantity={currentProduct.quantity} />
                ))}

                <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>

                <Button variant="success" onClick={checkout}>
                  Purchase items!
                </Button>
              </>
            )
            : <h1>There are no items in your cart!</h1>}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavBar;
