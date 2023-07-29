import { createContext, useState } from 'react';
import { getProductData } from '../utils/data/productStore';

export const CartContext = createContext({
  items: [],
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
});

// eslint-disable-next-line react/prop-types
export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  // [ { id: 1 , quantity: 3 }, { id: 2, quantity: 1 } ]

  function getProductQuantity(id) {
    const quantity = cartProducts.find((product) => product.id === id)?.quantity;

    if (quantity === undefined) {
      return 0;
    }

    return quantity;
  }

  function addOneToCart(id) {
    const quantity = getProductQuantity(id);

    if (quantity === 0) { // product is not in cart
      setCartProducts(
        [
          ...cartProducts,
          {
            id,
            quantity: 1,
          },
        ],
      );
    } else { // product is in cart
      // [ { id: 1 , quantity: 3 }, { id: 2, quantity: 1 } ]    add to product id of 2
      setCartProducts(
        cartProducts.map(
          (product) => (product.id === id // if condition
            ? { ...product, quantity: product.quantity + 1 } // if statement is true
            : product), // if statement is false
        ),
      );
    }
  }

  function deleteFromCart(id) {
    // [] if an object meets a condition, add the object to array
    // [product1, product2, product3]
    // [product1, product3]
    setCartProducts(
      // eslint-disable-next-line no-shadow
      (cartProducts) => cartProducts.filter((currentProduct) => currentProduct.id !== id),
    );
  }

  function removeOneFromCart(id) {
    const quantity = getProductQuantity(id);

    if (quantity === 1) {
      deleteFromCart(id);
    } else {
      setCartProducts(
        cartProducts.map(
          (product) => (product.id === id // if condition
            ? { ...product, quantity: product.quantity - 1 } // if statement is true
            : product), // if statement is false
        ),
      );
    }
  }

  function getTotalCost() {
    let totalCost = 0;
    // eslint-disable-next-line array-callback-return
    cartProducts.map((cartItem) => {
      const productData = getProductData(cartItem.id);
      totalCost += (productData.price * cartItem.quantity);
    });
    return totalCost;
  }

  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;

// CODE DOWN HERE

// Context (cart, addToCart, removeCart)
// Provider -> gives your React app access to all the things in your context
