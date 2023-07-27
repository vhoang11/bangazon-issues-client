/* eslint-disable no-tabs */
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
// eslint-disable-next-line import/no-extraneous-dependencies
import { GiShoppingCart } from 'react-icons/gi';

function CartModal({ ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const { cartItems, onAdd, onRemove } = props;
  // const itemTotal = (quantity, price) => quantity * price;
  // const itemsPrice = cartItems.map((item) => itemTotal(item.qty, item.price));
  // const totalItemsPrice = itemsPrice.reduce((a, b) => a + b, 0);
  // const taxPrice = totalItemsPrice * 0.0925;
  // const shippingPrice = 10;
  // const totalPrice = totalItemsPrice + taxPrice + shippingPrice;

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
          {/* <aside className="block col-1">
            <h2>Cart Items</h2>
            <div>
              {cartItems.length === 0 && <div>Cart is empty</div>}
              {cartItems.map((item) => (
                <div key={item.id} className="row">
                  <div className="col-2">{item.name}</div>
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
          </aside> */}
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

export default Cart;
