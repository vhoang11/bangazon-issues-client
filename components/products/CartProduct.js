/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from '../../pages/CartContext';
import { getProductData } from '../../utils/data/productStore';

function CartProduct({
  id,
  title,
  price,
  image_url,
  quantity,
}) {
  const cart = useContext(CartContext);
  const productData = getProductData(id);

  return (
    <>
      <h3>{title}</h3>
      <p>{image_url}</p>
      <p>{price}</p>
      <p>{quantity} total</p>
      <p>${ (quantity * productData.price).toFixed(2) }</p>
      <Button size="sm" onClick={() => cart.deleteFromCart(id)}>Remove</Button>
      <hr />
    </>
  );
}

CartProduct.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default CartProduct;
