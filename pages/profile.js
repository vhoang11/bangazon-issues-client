/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getProductsBySellerId } from '../utils/data/productData';
import ProductCard from '../components/products/ProductCard';

const Profile = () => {
  const { user } = useAuth(); // retrieves user object from the useAuth hook
  const router = useRouter();
  const [sellerProducts, setSellerProducts] = useState([]);

  const displayProducts = () => {
    getProductsBySellerId(user.sellerId).then((data) => setSellerProducts(data));
  };

  useEffect(() => {
    displayProducts();
  }, [user]);

  return (
    <div className="mt-5 d-flex flex-wrap" id="creator-page">
      <div className="d-flex flex-column">
        <img src={user.profile_image_url} alt={user.user_name} style={{ width: '400px', marginRight: '100px' }} />
      </div>

      <div className="text-grey ms-5 details" style={{ marginTop: '80px', width: '600px' }}>
        <h1>{user.first_name} {user.last_name}</h1>
        <h4>{user.email}</h4>
        <p>{user.bio}</p>
        <Button
          onClick={() => {
            router.push(`/profile/edit/${user.id}`);
          }}
          style={{
            marginRight: '10px', backgroundColor: '#6699CC', fontSize: '10px', width: '90px',
          }}
        >
          Edit Profile
        </Button>
        <Button
          onClick={() => {
            router.push('/products/new');
          }}
          style={{
            marginRight: '10px', backgroundColor: '#6699CC', fontSize: '10px', width: '100px',
          }}
        >
          Add a Product
        </Button>
      </div>

      <div>
        <h2 style={{ marginTop: '50px' }}>Inventory</h2>
      </div>

      <div className="text-center my-4" id="products-section">
        {sellerProducts.map((product) => (
          <section key={`product--${product.id}`} className="product">
            <ProductCard
              id={product.id}
              sellerId={product.seller_id}
              title={product.title}
              description={product.description}
              image_url={product.image_url}
              price={product.price}
              createdOn={product.createdOn}
              onUpdate={displayProducts}
            />
          </section>
        ))}
      </div>

    </div>
  );
};

export default Profile;
