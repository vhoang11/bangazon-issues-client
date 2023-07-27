/* eslint-disable react/destructuring-assignment */
import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from '../../pages/CartContext';
import { getProductData } from '../../pages/productStore';

function CartProduct(props) {
  const cart = useContext(CartContext);
  const { id } = props;
  const { quantity } = props;
  const productData = getProductData(id);

  return (
    <>
      <h3>{productData.title}</h3>
      <p>{quantity} total</p>
      <p>${ (quantity * productData.price).toFixed(2) }</p>
      <Button size="sm" onClick={() => cart.deleteFromCart(id)}>Remove</Button>
      <hr />
    </>
  );
}

CartProduct.propTypes = {
  id: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default CartProduct;
