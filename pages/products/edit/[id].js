import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleProduct } from '../../../utils/data/productData';
import ProductForm from '../../../components/products/ProductForm';

export default function EditProduct() {
  const [editProduct, setEditProduct] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleProduct(id).then(setEditProduct);
  }, [id]);

  return (
    <>
      <Head>
        <title>Edit Product</title>
      </Head>
      <div>
        <ProductForm obj={editProduct} />
      </div>

    </>
  );
}
