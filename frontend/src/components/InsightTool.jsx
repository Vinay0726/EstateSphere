import React, { useState } from "react";
import EmiCalculator from "./EMICalcultor";
import AreaConverter from "./AreaConverter";


const cards = [
  {
    id: 1,
    title: "EMI Calculator",
    description: "Calculate your home loan EMI",
    icon: "https://www.99acres.com/universalapp/img/EMICalculator2.png",
  },
  
  {
    id: 2,
    title: "Area Converter",
    description: "Convert one area into any other easily",
    icon: "https://www.99acres.com/universalapp/img/AreaConverter2.png",
  },
];

export default function InsightTool() {
  const [showModal, setShowModal] = useState(false);
   const [showModalArea, setShowModalArea] = useState(false);

  const handleCardClick = (title) => {
    if (title === "EMI Calculator") {
      setShowModal(true);
    }
    if (title === "Area Converter") {
      setShowModalArea(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setShowModalArea(false);
  };

  return (
    <div className="mt-6 px-12 sm:px-32">
      <div className="flex items-center mb-6 pb-4">
        <div className="text-2xl font-bold flex items-center">
          <span className="mr-3">
            <img
              src="https://static.99acres.com/universalapp/img/batch_prediction.png"
              alt="Main Icon"
              className="h-20 w-20"
            />
          </span>
          Insights & Tools
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 justify-between">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white  rounded-lg shadow-lg flex flex-col items-center text-center p-20 cursor-pointer"
            onClick={() => handleCardClick(card.title)}
          >
            <img
              src={card.icon}
              alt={`${card.title} icon`}
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">
              {card.title}
            </h3>
            <p className="text-gray-500">{card.description}</p>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                EMI Calculator
              </h3>
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={closeModal}
              >
                ✖
              </button>
            </div>
            <EmiCalculator /> {/* Render the EMI Calculator component */}
          </div>
        </div>
      )}

      {showModalArea && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                Area Converter
              </h3>
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={closeModal}
              >
                ✖
              </button>
            </div>
            <AreaConverter /> {/* Render the EMI Calculator component */}
          </div>
        </div>
      )}
      
    </div>
  );
}
