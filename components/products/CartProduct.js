/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
// import Button from 'react-bootstrap/Button';
// import { useContext, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import { CartContext } from '../../pages/CartContext';
// import { getProductData } from '../../utils/data/productStore';

// function CartProduct({
//   id,
//   title,
//   price,
//   image_url,
//   quantity,
// }) {
//   const cart = useContext(CartContext);
//   // const productData = getProductData(id);
//   const [cartItem, setCartItem] = useState([]);

//   useEffect
//   return (
//     <>
//       <h3>{title}</h3>
//       <p>{image_url}</p>
//       <p>{price}</p>
//       <p>{quantity} total</p>
//       <p>${ (quantity * cartItem.price).toFixed(2) }</p>
//       <Button size="sm" onClick={() => cart.deleteFromCart(id)}>Remove</Button>
//       <hr />
//     </>
//   );
// }

// CartpropTypes = {
//   id: PropTypes.number.isRequired,
//   title: PropTypes.string.isRequired,
//   image_url: PropTypes.string.isRequired,
//   price: PropTypes.number.isRequired,
//   quantity: PropTypes.number.isRequired,
// };

// export default CartProduct;

/* eslint-disable @next/next/no-img-element */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
// import { deleteOrderProduct } from '../../utils/data/orderProductsData';
import { CartContext } from '../../pages/CartContext';

// eslint-disable-next-line no-unused-vars
function CartProduct({
  id,
  title,
  price,
  image_url,
  onUpdate,
}) {
  const cart = useContext(CartContext);
  const removeItem = () => {
    if (window.confirm(`Remove ${title}?`)) {
      cart.deleteFromCart(id).then(() => onUpdate());
    }
  };

  return (
    <Card className="text-center cart-item-card" style={{ width: '18rem', margin: '10px' }}>
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Card.Img src={image_url} alt="product" />
        <h2>Price: ${price}</h2>
      </Card.Body>
      <div>
        <Button type="button" className="m-2" onClick={removeItem}>Remove</Button>
      </div>
    </Card>
  );
}

CartProduct.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image_url: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CartProduct;
