import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getAllProducts } from '../utils/data/productData';
import ProductCard from '../components/products/ProductCard';

function AllProducts() {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    getAllProducts().then((data) => setProducts(data));
  }, []);

  const displayProducts = () => {
    getAllProducts().then((data) => setProducts(data));
  };

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) => (x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x)),
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  return (
    <div className="text-center my-4" style={{ marginTop: '100px' }}>
      <Head>
        <title>Products</title>
      </Head>
      <img src="https://www.raconteur.net/wp-content/uploads/2020/10/img_p12.jpg" alt="hero" style={{ width: '100%' }} />
      <h1 style={{ marginTop: '30px', marginLeft: '20px' }}>All Products</h1>
      <div>
        <div>
          <Button
            style={{
              marginTop: '20px', marginBottom: '20px', marginLeft: '20px', width: '200px', backgroundColor: '#6699CC',
            }}
            className="create-product-button"
            onClick={() => {
              router.push('/products/new');
            }}
          >
            Create Product
          </Button>
        </div>
      </div>
      <div className="text-center my-4" id="products-section">
        {products.map((product) => (

          <section key={`product--${product.id}`}>
            <ProductCard id={product.id} title={product.title} image_url={product.image_url} price={product.price} onUpdate={displayProducts} UserId={product.seller_id} product={product} onAdd={onAdd} />
          </section>

        ))}
      </div>
    </div>
  );
}

// function getProductData(id) {
//   const productData = AllProducts.find((product) => product.id === id);

//   if (productData === undefined) {
//     console.log(`Product data does not exist for ID: ${id}`);
//     return undefined;
//   }

//   return productData;
// }

export default AllProducts;
