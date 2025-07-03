import React from "react";
import "../assets/css/loader.css"; // Import the CSS for the loader

const Loader = () => {
  return (
    <div className="loader">
      <svg
        className="pl"
        viewBox="0 0 100 100" // Reduced the viewBox size
        width="100" // Reduced the width
        height="100" // Reduced the height
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="pl-grad1" x1="1" y1="0.5" x2="0" y2="0.5">
            <stop offset="0%" stopColor="hsl(313,90%,55%)" />
            <stop offset="100%" stopColor="hsl(223,90%,55%)" />
          </linearGradient>
          <linearGradient id="pl-grad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(313,90%,55%)" />
            <stop offset="100%" stopColor="hsl(223,90%,55%)" />
          </linearGradient>
        </defs>
        <circle
          className="pl__ring"
          cx="50" // Adjusted for smaller size
          cy="50" // Adjusted for smaller size
          r="41" // Adjusted for smaller size
          fill="none"
          stroke="url(#pl-grad1)"
          strokeWidth="18" // Reduced stroke width for smaller loader
          strokeDasharray="0 257 1 257"
          strokeDashoffset="0.01"
          strokeLinecap="round"
          transform="rotate(-90,50,50)"
        />
        <line
          className="pl__ball"
          stroke="url(#pl-grad2)"
          x1="50" // Adjusted for smaller size
          y1="9" // Adjusted for smaller size
          x2="50.01"
          y2="91" // Adjusted for smaller size
          strokeWidth="18" // Reduced stroke width
          strokeDasharray="1 110" // Reduced dasharray for smaller loader
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default Loader;
