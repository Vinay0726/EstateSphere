import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  FaChevronLeft,
  FaChevronRight,
  FaRegHeart,
  
} from "react-icons/fa";
import { API_BASE_URL } from "../config/apiConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../Store/State/BuyerAuth/Action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthModel from "./Buyer/AuthModel";
import QRScanner from "./Buyer/QRScanner";

const PropertyListing = () => {
  const [properties, setProperties] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Nagpur");
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const carouselRef = useRef(null);
  const navigate=useNavigate();

   const jwt = localStorage.getItem("jwt");
   const { auth } = useSelector((store) => store);

   console.log("userdata",auth)

   const dispatch = useDispatch();

  const cardWidth = 250; // Adjust based on card size
  const visibleCards = 4.5; // Number of cards to display (4 full + 2 half)
  const scrollAmount = cardWidth * 4; // Scroll by 4 cards


const openAuthModal = () => setIsAuthModalOpen(true);
const closeAuthModal = () => setIsAuthModalOpen(false);
   // Fetch user details on mount
    useEffect(() => {
      if (jwt) {
        dispatch(getUser(jwt));
      }
    }, [dispatch, jwt]);
  // Fetch properties from the API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/properties/getAll`
        );
        console.log("getting data from api",response.data)
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  // Handle left scroll
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Handle right scroll
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleFavorite = async (propertyId) => {
    try {
      const userId = auth.user.id; // Replace with actual user ID
      console.log("user id",userId)
      const token = localStorage.getItem("jwt"); // Retrieve token from localStorage or context

      const response = await axios.post(
        `${API_BASE_URL}/api/favorites`,
        {
          userId,
          propertyId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add JWT to the Authorization header
          },
        }
      );

      console.log("Favorite added:", response.data);
      toast.success("Property added to favorites!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error adding to favorites:", error);
      toast.error("Failed to add property to favorites!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };



   const [isPopupOpen, setIsPopupOpen] = useState(false);

   const handleQRCodeClick = () => {
     setIsPopupOpen(true); // Open the popup
   };

   const closePopup = () => {
     setIsPopupOpen(false); // Close the popup
   };
  return (
    <div className="bg-gray-50 p-6 rounded-lg sm:px-10 lg:px-24">
      {/* Title Section */}
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Properties Available in</h2>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="border rounded-md px-2 py-1 text-sm mt-2 lg:mt-0"
        >
          <option value="Nagpur">Nagpur</option>
          <option value="Pune">Pune</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Amravati">Amravati</option>
        </select>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        <div
          ref={carouselRef}
          id="carousel"
          className="flex overflow-x-scroll scrollbar-hide px-6"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {properties
            .filter((property) => property.city === selectedCity)
            .reverse()
            .slice(0, 12)
            .map((property) => (
              <div
                key={property.id}
                className="p-2 flex-none"
                style={{ width: cardWidth }}
              >
                <div className="bg-white  border rounded-lg shadow-sm overflow-hidden cursor-pointer relative">
                  {/* Image Section */}
                  <div className="relative">
                    <img
                      onClick={() => {
                        const jwt = localStorage.getItem("jwt"); // Check JWT
                        if (!jwt) {
                          setIsAuthModalOpen(true);
                          navigate("/login"); // Redirect to login
                        } else {
                          navigate(`/buyer/property/${property.id}`); // Navigate to property page
                        }
                      }}
                      src={
                        property.frontImage
                          
                      }
                      alt={property.name}
                      className="w-full h-48 object-cover"
                    />
                    {/* Tag or Label */}
                    <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full shadow-sm">
                      {property.propertyType}
                    </span>
                    {/* Favorite Button */}
                    <button
                      className="absolute top-2 right-2 bg-white rounded-full shadow-lg p-2 text-gray-600 hover:text-red-500 transition-all"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the card click event
                        handleFavorite(property.id); // Pass property.id to the handler
                      }}
                    >
                      <FaRegHeart size={16} />
                    </button>
                  </div>

                  {/* Content Section */}
                  <div className="p-4 flex  justify-between">
                    {/* Left Section: Property Name and City */}
                    <div className="flex flex-col">
                      {/* Property Name */}
                      <h3 className="font-bold text-lg truncate">
                        {property.name}
                      </h3>
                      {/* Location */}
                      <p className="text-sm text-gray-500 mt-1 truncate">
                        {property.city}
                      </p>
                    </div>

                    {/* Right Section: QR Code */}
                    <button
                      className="text-gray-600 hover:text-blue-500 transition-all"
                      onClick={handleQRCodeClick}
                    >
                      <img
                        src="qrscan.png"
                        className="h-20 w-20"
                        alt="QR Code"
                      />
                    </button>

                    {/* Popup */}
                    {isPopupOpen && (
                      <div className="fixed inset-0 bg-transparent  backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 border shadow-lg relative ">
                          {/* Close Button */}
                          <button
                            className="absolute top-2 text-4xl right-2 text-gray-400 hover:text-gray-600"
                            onClick={closePopup}
                          >
                            &times;
                          </button>

                          {/* Pass Property ID to QRScanner Component */}
                          <QRScanner propertyId={property.id} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Carousel Controls */}
        <button
          id="prevBtn"
          onClick={scrollLeft}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-200  rounded-full p-2 shadow-md"
        >
          <FaChevronLeft />
        </button>
        <button
          id="nextBtn"
          onClick={scrollRight}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-200  rounded-full p-2 shadow-md"
        >
          <FaChevronRight />
        </button>
      </div>
      <AuthModel open={isAuthModalOpen} handleClose={closeAuthModal} />
    </div>
  );
};

export default PropertyListing;
