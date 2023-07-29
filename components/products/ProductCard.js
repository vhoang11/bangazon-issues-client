/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
import {
  Card, Button, Form, Col,
} from 'react-bootstrap';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { CartContext } from '../../pages/CartContext';

function ProductCard({
  id,
  title,
  price,
  image_url,
}) { // props.product is the product we are selling
  // eslint-disable-next-line react/prop-types
  const cart = useContext(CartContext);
  const router = useRouter();
  const productQuantity = cart.getProductQuantity(id);
  console.log(cart.items);
  return (
    <Card className="text-center" style={{ width: '240px', margin: '20px' }}>
      <Card.Img variant="top" src={image_url} alt={title} style={{ height: '300px' }} />
      <Card.Body>
        <Card.Title style={{ height: '100px' }}>{title}</Card.Title>
        <Card.Text>${price}</Card.Text>
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
          { productQuantity > 0
            ? (
              <>
                <Form>
                  <Form.Label>In Cart: {productQuantity}</Form.Label>
                  <Col>
                    <Button onClick={() => cart.addOneToCart(id)} className="mx-2">+</Button>
                    <Button onClick={() => cart.removeOneFromCart(id)} className="mx-2">-</Button>
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
      </Card.Body>
    </Card>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default ProductCard;
