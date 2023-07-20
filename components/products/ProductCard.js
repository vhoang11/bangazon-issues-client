/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { deleteProduct } from '../../utils/data/productData';

const ProductCard = ({
  id,
  title,
  created_on,
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
    <Card className="text-center" style={{ width: '220px' }}>
      <Card.Img variant="top" src={image_url} alt={title} style={{ height: '250px' }} />
      <Card.Header>{title}</Card.Header>
      <Card.Body style={{ height: '100px' }}>
        <Card.Title style={{ fontSize: '14px' }}>Price: {price}</Card.Title>
        <Card.Text style={{ fontSize: '12px' }}>Created On: {created_on}
        </Card.Text>
      </Card.Body>
      <div className="d-flex">
        {/* <Button
          onClick={() => {
            router.push(`/users/edit/${id}`);
          }}
          style={{
            margin: '10px', backgroundColor: '#6699CC', fontSize: '10px', width: '75px',
          }}
        >
          Edit User
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
  created_on: PropTypes.number.isRequired,
  image_url: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ProductCard;
