import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaCheckCircle, FaPhoneAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios"; // Import Axios
import { API_BASE_URL } from "../../config/apiConfig";

const PaymentSuccess = () => {
  const { sellerId } = useParams(); // Fetch sellerId from the URL params
  const [user, setUser] = useState(null); // State to store user data
  const [loading, setLoading] = useState(true); // State for loading state
  const [error, setError] = useState(null); // State for error handling

  

  useEffect(() => {
    const token = localStorage.getItem("jwt"); // Or use sessionStorage or context

    if (token) {
      axios
        .get(`${API_BASE_URL}/api/user/${sellerId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach JWT token to the Authorization header
          },
        })
        .then((response) => {
          setUser(response.data); // Save fetched data to the state
          setLoading(false); // Stop loading
        })
        .catch((err) => {
          setError("Error fetching user data");
          setLoading(false); // Stop loading on error
        });
    } else {
      setError("No JWT token found");
      setLoading(false); // Stop loading if token is not found
    }
  }, [sellerId]);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>{error}</div>; // Error state
  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-green-100 to-blue-200">
      <div className="w-full max-w-4xl p-8 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 shadow-2xl rounded-lg text-center space-y-8">
        <div className="text-green-300 text-7xl mb-6 animate-bounce">
          <FaCheckCircle />
        </div>

        <h2 className="text-5xl font-bold text-white mb-4 transition-all duration-300 hover:text-gray-200">
          Payment Successful!
        </h2>
        <p className="text-lg text-white mb-8 opacity-80">
          Your payment has been successfully processed. Thank you for your
          purchase!
        </p>

        <div className="bg-white p-6 rounded-xl shadow-xl space-y-4">
          <p className="text-md text-gray-500 mb-2 flex items-center justify-center">
            <FaPhoneAlt className="mr-2 text-blue-500" />
            Contact Mobile Number:
          </p>
          <p className="text-2xl font-semibold text-gray-800">
            {user.mobileNumber} {/* Assuming phoneNumber is part of user data */}
          </p>
        </div>

       

        <div className="mt-10">
          <a
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white text-xl py-3 px-8 rounded-full transition-all duration-300 hover:scale-105 transform"
          >
            <FaArrowLeft className="inline mr-2" />
            Go Back
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
