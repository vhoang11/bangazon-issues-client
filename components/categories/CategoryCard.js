/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
// import Link from 'next/link';
import { useRouter } from 'next/router';

const CategoryCard = ({
  id,
  label,
}) => {
  const router = useRouter();
  return (
    <>
      <Card style={{ marginBottom: '30px' }}>
        {/* <Link passHref href=/categories/${key}>
      <Card.Text>{label}</Card.Text>
    </Link> */}
        <Button
          style={{ backgroundColor: '#003049', padding: '20px' }}
          onClick={() => {
            router.push(`/categories/${id}`);
          }}
        >
          {label}
        </Button>
      </Card>
    </>
  );
};

CategoryCard.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

export default CategoryCard;
