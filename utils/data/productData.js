/* eslint-disable camelcase */
import { clientCredentials } from '../client';

const getAllProducts = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});
const getMyProducts = (seller_id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const usersProducts = Object.values(data).filter((item) => item.sellerId === seller_id);
      resolve(usersProducts);
    })
    .catch(reject);
});
const getSingleProduct = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getProductsByCategory = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const usersProducts = Object.values(data).filter((item) => item.category_id.id === id);
      resolve(usersProducts);
    })
    .catch(reject);
});

const deleteProduct = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve((data)))
    .catch(reject);
});
const updateProduct = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(resolve)
    .catch(reject);
});
const createProduct = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products`, {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// eslint-disable-next-line camelcase
const getProductsBySellerId = (seller_id) => new Promise((resolve, reject) => {
  // eslint-disable-next-line camelcase
  fetch(`${clientCredentials.databaseURL}/products?sellerId=${seller_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getAllProducts, deleteProduct, getSingleProduct, updateProduct, createProduct, getMyProducts, getProductsByCategory, getProductsBySellerId,
};
