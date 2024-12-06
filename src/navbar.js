import React from "react";
import { useCart } from "./components/CartContext";
import { useNavigate } from "react-router-dom";
//import { FaShoppingCart } from "react-icons/fa"; // Icon library for cart icon
import "./App.css";

const BottomNavBar = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="bottom-nav-bar">
      <div
        className="bottom-nav-bar__icon"
        onClick={() => navigate("/home")}
        aria-label="Home"
      >
        Home
      </div>
      <div
        className="bottom-nav-bar__icon"
        onClick={() => navigate("/cart")} // Updated navigation method
        aria-label="Cart"
      >
        Cart
        {cartCount > 0 && (
          <div className="bottom-nav-bar__cart-count">{cartCount}</div>
        )}
      </div>
    </div>
  );
};

export default BottomNavBar;
