/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { deleteOrderProduct, getSingleOrderProduct } from '../../utils/data/orderProductsData';
import { getSingleProduct } from '../../utils/data/productData';

const OrderProductCard = ({
  id,
  onUpdate,
}) => {
  const deleteThisOrderProduct = () => {
    if (window.confirm('Delete Product?')) {
      deleteOrderProduct(id).then(() => onUpdate());
    }
  };

  const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    getSingleProduct(id).then((productData) => {
      setProductDetails(productData);
    });
  }, [id]);

  return (
    <>
      <Card className="text-center">
        <Card.Body>
          <p>{productDetails.image_url}</p>
          <p>Item: {productDetails.title}</p>
          <p>Price: ${productDetails.price}</p>
          <p>Quantity: {productDetails.quantity}</p>
        </Card.Body>
      </Card>
      <Button
        style={{ margin: '10px', backgroundColor: '#003049' }}
        onClick={deleteThisOrderProduct}
      >
        Delete From Cart
      </Button>
    </>
  );
};

OrderProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default OrderProductCard;
