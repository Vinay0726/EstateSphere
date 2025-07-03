import React, { useEffect, useState } from "react";
import PropertyListing from "./PropertyListing";
import TopProperties from "./TopProperties";
import { FaSearch } from "react-icons/fa";
import { API_BASE_URL } from "../config/apiConfig";
import axios from "axios";
import { RxTimer } from "react-icons/rx";
import { BlurCircular, BlurLinear } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import InsightTool from "./InsightTool";

const Hero = () => {
  const [properties, setProperties] = useState([]); // All properties fetched from API
  const [searchTerm, setSearchTerm] = useState(""); // Search term input state
  const [filteredProperties, setFilteredProperties] = useState([]); // Filtered properties state


  const navigate=useNavigate();
  // Debounced version of the search input
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Fetch properties data from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/properties/getAll`
        );
        setProperties(response.data); // Assuming the response contains the list of properties
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  // Debouncing the search term to delay the search API call
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms delay for debouncing

    return () => clearTimeout(timer); // Cleanup on component unmount or searchTerm change
  }, [searchTerm]);

  // Filter properties based on debounced search term
  useEffect(() => {
    if (debouncedSearchTerm) {
      const filtered = properties.filter((property) =>
        property.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setFilteredProperties(filtered.slice(0, 5));
    } else {
      setFilteredProperties([]); // No properties when no search term
    }
  }, [debouncedSearchTerm, properties]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <main>
      <div className="pb-12">
        <div
          className="relative p-5 h-96 flex-wrap sm:px-60 dark:bg-slate-700 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('bgimage.jpg')",
          }}
        >
          {/* Overlay for image text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <h2
              className="font-bold text-l text-white p-1 sm:text-3xl sm:p-0"
              style={{ textShadow: "4px 4px 8px rgba(0, 0, 0, 1)" }}
            >
              Simplify Real Estate Management with Innovative Solutions
            </h2>
            <p
              className="text-l p-1 font-bold text-gray-200 sm:text-xl sm:p-0 sm:mt-2"
              style={{ textShadow: "8px 8px 16px rgba(0, 0, 0, 2)" }}
            >
              Manage properties, streamline transactions, and connect with
              clients seamlessly.
            </p>
          </div>

          {/* Search Bar */}
          <div className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 w-11/12 max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
            {/* Navigation Buttons */}
            <div className="flex justify-center gap-6 mb-6">
              {["Flat", "House", "Plot", "PG"].map((type) => (
                <button
                  key={type}
                  onClick={() =>
                    navigate(`/buyer/filterproperties?type=${type}`)
                  }
                  className={`relative px-6 py-3 rounded-full border-2 text-lg font-medium transition-all duration-300  hover:bg-blue-600 hover:text-white hover:shadow-lg`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Form */}
            <form className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Search Section */}
              <div className="flex items-center border-b sm:border-b-0 sm:border-r pr-4 w-full sm:w-1/2 lg:flex-1">
                <div className="ml-3 w-full p-4">
                  <input
                    id="search"
                    type="text"
                    placeholder="Search here..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full text-gray-800 focus:outline-none font-medium placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Search Button */}
              <div
                onClick={() => navigate("/buyer/filterproperties")}
                className="w-full lg:w-auto flex justify-center p-2"
              >
                <FaSearch className="text-gray-400 text-xl" />
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Filtered Properties */}
      <div className="mt-4 w-full flex justify-center items-center">
        {filteredProperties.length > 0 ? (
          <div className="space-y-2 w-[43%]">
            {filteredProperties.reverse().map((property) => (
              <div
                key={property.id}
                className="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-100 transition-shadow duration-300"
              >
                <div className="flex gap-5 items-center">
                  <RxTimer />
                  <h3 className="text-xl font-semibold text-gray-800">
                    {property.name} / {property.propertyType}
                  </h3>
                  <p className="text-gray-600">{property.description}</p>
                  <div className="h-20 w-20 ml-auto">
                    {" "}
                    <img
                      src={
                        property.frontImage
                          ? `${API_BASE_URL}${property.frontImage}`
                          : "https://via.placeholder.com/300?text=No+Image"
                      }
                      alt={property.name}
                    />
                  </div>
                </div>
                {/* Wrap the property card with a Link to redirect */}
                <Link
                  to={`/buyer/property/${property.id}`}
                  className="absolute inset-0"
                ></Link>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>

      {/* search easily compare */}
      <div className="relative  ">
        {/* Background Image with Wave Effect */}
        <div className="relative w-full h-[60rem] sm:h-[20rem] lg:h-[17rem] flex justify-center items-center">
          {/* Content Overlay */}
          <div className="relative z-10 px-4 text-center text-white dark:bg-gray">
            {/* Features Section */}
            <div className="mt-10 sm:mt-1 grid grid-cols-1 sm:grid-cols-3 gap-8 bg-white  rounded-xl">
              {/* Feature 1 */}
              <div className="bg-white  bg-opacity-90 text-gray-800  rounded-lg p-6 flex flex-col items-center text-center group">
                <div className="relative">
                  <img
                    src="/searchdeal.jpg"
                    alt="Search easily"
                    className="w-28 h-28 mb-4 transform transition duration-300 group-hover:scale-110 group-hover:rotate-6"
                  />
                </div>
                <h3 className="font-bold text-xl">Search easily</h3>
                <p className="text-base w-60">
                  Find the best properties in seconds.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white  bg-opacity-90 text-gray-800  rounded-lg p-6 flex flex-col items-center text-center group">
                <div className="relative">
                  <img
                    src="/compare.jpg"
                    alt="Compare easily"
                    className="w-28 h-28 mb-4 transform transition duration-300 group-hover:scale-110 group-hover:rotate-6"
                  />
                </div>
                <h3 className="font-bold text-xl">Compare confidently</h3>
                <p className="text-base w-60">
                  Compare prices from top real estate platforms.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white  bg-opacity-90 text-gray-800  rounded-lg p-6 flex flex-col items-center text-center group">
                <div className="relative">
                  <img
                    src="/savemoney.jpg"
                    alt="Find great deals"
                    className="w-28 h-28 mb-4 transform transition duration-300 group-hover:scale-110 group-hover:rotate-6"
                  />
                </div>
                <h3 className="font-bold text-xl">Find the best deals</h3>
                <p className="text-base w-60">
                  Get exclusive offers and discounts on properties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* property listing */}
      <PropertyListing />

      {/* insight tool */}
      <InsightTool />

      {/* top property */}
      <TopProperties />
    </main>
  );
};

export default Hero;
