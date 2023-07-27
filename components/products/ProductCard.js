/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

const ProductCard = ({
  id,
  title,
  image_url,
  price,
  onAdd,
}) => {
  const router = useRouter();
  const handleClick = () => {
    onAdd({ id, title, price });
  };

  return (
    <Card className="text-center" style={{ width: '240px', margin: '20px' }}>
      <Card.Img variant="top" src={image_url} alt={title} style={{ height: '300px' }} />
      <Card.Header style={{ height: '100px' }}>{title}</Card.Header>
      <Card.Body style={{ height: '50px' }}>
        <Card.Title style={{ fontSize: '14px' }}>Price: {price}</Card.Title>
      </Card.Body>
      <div className="d-flex">
        <Button
          onClick={() => {
            router.push(`/products/${id}`);
          }}
          style={{
            margin: '10px', backgroundColor: '#6699CC', fontSize: '10px', width: '90px',
          }}
        >
          View
        </Button>
        <Button
          onClick={handleClick}
          style={{
            margin: '10px', backgroundColor: '#6699CC', fontSize: '10px', width: '75px',
          }}
        >
          Add to Cart
        </Button>
      </div>

    </Card>
  );
};

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default ProductCard;
