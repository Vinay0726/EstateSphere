import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";
import { FaRuler, FaBed, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";


const PropertyRecommendations = ({
  propertyType,
  transactionType,
  maxAreaSize,
  city,
  maxP,
}) => {
  console.log("checking propertytype", propertyType);
  console.log("checking transactionType", transactionType);
  console.log("checking maxAreaSize", maxAreaSize);
  console.log("checking city", city);
  console.log("checking price", maxP);

  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    propertyType: propertyType,
    transactionType: transactionType,
    minAreaSize: 0,
    maxAreaSize: maxAreaSize,
    noOfBhk: "",
    minPrice: 0,
    maxPrice: maxP - 1,
    amenities: [],
    city: city,
  });

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const handlePropertyClick = (e, propertyId) => {
    e.preventDefault(); // Prevents default behavior (like full page reload)
    navigate(`/buyer/property/${propertyId}`);
    window.location.reload();
  };
  const fetchProperties = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.get(
        `${API_BASE_URL}/api/properties/searchProperties`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { ...filters, page: 0, size: 5 }, // Fetch more properties for Swiper
        }
      );
      setProperties(response.data.content);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProperties();
  }, [propertyType, transactionType, maxAreaSize, city, maxP]);

  return properties.length > 0 ? (
    <div className="w-full py-8 relative px-4 border shadow-md">
      <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">
        Recommended Properties
      </h2>

      {loading ? (
        <div className="text-center text-lg font-medium">Loading...</div>
      ) : (
        <div className="relative">
          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev flex justify-center items-center top-1/2 absolute left-0 z-10 bg-white rounded-full shadow-lg hover:bg-gray-200 transition">
            <FaChevronLeft className="text-gray-600 text-5xl p-2" />
          </button>
          <button className="swiper-button-next flex justify-center items-center absolute top-1/2 right-0 z-10 bg-white rounded-full shadow-lg hover:bg-gray-200 transition">
            <FaChevronRight className="text-gray-600 text-5xl p-2" />
          </button>

          <Swiper
            slidesPerView={4.5}
            spaceBetween={20}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{ clickable: true }}
            modules={[Pagination, Navigation]}
            className="pb-10"
          >
            {properties.map((property) => (
              <SwiperSlide key={property.id}>
                <div
                  onClick={(e) => handlePropertyClick(e, property.id)}
                  className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                >
                  <img
                    src={
                      property.frontImage
                        ? `${API_BASE_URL}${property.frontImage}`
                        : "https://via.placeholder.com/300"
                    }
                    alt={property.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h5 className="text-lg font-semibold text-gray-900 mb-2">
                      {property.name}
                    </h5>
                    <p className="text-gray-600 font-medium">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                      }).format(property.price)}
                    </p>
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center text-gray-600">
                        <FaRuler className="text-lg mr-2" />
                        <p className="font-medium">
                          {property.areaSize} sq.ft.
                        </p>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FaBed className="text-lg mr-2" />
                        <p className="font-medium">{property.noOfBhk} BHK</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  ) : null; // Don't render anything if properties are not found
};

export default PropertyRecommendations;
