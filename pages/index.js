import { useEffect, useState } from 'react';
import CategoryCard from '../components/categories/CategoryCard';
import { getCategories } from '../utils/data/categoryData';

function Home() {
  const [categories, setCategories] = useState([]);

  const getAllCategories = () => {
    getCategories().then(setCategories);
  };

  useEffect(() => {
    getAllCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>

      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
      >
        <img src="https://cdn.shopify.com/s/files/1/2074/0733/files/Clothing_Rental_Invidual_.005_1024x1024.jpg?v=1620288779" alt="hero" style={{ width: '100%', marginTop: '50px' }} />
      </div>

      <div id="category-section" className="text-center my-4 d-flex">
        {categories.map((category) => (
          <CategoryCard key={category.id} id={category.id} label={category.label} categoryObj={category} onUpdate={getAllCategories} />
        ))}
      </div>
    </>
  );
}

export default Home;
