/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { deleteProduct, getSingleProduct } from '../../utils/data/productData';

function ProductDetails() {
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
  const deletethisPost = () => {
    if (window.confirm('Delete your Post?')) {
      deleteProduct(id).then(() => router.push('/products'));
    }
  };
  return (
    <>
      <h1 style={{ marginTop: '30px' }}> Title: {product.title}</h1>
      <h3>Posted: {product.created_on}</h3>
      <h4 style={{ marginBottom: '30px' }}>Category: {category}</h4>
      <img src={product.image_url} />
      <h4 style={{ marginTop: '20px', marginBottom: '20px' }}>Price: ${product.price}</h4>
      <p style={{ marginTop: '10px', marginBottom: '10px' }}>{product.description}</p>
      {seller === user.uid
        ? (
          <>
            <Button
              style={{ margin: '10px', backgroundColor: '#003049' }}
              onClick={deletethisPost}
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
        onClick={() => {
          router.push(`/reviews/${id}`);
        }}
      >
        Reviews
      </Button>
    </>
  );
}

export default ProductDetails;
