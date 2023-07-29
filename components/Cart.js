/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-tabs */
import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
// eslint-disable-next-line import/no-extraneous-dependencies
import { GiShoppingCart } from 'react-icons/gi';
import { CartContext } from '../pages/CartContext';
import CartProduct from './products/CartProduct';

function CartModal({ ...props }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const cart = useContext(CartContext);
  const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);

  return (
    <>
      <Button
        style={{ backgroundColor: 'transparent', color: 'black', borderColor: 'transparent' }}
        onClick={handleShow}
      ><GiShoppingCart size={25} />
      </Button>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {productsCount > 0
            ? (
              <>
                <p>Items in your cart:</p>
                {cart.items.map((currentProduct, idx) => (
                  <CartProduct key={idx} id={currentProduct.id} quantity={currentProduct.quantity} />
                ))}

                {/* <h1>Total: {cart.getTotalCost().toFixed(2)}</h1> */}
              </>
            )
            : <h4>Your cart is empty!</h4>}
          <Button style={{ marginTop: '20px', backgroundColor: '#6699CC' }}>Checkout</Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function Cart() {
  return (
    <>
      {['end'].map((placement, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <CartModal key={idx} placement={placement} name={placement} />
      ))}
    </>
  );
}
CartModal.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default Cart;
