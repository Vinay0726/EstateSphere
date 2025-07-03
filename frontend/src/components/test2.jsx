import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "@mui/material";
import { API_BASE_URL } from "../../config/apiConfig";
import { FiFilter } from "react-icons/fi";
import { BiSearch, BiMicrophone } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBed, FaRuler } from "react-icons/fa";
import { LiaRupeeSignSolid } from "react-icons/lia";

const FilterAndProperties = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const propertyTypeFromQuery = queryParams.get("");
  const [filters, setFilters] = useState({
    propertyType: propertyTypeFromQuery || "",
    transactionType: "",
    minAreaSize: 0,
    maxAreaSize: 100000000,
    noOfBhk: "",
    minPrice: 0,
    maxPrice: 99999999,
    amenities: [],
    city: "",
  });
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceInput, setVoiceInput] = useState("");

  const cities = ["Nagpur", "Pune", "Mumbai", "Amravati"];
  const amenitiesList = [
    "Gym",
    "Pool",
    "Parking",
    "Playground",
    "24/7 Water",
    "24/7 Electricity Supply",
  ];
  const propertyTypes = ["Flat", "House", "Plot", "PG"];
  const bhkOptions = ["1 BHK", "2 BHK", "3 BHK"];
  // Load the API key from the .env file
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  const fetchProperties = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.get(
        `${API_BASE_URL}/api/properties/searchProperties`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { ...filters, page: page - 1, size: 9 },
        }
      );
      setProperties(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    if (propertyTypeFromQuery) {
      setFilters((prev) => ({ ...prev, propertyType: propertyTypeFromQuery }));
    }
  }, [propertyTypeFromQuery]);

  useEffect(() => {
    fetchProperties();
  }, [filters, page]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmenitiesChange = (e) => {
    const { value, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, value]
        : prev.amenities.filter((amenity) => amenity !== value),
    }));
  };

  const handleFilterSubmit = () => {
    setPage(1);
    fetchProperties();
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleVoiceSearch = () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setVoiceInput(transcript);
      setListening(false);
      updateFiltersFromVoiceInput(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Voice recognition error:", event.error);
      setListening(false);
    };
  };

  const updateFiltersFromVoiceInput = async (transcript) => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Extract the main property filters from the following sentence: ${transcript}`,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch response from Google Gemini API");
      }

      const data = await response.json();
      const extractedFilters = parseFiltersFromGeminiResponse(data);
      setFilters((prev) => ({ ...prev, ...extractedFilters }));
    } catch (error) {
      console.error("Error updating filters from voice input:", error);
    }
  };

  const parseFiltersFromGeminiResponse = (data) => {
    // Implement logic to parse the response from Gemini API and return the filters
    // This is a placeholder function, you need to implement the actual parsing logic
    return {
      city: "Mumbai",
      minPrice: 100000,
      maxPrice: 500000,
      propertyType: "Flat",
    };
  };

  return (
    <div className="container mx-auto p-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filter Box */}
        <div className="col-span-1 bg-white shadow-lg rounded-lg p-6 sticky top-4 h-max border border-gray-200">
          <div className="flex items-center mb-6">
            <FiFilter size={28} className="mr-3 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">
              Filter Properties
            </h2>
          </div>

          {/* Voice Search */}
          <div className="mb-6">
            <button
              onClick={handleVoiceSearch}
              className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold flex items-center justify-center hover:bg-blue-700 transition-colors"
            >
              <BiMicrophone className="mr-2" />
              {listening ? "Listening..." : "Voice Search"}
            </button>
          </div>

          {/* Filter Form */}
          <div className="grid grid-cols-1 gap-6">
            {/* City Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                City
              </label>
              <select
                name="city"
                value={filters.city}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Price Range
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  name="minPrice"
                  min="500"
                  max="30000"
                  value={filters.minPrice}
                  onChange={handleInputChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  {filters.minPrice}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <input
                  type="range"
                  name="maxPrice"
                  min="500"
                  max="5000005"
                  value={filters.maxPrice}
                  onChange={handleInputChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  {filters.maxPrice}
                </span>
              </div>
            </div>

            {/* Area Size */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Area Size (sq.ft.)
              </label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  name="minAreaSize"
                  value={filters.minAreaSize}
                  onChange={handleInputChange}
                  placeholder="Min"
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  name="maxAreaSize"
                  value={filters.maxAreaSize}
                  onChange={handleInputChange}
                  placeholder="Max"
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Property Type
              </label>
              <select
                name="propertyType"
                value={filters.propertyType}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Transaction Type */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Transaction Type
              </label>
              <select
                name="transactionType"
                value={filters.transactionType}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Rent">Rent</option>
                <option value="Sell">Sell</option>
              </select>
            </div>

            {/* No. of BHK */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                No. of BHK
              </label>
              <select
                name="noOfBhk"
                value={filters.noOfBhk}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {bhkOptions.map((option, index) => (
                  <option key={index} value={index + 1}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Apply Filters Button */}
          <button
            onClick={handleFilterSubmit}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold flex items-center justify-center hover:bg-blue-700 transition-colors"
          >
            <BiSearch className="mr-2" /> Apply Filters
          </button>
        </div>

        {/* Properties */}
        <div className="col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full text-center">
                <p>Loading...</p>
              </div>
            ) : properties.length === 0 ? (
              <div className="col-span-full text-center">
                <p>No properties found.</p>
              </div>
            ) : (
              properties.map((property) => (
                <div
                  onClick={() => navigate(`/buyer/property/${property.id}`)}
                  className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                  key={property.id}
                >
                  <img
                    src={
                      property.frontImage
                        ? `${API_BASE_URL}${property.frontImage}`
                        : "https://via.placeholder.com/150"
                    }
                    alt={property.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-5">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <h5 className="text-xl font-semibold text-gray-900 mb-2">
                          {property.name}
                        </h5>
                        <div className="flex items-center text-gray-600">
                          <p className="font-medium">
                            {new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: "INR",
                            }).format(property.price)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-gray-600 mb-3">
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
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterAndProperties;
