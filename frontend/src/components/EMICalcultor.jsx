import React, { useState } from "react";

export default function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [emi, setEmi] = useState(null);

  const calculateEmi = () => {
    if (!loanAmount || !interestRate || !tenure) {
      alert("Please fill in all fields");
      return;
    }

    const principal = parseFloat(loanAmount);
    const monthlyRate = parseFloat(interestRate) / 12 / 100;
    const numberOfMonths = parseInt(tenure) * 12;

    const emiValue =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
      (Math.pow(1 + monthlyRate, numberOfMonths) - 1);

    setEmi(emiValue.toFixed(2));
  };

  const resetFields = () => {
    setLoanAmount("");
    setInterestRate("");
    setTenure("");
    setEmi(null);
  };

  return (
    <div className=" p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">
        EMI Calculator
      </h2>

      <div className="mb-4 px-6">
        <label className="block text-gray-700 font-semibold mb-2">
          Loan Amount (₹)
        </label>
        <input
          type="number"
          className="w-full p-2 border border-gray-300 rounded"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          placeholder="Enter loan amount"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Interest Rate (% per annum)
        </label>
        <input
          type="number"
          className="w-full p-2 border border-gray-300 rounded"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          placeholder="Enter interest rate"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Tenure (Years)
        </label>
        <input
          type="number"
          className="w-full p-2 border border-gray-300 rounded"
          value={tenure}
          onChange={(e) => setTenure(e.target.value)}
          placeholder="Enter tenure in years"
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          onClick={calculateEmi}
        >
          Calculate EMI
        </button>
        <button
          className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500"
          onClick={resetFields}
        >
          Reset
        </button>
      </div>

      {emi && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold text-gray-800">
            Your Monthly EMI:
          </h3>
          <p className="text-blue-600 text-2xl font-bold">₹ {emi}</p>
        </div>
      )}
    </div>
  );
}
