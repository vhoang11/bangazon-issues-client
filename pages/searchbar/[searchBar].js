/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../utils/data/productData';
import ProductCard from '../../components/products/ProductCard';

export default function SearchBar() {
  const [searchProducts, setSearchProducts] = useState([]);

  const router = useRouter();
  const { searchBar } = router.query;

  const searchAllProducts = () => {
    getAllProducts().then((products) => {
      const filteredProducts = products.filter((product) => product.title.toLowerCase().includes(searchBar) || product.description.toLowerCase().includes(searchBar) || product.description.includes(searchBar) || product.timestamp.includes(searchBar));

      setSearchProducts(filteredProducts);
    });
  };

  useEffect(() => {
    searchAllProducts();
    return () => {
      setSearchProducts([]);
    };
  }, [searchBar]);

  return (
    <>
      <div id="search-title">
        <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Search Results</h2>
      </div>
      {searchProducts.length === 0 ? (
        <p style={{
          textAlign: 'center', marginTop: '50px', backgroundColor: 'rgba(255,255,255, 0.5)', padding: '50px',
        }}
        >No Search Results Found
        </p>
      ) : (
        <div className="d-flex flex-wrap text-center" id="search-results" style={{ marginTop: '50px', padding: '30px', backgroundColor: 'rgba(255,255,255, 0.5)' }}>
          {searchProducts.map((product) => <ProductCard key={product.id} product={product} onUpdate={searchProducts} />)}
        </div>
      )}
    </>
  );
}
