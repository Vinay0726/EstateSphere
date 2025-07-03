import React, { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
const TopProperties = () => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({
      left: -300, // Adjust scroll distance
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({
      left: 300, // Adjust scroll distance
      behavior: "smooth",
    });
  };

  return (
    <div
      className="container mx-auto py-8 px-8 sm:px-20"
      style={{
        overflowX: "hidden",
        overflowY: "hidden",
        scrollbarWidth: "none",
      }}
    >
      <h1 className="text-3xl font-bold mb-8 p-4">
        Apartments, Villas, and More
      </h1>

      <div className="relative">
        {/* Scroll Buttons */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-[50%] transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 z-10"
        >
          <FiChevronLeft size={24} />
        </button>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-[50%] transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 z-10"
        >
          <FiChevronRight size={24} />
        </button>

        {/* Scrollable Cards */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-scroll space-x-6 scrollbar-hide scroll-smooth px-8 overflow-hidden"
          style={{
            scrollbarWidth: "none",
          }}
        >
          {/* Card 1 */}
          <div className="flex-none w-96 h-auto border bg-white rounded-lg hover:shadow-md transform hover:scale-105 transition-all">
            <img
              src="https://static.99acres.com/universalhp/img/d_hp_property_type_1.webp"
              alt="Residential Apartments"
              className="h-full w-full object-cover rounded-t-lg"
            />
            <div className="p-6 absolute top-4">
              <h2 className="text-4xl font-bold text-gray-700 mb-6 text-center">
                Residential Apartments
              </h2>
              <p className="text-base text-gray-600 text-center dark:text-yellow-50">
                2,500+ Properties
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex-none w-96 h-auto border bg-white  rounded-lg hover:shadow-md transform hover:scale-105 transition-all">
            <img
              src="https://static.99acres.com/universalhp/img/d_hp_property_type_2.webp"
              alt="Independent House"
              className="h-full w-full object-cover rounded-t-lg"
            />
            <div className="p-6 absolute top-4">
              <h2 className="text-4xl font-bold text-gray-700 mb-6 text-center">
                Independent House
              </h2>
              <p className="text-base text-gray-600 text-center ">
                500+ Properties
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex-none w-96 h-auto border bg-white  rounded-lg hover:shadow-md transform hover:scale-105 transition-all">
            <img
              src="https://static.99acres.com/universalhp/img/d_hp_property_type_3.webp"
              alt="Residential Land"
              className="h-full w-full object-cover rounded-t-lg"
            />
            <div className="p-6 absolute top-4">
              <h2 className="text-4xl font-bold text-gray-700 mb-6 text-center">
                Residential Land
              </h2>
              <p className="text-base text-gray-600 text-center ">
                400+ Properties
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="flex-none w-96 h-auto border bg-white rounded-lg hover:shadow-md transform hover:scale-105 transition-all">
            <img
              src="https://static.99acres.com/universalhp/img/d_hp_property_type_90.webp"
              alt="Luxury Apartments in Nagpur"
              className="h-full w-full object-cover rounded-t-lg"
            />
            <div className="p-6 absolute top-4">
              <h2 className="text-4xl font-bold text-gray-700 mb-6 text-center">
                PG Rooms
              </h2>
              <p className="text-base text-gray-600 text-center ">
                1,100+ Properties
              </p>
            </div>
          </div>

          {/* Card 5 */}
          <div className="flex-none w-96 h-auto border bg-white  rounded-lg hover:shadow-md transform hover:scale-105 transition-all">
            <img
              src="https://static.99acres.com/universalhp/img/d_hp_property_type_4.webp"
              alt="Luxury Apartments in Nagpur"
              className="h-full w-full object-cover rounded-t-lg"
            />
            <div className="p-6 absolute top-4">
              <h2 className="text-4xl font-bold text-gray-700 mb-6 text-center">
                Residential Flat
              </h2>
              <p className="text-base text-gray-600 text-center ">
                2,500+ Properties
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopProperties;
