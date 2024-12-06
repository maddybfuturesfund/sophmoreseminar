/* eslint-disable react/prop-types */
import React, { createContext, useContext, useState } from "react";
// Create Context
const CartContext = createContext();

// Hook for easier use of CartContext

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add item to cart
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingProduct = prev.find((item) => item.id === product.id);
      if (existingProduct) {
        // If product already exists in cart, increment quantity
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If product is not in cart, add new product
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id); // Remove item if quantity is 0 or less
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const calculateTotal = () => {
    const total = cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
      return parseFloat(total);
  };



  // Cart length
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        calculateTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
