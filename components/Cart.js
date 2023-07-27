/* eslint-disable no-tabs */
import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
// eslint-disable-next-line import/no-extraneous-dependencies
import { GiShoppingCart } from 'react-icons/gi';

function CartModal({ ...props }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const { products } = data;
  const [cartItems, setCartItems] = useState([]);
  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) => (x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x)),
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) => (x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x)),
      );
    }
  };
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  const taxPrice = itemsPrice * 0.14;
  const shippingPrice = itemsPrice > 2000 ? 0 : 20;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

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
          <aside className="block">
            <h2>Cart Items</h2>
            <div>
              {cartItems.length === 0 && <div>Cart is empty</div>}
              {cartItems.map((item) => (
                <div key={item.id} className="row">
                  <div className="col-2">{item.title}</div>
                  <div className="col-2">
                    <button
                      type="button"
                      onClick={() => onRemove(item)}
                      className="remove"
                    >
                      -
                    </button>{' '}
                    <button
                      type="button"
                      onClick={() => onAdd(item)}
                      className="add"
                    >
                      +
                    </button>
                  </div>

                  <div className="col-2 text-right">
                    {item.qty} x ${item.price.toFixed(2)}
                  </div>
                </div>
              ))}

              {cartItems.length !== 0 && (
              <>
                <hr />
                <div className="row">
                  <div className="col-2">Items Price</div>
                  <div className="col-1 text-right">${itemsPrice.toFixed(2)}</div>
                </div>
                <div className="row">
                  <div className="col-2">Tax Price</div>
                  <div className="col-1 text-right">${taxPrice.toFixed(2)}</div>
                </div>
                <div className="row">
                  <div className="col-2">Shipping Price</div>
                  <div className="col-1 text-right">
                    ${shippingPrice.toFixed(2)}
                  </div>
                </div>
                <div className="row">
                  <div className="col-2">
                    <strong>Total Price</strong>
                  </div>
                  <div className="col-1 text-right">
                    <strong>${totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <button
                    type="button"
                    onClick={() => alert('Implement Checkout!')}
                  >
                    Checkout
                  </button>
                </div>
              </>
              )}
            </div>
          </aside>
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
      qty: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Cart;
