import React, { ReactNode } from "react";
import LineChartComponent from "../analytics/lineChart"; // Import your Line Chart component

// Define props to accept children
interface CardProps {
  children?: ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm w-full max-w-sm">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-medium text-gray-500">Total Revenue</p>
        <div className="flex items-center text-green-500 text-sm font-semibold">
          12.32%
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4 ml-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-2xl font-bold">$200.00</p>
      </div>
      
      {/* Here is where the children will be rendered */}
      <div className="h-16">
        {children} {/* Render the passed-in children */}
      </div>
    </div>
  );
};

export default Card;
