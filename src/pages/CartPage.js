import React from "react";
import { useCart } from "../components/CartContext";
import { useNavigate } from "react-router-dom";


const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, calculateTotal } =
    useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    // Save the totalAmount in localStorage (or pass it via context)
    localStorage.setItem("totalAmount", calculateTotal); // Store in localStorage for persistence
    navigate("/checkout"); // Navigate to the checkout page
  };

  return (
    <div className="cart-page">
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="cart-item__image"
              />
              <div className="cart-item__details">
                <h4>{item.name}</h4>
                <p>${item.price}</p>
                <div className="cart-item__quantity">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="cart-item__remove"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <p>Total: ${calculateTotal()}</p>
            <button onClick={handleCheckout}>Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
