import React, { useState } from "react";

const AreaConverter = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputUnit, setInputUnit] = useState("squareMeters");
  const [outputUnit, setOutputUnit] = useState("squareMeters");
  const [convertedValue, setConvertedValue] = useState(null);

  // Conversion factors relative to 1 square meter
  const conversionRates = {
    squareMeters: 1,
    squareKilometers: 0.000001,
    acres: 0.000247105,
    hectares: 0.0001,
    squareFeet: 10.7639,
  };

  const convertArea = () => {
    if (!inputValue || isNaN(inputValue) || parseFloat(inputValue) <= 0) {
      alert("Please enter a valid positive number.");
      return;
    }

    const valueInSquareMeters =
      parseFloat(inputValue) * conversionRates[inputUnit];
    const convertedValue = valueInSquareMeters / conversionRates[outputUnit];

    setConvertedValue(convertedValue.toFixed(4));
  };

  const resetFields = () => {
    setInputValue("");
    setInputUnit("squareMeters");
    setOutputUnit("squareMeters");
    setConvertedValue(null);
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-auto">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">
          Area Converter
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Enter Area Value
          </label>
          <input
            type="number"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value"
            min="0"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            From Unit
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            value={inputUnit}
            onChange={(e) => setInputUnit(e.target.value)}
          >
            <option value="squareMeters">Square Meters</option>
            <option value="squareKilometers">Square Kilometers</option>
            <option value="acres">Acres</option>
            <option value="hectares">Hectares</option>
            <option value="squareFeet">Square Feet</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            To Unit
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            value={outputUnit}
            onChange={(e) => setOutputUnit(e.target.value)}
          >
            <option value="squareMeters">Square Meters</option>
            <option value="squareKilometers">Square Kilometers</option>
            <option value="acres">Acres</option>
            <option value="hectares">Hectares</option>
            <option value="squareFeet">Square Feet</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none"
            onClick={convertArea}
          >
            Convert
          </button>
          <button
            className="bg-gray-400 text-white py-3 px-6 rounded-md hover:bg-gray-500 focus:outline-none"
            onClick={resetFields}
          >
            Reset
          </button>
        </div>

        {convertedValue !== null && (
          <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800">
              Converted Value:
            </h3>
            <p className="text-blue-600 text-2xl font-bold">{convertedValue}</p>
            <p className="text-gray-600">
              {inputValue} {inputUnit} = {convertedValue} {outputUnit}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AreaConverter;
