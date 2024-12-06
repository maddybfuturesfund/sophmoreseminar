import { getFirestore, addDoc, collection } from "firebase/firestore";

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")("sk_test_51QMbjgAs1bp7NQjnplCIpy4nghbKIMig1gpjEPTcg5LuJRUTKcCwlIvDQQXDl8AtAylTy9JTy46mOi3SK3i0rBI200w1qr3wpY");


admin.initializeApp();

// Create Payment Intent function
exports.createPaymentIntent = functions.https.onCall(async (data, context) => {
  const { amount } = data;
  console.log("Received amount:", amount);
  if (!amount) {
    console.error("Amount is missing!");
    throw new functions.https.HttpsError("invalid-argument", "Amount is required");
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw new functions.https.HttpsError("internal", error.message);
  }
});

// Save Payment Data function
exports.savePaymentData = functions.https.onCall(async (data) => {
  const { paymentIntentId, paymentStatus, cartItems, totalAmount } = data;

  try {
    const paymentRef = await admin.firestore().collection("payments").addDoc({
      paymentIntentId: paymentIntentId,
      paymentStatus: paymentStatus,
      cartItems: cartItems,
      totalAmount: totalAmount,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { success: true };
  } catch (error) {
    console.error("Error saving payment data:", error);
    throw new functions.https.HttpsError("internal", error.message);
  }
});