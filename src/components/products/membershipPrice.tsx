import React from 'react';

const MembershipPricing = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="border-2 border-gray-300 rounded-lg p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Membership Pricing</h2>
        
        <div className="flex justify-between mb-6">
          {/* Daily Pricing */}
          <div className="flex flex-col items-center border border-gray-200 rounded-lg p-4 w-40">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Daily</h3>
            <div className="flex items-center space-x-2">
              <p className="text-gray-800 font-semibold">₱30</p>
              <button className="text-blue-500 font-semibold hover:underline">Edit</button>
            </div>
          </div>
          
          {/* Monthly Pricing */}
          <div className="flex flex-col items-center border border-gray-200 rounded-lg p-4 w-40">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Monthly</h3>
            <div className="flex items-center space-x-2">
              <p className="text-gray-800 font-semibold">₱30</p>
              <button className="text-blue-500 font-semibold hover:underline">Edit</button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button className="bg-black text-white font-semibold py-2 px-6 rounded-lg">Save</button>
          <button 
            onClick={closeModal} // Close the modal on Cancel button click
            className="bg-red-400 text-white font-semibold py-2 px-6 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default MembershipPricing;
