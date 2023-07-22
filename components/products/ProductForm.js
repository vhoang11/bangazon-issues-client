/* eslint-disable react/forbid-prop-types */
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

import { useAuth } from '../../utils/context/authContext';
import { createProduct, updateProduct } from '../../utils/data/productData';
import { getCategories } from '../../utils/data/categoryData';

const initialState = {
  category_id: '',
  title: '',
  imageUrl: '',
  description: '',
  price: 0,
};

const ProductForm = ({ obj }) => {
  const [categories, setCategories] = useState([]);
  /*
  Since the input fields are bound to the values of
  the properties of this state variable, you need to
  provide some default values.
  */
  const [currentProduct, setCurrentProduct] = useState(initialState);
  const currentDate = new Date().toISOString().split('T')[0];
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) {
      setCurrentProduct({
        id: obj.id,
        category_id: obj.category_id,
        title: obj.title,
        image_url: obj.image_url,
        description: obj.description,
        price: obj.price,
      });
    }
  }, [obj, user]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();
    if (obj.id) {
      const productUpdate = {
        id: currentProduct.id,
        category_id: Number(currentProduct.category_id),
        title: currentProduct.title,
        image_url: currentProduct.image_url,
        description: currentProduct.description,
        price: currentProduct.price,
        seller_id: user.uid,
      };
      updateProduct(productUpdate)
        .then(() => router.push(`/products/${obj.id}`));
    } else {
      const product = {
        category_id: Number(currentProduct.category_id),
        title: currentProduct.title,
        created_on: currentDate.created_on,
        image_url: currentProduct.image_url,
        description: currentProduct.description,
        price: currentProduct.price,
        seller_id: user.uid,
      };

      // Send currentProduct request to your API
      createProduct(product).then(() => router.push('/products/myProducts'));
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">

          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            required
            value={currentProduct.title}
            onChange={handleChange}
          />

          <Form.Label>Image Url</Form.Label>
          <Form.Control
            type="text"
            name="image_url"
            value={currentProduct.image_url}
            onChange={handleChange}
            required
          />
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            style={{ height: '100px' }}
            name="description"
            value={currentProduct.description}
            onChange={handleChange}
            required
          />

          <Form.Label>Category</Form.Label>
          <Form.Select
            aria-label="categoryId"
            name="categoryId"
            onChange={handleChange}
            value={currentProduct.categoryId}
          >
            <option value="">Select a Category</option>
            {
                  categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.label}
                    </option>
                  ))
                }
          </Form.Select>

          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            style={{ height: '100px' }}
            name="price"
            value={currentProduct.price}
            onChange={handleChange}
            required
          />

        </Form.Group>
        {/* TODO: create the rest of the input fields */}

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

ProductForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image_url: PropTypes.string,
    description: PropTypes.string,
    category_id: PropTypes.object,
    created_on: PropTypes.string,
    price: PropTypes.number,
    seller_id: PropTypes.string,
  }),
};

ProductForm.defaultProps = {
  obj: initialState,
};

export default ProductForm;
