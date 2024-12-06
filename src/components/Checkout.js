/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useCart } from "./CartContext";
import { getFunctions, httpsCallable } from "firebase/functions";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getFirestore, addDoc, collection } from "firebase/firestore";



const Checkout = () => {
  const { cartItems, calculateTotal } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  // Firebase functions and Firestore
  const functions = getFunctions();
  const savePaymentData = httpsCallable(functions, "savePaymentData");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return; // Stripe is not ready

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);

    // Create PaymentMethod with Stripe
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error);
      setIsProcessing(false);
    } else {
      // Call Firebase function to create Payment Intent
      try {
        const createPaymentIntent = httpsCallable(functions, "createPaymentIntent");

        const amount = calculateTotal() * 100; // Multiply by 100 to convert to cents
        console.log("Amount being passed:", amount);
        const paymentIntentResponse = await createPaymentIntent({ amount });

        const clientSecret = paymentIntentResponse.data.clientSecret;

        // Confirm the payment with Stripe
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: paymentMethod.id,
          }
        );

        if (confirmError) {
          console.error(confirmError);
          setIsProcessing(false);
        } else {
          // Payment successful
          console.log("Payment successful:", paymentIntent);

          // Save payment data to Firestore
          await savePaymentData({
            paymentIntentId: paymentIntent.id,
            paymentStatus: paymentIntent.status,
            cartItems,
            totalAmount: calculateTotal(),
          });

          setIsProcessing(false);
          alert("Payment Successful! Thank you for your purchase.");
        }
      } catch (error) {
        console.error(error);
        setIsProcessing(false);
      }
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <CardElement />
        </div>
        <div>
        <h3>Total: ${parseFloat(calculateTotal()).toFixed(2)}</h3>
        </div>
        <button type="submit" disabled={isProcessing || !stripe}>
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default Checkout;