/* eslint-disable no-tabs */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
// eslint-disable-next-line import/no-extraneous-dependencies
import { GiShoppingCart } from 'react-icons/gi';
import { useRouter } from 'next/router';
import getOrderByCustomerId from '../utils/data/orderData';
import { getOrderProductsByOrderId } from '../utils/data/orderProductsData';
import OrderProductCard from './orderProducts/OrderProductCard';

function CartModal({ ...props }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const { products } = data;
  const router = useRouter();
  const [orderProducts, setOrderProducts] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null); // State to store order details (including order ID)

  useEffect(() => {
    // Fetch order details by customer ID here and update the state
    getOrderByCustomerId()
      .then((orderData) => {
        setOrderDetails(orderData);

        // Fetch order products by order ID here and update the state
        getOrderProductsByOrderId(orderData.orderId)
          .then((orderProductsData) => {
            setOrderProducts(orderProductsData);
          })
          .catch((error) => console.error('Error fetching order products:', error));
      })
      .catch((error) => console.error('Error fetching order details:', error));
  }, []);

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
            <div>Items in Cart</div>
            {orderProducts.map((orderProduct) => (
              <div key={orderProduct.id}>
                <OrderProductCard
                  id={orderDetails.id}
                  title={orderProducts.title}
                  image_url={orderProducts.image_url}
                  quantity={orderProducts.quantity}
                  price={orderProducts.price}
                />
              </div>
            ))}
            <Button
              onClick={() => {
                router.push('/createOrder');
              }}
            >
              Checkout
            </Button>
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
      image_url: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default Cart;
