import { useState, useEffect } from 'react';
import { getAllProducts } from '../utils/data/productData';
// eslint-disable-next-line import/no-cycle
import ProductCard from '../components/products/ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const displayProducts = () => {
    getAllProducts().then((data) => setProducts(data));
  };

  useEffect(() => {
    getAllProducts().then((data) => setProducts(data));
  }, []);

  const productsArray = products.map((product) => (
    <section key={`product--${product.id}`}>
      <ProductCard
        id={product.id}
        title={product.title}
        image_url={product.image_url}
        price={product.price}
        onUpdate={displayProducts} // Assuming you have this function defined
        UserId={product.seller_id}
      />
    </section>
  ));

  return (
    <div>
      {/* Render the list of product cards */}
      {productsArray}
    </div>
  );
};

function getProductData(id) {
  const productData = ProductList.find((product) => product.id === id);

  if (productData === undefined) {
    console.log(`Product data does not exist for ID: ${id}`);
    return undefined;
  }

  return productData;
}

export { ProductList, getProductData };
