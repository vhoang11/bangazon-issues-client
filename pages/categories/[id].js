/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getSingleCategory } from '../../utils/data/categoryData';
import { getProductsByCategory } from '../../utils/data/productData';
import ProductCard from '../../components/products/ProductCard';

function CategoryDetails() {
  const [product, setProduct] = useState([]);
  // const [category, setCategory] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleCategory(id).then((data) => {
      getProductsByCategory(data.id).then((products) => setProduct(products));

      // setCategory(data[0]);
    });
  }, [id]);
  console.warn(product);

  return (
    <div className="text-center my-4" style={{ marginTop: '100px' }}>
      <Head>
        <title>Category</title>
      </Head>
      <div className="text-center my-4" id="category-section">
        {product.map((products) => (

          <section key={`product--${product.id}`}>
            <ProductCard id={products.id} title={products.title} image_url={products.image_url} price={products.price} UserId={products.seller_id} />
          </section>
        ))}
      </div>

    </div>
  );
}

export default CategoryDetails;
