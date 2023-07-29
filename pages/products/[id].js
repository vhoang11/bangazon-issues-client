/* eslint-disable react/destructuring-assignment */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button, Col, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { deleteProduct, getSingleProduct } from '../../utils/data/productData';
import { CartContext } from '../CartContext';

function ProductDetails() {
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState('');
  const [seller, setSeller] = useState('');
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const cart = useContext(CartContext);
  const productQuantity = cart.getProductQuantity(id);

  useEffect(() => {
    getSingleProduct(id).then((data) => {
      setProduct(data);
      setCategory(data.category_id.label);
      setSeller(data.seller_id.uid);
    });
  }, [id]);
  console.warn(product);
  const deleteThisProduct = () => {
    if (window.confirm('Delete your Post?')) {
      deleteProduct(id).then(() => router.push('/products'));
    }
  };
  return (
    <div className="mt-5 d-flex flex-wrap" id="creator-page">

      <div className="d-flex flex-column">
        <img src={product.image_url} alt={product.title} style={{ width: '30rem', margin: '60px' }} />
      </div>
      <div className="text-grey ms-5 details" style={{ marginTop: '80px', width: '600px' }}>
        <h2>
          Title: {product.title}
        </h2>
        <h3>Posted: {product.created_on}</h3>
        <h4 style={{ marginBottom: '30px' }}>Category: {category}</h4>
        <hr />
        <h4 style={{ marginTop: '20px', marginBottom: '20px' }}>Price: ${product.price}</h4>
        <p style={{ marginTop: '10px', marginBottom: '10px' }}>{product.description}</p>

        {seller === user.uid
          ? (
            <>
              <Button
                style={{
                  margin: '10px', backgroundColor: '#6699CC', fontSize: '10px', width: '90px',
                }}
                onClick={deleteThisProduct}
              >
                Delete
              </Button>
              <Button
                style={{
                  margin: '10px', backgroundColor: '#6699CC', fontSize: '10px', width: '90px',
                }}
                onClick={() => {
                  router.push(`/products/edit/${id}`);
                }}
              >
                Edit Product
              </Button>
            </>
          ) : ''}
        { productQuantity > 0
          ? (
            <>
              <Form>
                <Form.Label>In Cart: {productQuantity}</Form.Label>
                <Col>
                  <Button onClick={() => cart.addOneToCart(id)} className="mx-2" style={{ backgroundColor: '#6699CC' }}>+</Button>
                  <Button onClick={() => cart.removeOneFromCart(id)} className="mx-2" style={{ backgroundColor: '#6699CC' }}>-</Button>
                </Col>
              </Form>
              <Button variant="danger" onClick={() => cart.deleteFromCart(id)} className="my-2" style={{ fontSize: '10px' }}>Remove from cart</Button>
            </>
          )
          : (
            <Button
              style={{
                margin: '10px', backgroundColor: '#6699CC', fontSize: '10px', width: '90px',
              }}
              onClick={() => cart.addOneToCart(id)}
            >Add To Cart
            </Button>
          )}
      </div>
    </div>
  );
}

// ProductDetails.propTypes = {
//   onAdd: PropTypes.func.isRequired,
// };

export default ProductDetails;
