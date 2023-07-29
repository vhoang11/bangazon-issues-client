import { Col, Row } from 'react-bootstrap';
import { productsArray } from '../utils/data/productStore';
import ProductCard from '../components/products/ProductCard';

// [{... }, {... }, {... }]
function Store() {
  return (
    <>
      <h1 className="p-3">Welcome to the store!</h1>
      <Row xs={1} md={3} className="g-4">
        {productsArray.map((product, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <Col align="center" key={idx}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Store;
