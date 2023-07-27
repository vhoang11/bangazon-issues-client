/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { deleteProduct, getSingleProduct } from '../../utils/data/productData';

function ProductDetails({ onAdd }) {
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState('');
  const [seller, setSeller] = useState('');
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

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
                style={{ margin: '10px', backgroundColor: '#003049' }}
                onClick={deleteThisProduct}
              >
                Delete
              </Button>
              <Button
                style={{ margin: '10px', backgroundColor: '#003049' }}
                onClick={() => {
                  router.push(`/products/edit/${id}`);
                }}
              >
                Edit Product
              </Button>
            </>
          ) : ''}
        <Button
          style={{ margin: '10px', backgroundColor: '#003049' }}
          onClick={onAdd}
        >
          Add To Cart
        </Button>
        <Button
          style={{ margin: '10px', backgroundColor: '#003049' }}
          onClick={() => {
            router.push(`/reviews/${id}`);
          }}
        >
          Reviews
        </Button>
      </div>
    </div>
  );
}

ProductDetails.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default ProductDetails;
