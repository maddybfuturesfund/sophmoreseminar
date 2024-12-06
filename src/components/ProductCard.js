/* eslint-disable react/prop-types */
import React from "react";
import { useCart } from "./CartContext";
//import PropTypes from "prop-types";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  if (!product) {
    console.error("Product is undefined in ProductCard");
    return null; // Render nothing if product is missing
  }
  const { name, price } = product;

  return (
    <div className="product-card">
      <div className="product-info">
        <h3>{name}</h3>
        <p>${price}</p>
      </div>
      <button className="add-to-cart-button" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
