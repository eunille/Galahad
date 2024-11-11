import React from "react";

interface ReceiptProps {
  onClose: () => void;
}

const Receipt: React.FC<ReceiptProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-gray-600 font-semibold text-lg">Receipt</h2>
            <p className="text-gray-500 mt-1">Date: November 23, 2023</p>
          </div>
          <img
            src="../src/assets/img/logo/gym-logo.png"
            alt="Logo"
            className="h-16 w-16 object-contain"
          />
        </div>

        {/* Membership Information */}
        <div className="mt-6 flex justify-between items-center border-b pb-4">
          <span className="text-gray-800 font-medium">Gym Membership</span>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-gray-500">Membership Type:</span>
          <span className="text-gray-800 font-medium">Monthly</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500">Amount:</span>
          <span className="text-gray-800 font-medium">P800</span>
        </div>

        <div className="my-4 border-t"></div>

        {/* Total Section */}
        <div className="flex justify-between items-center">
          <span className="text-gray-800 font-semibold">Total</span>
          <span className="text-gray-800 font-medium">P800</span>
        </div>

        <div className="my-4 border-t"></div>

        {/* Customer Information */}
        <div>
          <p className="text-gray-800 font-semibold">Customer Information</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-500">User ID:</span>
            <span className="text-gray-800">4907</span>
          </div>
        </div>

        {/* Confirm and Cancel Buttons */}
        <div className="mt-6 flex justify-around">
          <button
            className="px-6 py-2 text-black bg-[#FCD301] rounded-md shadow-md focus:outline-none focus:ring-2 border-2 border-black"
            onClick={onClose} // Confirm action
          >
            Confirm
          </button>
          <button
            className="px-6 py-2 text-white bg-red-400 rounded-md shadow-md hover:bg-red-500 focus:outline-none focus:ring-2"
            onClick={onClose} // Cancel action
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
