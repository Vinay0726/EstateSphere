import React from "react";

const RealEstateHighlights = () => {
  return (
    <div className="py-2 px-4 sm:px-28">
      <div className="container mx-auto">
        <div className="flex flex-wrap -mx-4">
          {/* Top Cities for Properties */}
          <div className="w-full sm:w-1/2 lg:w-1/4 px-4">
            <div className="rounded-lg p-4">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Top Cities for Properties
              </h3>
              <p className="text-sm text-gray-600">
                Discover real estate in cities like{" "}
                <span className="font-medium">Mumbai</span>,
                <span className="font-medium">Delhi</span>,{" "}
                <span className="font-medium">Bangalore</span>,
                <span className="font-medium">Hyderabad</span>, and{" "}
                <span className="font-medium">Pune</span>.
              </p>
            </div>
          </div>

          {/* Popular Property Types */}
          <div className="w-full sm:w-1/2 lg:w-1/4 px-4">
            <div className="rounded-lg p-4">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Popular Property Types
              </h3>
              <p className="text-sm text-gray-600">
                Choose from <span className="font-medium">Apartments</span>,
                <span className="font-medium">Villas</span>,{" "}
                <span className="font-medium">Plots</span>,
                <span className="font-medium">Commercial Spaces</span>, or{" "}
                <span className="font-medium">Farmhouses</span>.
              </p>
            </div>
          </div>

          {/* Top Neighborhoods */}
          <div className="w-full sm:w-1/2 lg:w-1/4 px-4">
            <div className="rounded-lg p-4">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Top Neighborhoods
              </h3>
              <p className="text-sm text-gray-600">
                Explore <span className="font-medium">South Mumbai</span>,
                <span className="font-medium">Koramangala</span>,
                <span className="font-medium">Jubilee Hills</span>,
                <span className="font-medium">Gurgaon</span>, and{" "}
                <span className="font-medium">Baner</span>.
              </p>
            </div>
          </div>

          {/* Affordable Housing Options */}
          <div className="w-full sm:w-1/2 lg:w-1/4 px-4">
            <div className="rounded-lg p-4">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Affordable Housing Options
              </h3>
              <p className="text-sm text-gray-600">
                Affordable options in <span className="font-medium">Thane</span>
                ,<span className="font-medium">Noida</span>,{" "}
                <span className="font-medium">Whitefield</span>,
                <span className="font-medium">Mira Road</span>, and{" "}
                <span className="font-medium">Hadapsar</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealEstateHighlights;
