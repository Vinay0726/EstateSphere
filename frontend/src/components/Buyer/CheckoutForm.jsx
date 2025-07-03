import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../config/AxiosHelper";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../Store/State/BuyerAuth/Action";

const CheckoutForm = ({ sellerId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState(1000); // Default amount
  const [token, setToken] = useState(localStorage.getItem("jwt") || ""); // Default token from localStorage

  
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  console.log("for checkout data getting",auth)

  const email=auth?.user?.email;
 
 const sender = `${auth?.user?.firstName} ${auth?.user?.lastName}`;

  
  // Fetch user details on mount
  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [dispatch, jwt]);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!token) {
        throw new Error("No authentication token found. Please log in.");
      }

      const response = await axios.post(
        `${baseURL}/api/payments/create-checkout-session`,
        {
          customerName: sender, // Dynamic customer name
          customerEmail: email, // Dynamic email
          sellerId: `${sellerId}`,
          amount: amount, // Use dynamic amount
          successUrl: `http://localhost:5173/buyer/success/${sellerId}`,
          cancelUrl: "http://localhost:5173/buyer/cancel",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const url = response.data;

      if (url) {
        window.location.href = url; // Redirect to Stripe Checkout
      } else {
        throw new Error("Failed to retrieve checkout URL.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="mb-6">
        
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-600"
        >
          Amount
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={handleCheckout}
        disabled={loading}
        className={`w-full p-3 text-white font-semibold rounded-md ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        } transition-all duration-300`}
      >
        {loading ? "Redirecting..." : "Proceed to Payment"}
      </button>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
    </div>
  );
};

export default CheckoutForm;
