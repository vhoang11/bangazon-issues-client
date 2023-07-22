/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { deleteProduct } from '../../utils/data/productData';

const ProductCard = ({
  id,
  title,
  image_url,
  price,
  onUpdate,
}) => {
  const router = useRouter();
  const deleteThisProduct = () => {
    if (window.confirm('Delete user?')) {
      deleteProduct(id).then(() => onUpdate());
    }
  };

  return (
    <Card className="text-center" style={{ width: '240px', margin: '20px' }}>
      <Card.Img variant="top" src={image_url} alt={title} style={{ height: '300px' }} />
      <Card.Header style={{ height: '100px' }}>{title}</Card.Header>
      <Card.Body style={{ height: '50px' }}>
        <Card.Title style={{ fontSize: '14px' }}>Price: {price}</Card.Title>
      </Card.Body>
      <div className="d-flex">
        {/* <Button
          onClick={() => {
            router.push(`/products/edit/${id}`);
          }}
          style={{
            margin: '10px', backgroundColor: '#6699CC', fontSize: '10px', width: '75px',
          }}
        >
          Edit
        </Button> */}
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
          onClick={deleteThisProduct}
          style={{
            margin: '10px', backgroundColor: '#6699CC', fontSize: '10px', width: '75px',
          }}
        >
          Delete
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
  onUpdate: PropTypes.func.isRequired,
};

export default ProductCard;
