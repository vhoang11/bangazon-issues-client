import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getCategories } from '../utils/data/categoryData';
// eslint-disable-next-line import/no-unresolved
import CategoryCard from '../components/categories/categoryCard';

export default function ShowCategories() {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  const getAllCategories = () => {
    getCategories().then(setCategories);
  };

  useEffect(() => {
    getAllCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-center my-4" style={{ marginTop: '100px' }}>
      <Head>
        <title>Categories</title>
      </Head>
      <img src="https://miro.medium.com/max/1400/1*q9BAgCZm5rqunnbmZWweZw.png" alt="hero" style={{ width: '100%' }} />
      <h1 style={{ margin: '50px' }}>Categories</h1>
      <div>
        <div>
          <Button
            style={{
              marginTop: '20px', marginBottom: '20px', marginLeft: '20px', width: '200px', backgroundColor: '#6699CC',
            }}
            className="create-product-button"
            onClick={() => {
              router.push('/categories/new');
            }}
          >
            Create Category
          </Button>
        </div>
      </div>
      <div id="category-section" className="text-center my-4 d-flex">
        {categories.map((category) => (
          <CategoryCard key={category.id} id={category.id} label={category.label} categoryObj={category} onUpdate={getAllCategories} />
        ))}
      </div>

    </div>
  );
}
