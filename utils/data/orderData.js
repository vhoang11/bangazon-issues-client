import { clientCredentials } from '../client';

const getOrderByCustomerId = (customerId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders?customerId=${customerId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export default getOrderByCustomerId;
