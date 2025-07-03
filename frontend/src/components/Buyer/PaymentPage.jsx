import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";


// Load your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentPage = ({sellerId}) => {
   
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm sellerId={sellerId} />
    </Elements>
  );
};

export default PaymentPage;
