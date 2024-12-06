//import logo from "./logo.svg";
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BottomNav from "./navbar";
//import Home from "./pages/Home";
//import Search from "./pages/Search";
//import Profile from "./pages/Profile";
import HomePage from "./pages/HomePage";
import { CartProvider } from "./components/CartContext";
import ProductCard from "./components/ProductCard";
import CartPage from "./pages/CartPage";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./components/Checkout";

const stripePromise = loadStripe("pk_test_51QMbjgAs1bp7NQjnem6D1t3fVHoWg2pAAKtWO4zQAMfjP3HWJyDmTTxcpAZy26nak1xKY3MuJLOdW7hv7r1bVT5c006cJdj7WR");



function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route
                path="/checkout"
                element={
                  <Elements stripe={stripePromise}>
                    <Checkout /> {/* The Checkout component wrapped in Elements */}
                  </Elements>
                }
              />
              <Route path="/profile" />
            </Routes>
            <BottomNav />
          </div>
        </Router>
      </CartProvider>
      <ProductCard />
    </>
  );
}

export default App;
