/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
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
  image_url: '',
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
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) {
      setCurrentProduct({
        id: obj.id,
        categoryId: obj.category_id,
        title: obj.title,
        imageUrl: obj.image_url,
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
        categoryId: Number(currentProduct.categoryId),
        title: currentProduct.title,
        imageUrl: currentProduct.imageUrl,
        description: currentProduct.description,
        price: currentProduct.price,
        sellerId: user.id,
      };
      updateProduct(productUpdate)
        .then(() => router.push(`/products/${obj.id}`));
    } else {
      const product = {
        categoryId: Number(currentProduct.categoryId),
        title: currentProduct.title,
        imageUrl: currentProduct.imageUrl,
        description: currentProduct.description,
        price: currentProduct.price,
        sellerId: user.id,
        createdOn: currentProduct.createdOn,
      };
      createProduct(product)
        .then((newProduct) => router.push(`/products/${newProduct.id}`));
      // createProduct(currentRecord)
      //   .then((product) => router.push(`/products/${product.id}`));
    }
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          padding: '30px',
          maxWidth: '700px',
          margin: '0 auto',
        }}
      >
        <Form.Group className="mb-3">

          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            required
            value={currentProduct.title}
            onChange={handleChange}
            style={{
						  marginBottom: '30px',
            }}
          />

          <Form.Label>Image Url</Form.Label>
          <Form.Control
            type="text"
            name="imageUrl"
            value={currentProduct.imageUrl}
            onChange={handleChange}
            required
            style={{
						  marginBottom: '30px',
            }}
          />
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            style={{ height: '100px', marginBottom: '30px' }}
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
            style={{
						  marginBottom: '30px',
            }}
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
            type="number"
            name="price"
            value={currentProduct.price}
            onChange={handleChange}
            required
            style={{
						  marginBottom: '30px',
            }}
          />

        </Form.Group>
        {/* TODO: create the rest of the input fields */}

        <Button type="submit" style={{ backgroundColor: '#6699CC' }}>
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
