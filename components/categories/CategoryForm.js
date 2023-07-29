/* eslint-disable react/forbid-prop-types */
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createCategory } from '../../utils/data/categoryData';

const initialState = {
  label: '',
};

export default function CategoryForm({ obj }) {
  const [formInput, setformInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) setformInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();

    const category = {
      label: formInput.label,
    };

    // Send POST request to your API
    createCategory(category).then(() => router.push('/categories'));
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

          <Form.Label>Label</Form.Label>
          <Form.Control
            type="text"
            name="label"
            value={formInput.label}
            onChange={handleChange}
            required
          />

        </Form.Group>

        <Button
          style={{ backgroundColor: '#6699CC' }}
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </>
  );
}

CategoryForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  }),
};

CategoryForm.defaultProps = {
  obj: initialState,
};
