import React from "react";
import { FaTimesCircle } from "react-icons/fa";

const CancelPayment = () => {
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg text-center">
      <div className="text-red-600 text-4xl mb-4">
        <FaTimesCircle />
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Payment Canceled
      </h2>
      <p className="text-gray-600 mb-4">
        Your payment has been canceled. Please try again later.
      </p>

      <div className="mt-6">
        <a
          href="/"
          className="text-blue-600 hover:text-blue-800 text-lg font-medium"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default CancelPayment;
