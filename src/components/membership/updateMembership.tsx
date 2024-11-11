import React from 'react';

interface UpdateMembershipProps {
  onClose: () => void;
  onConfirm: () => void; // Add this line
}

const UpdateMembership: React.FC<UpdateMembershipProps> = ({ onClose, onConfirm }) => {
  const handleConfirm = () => {
    onConfirm(); // Call the onConfirm function passed as a prop
    onClose(); // Close the modal after confirming
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg relative">
        <h2 className="text-2xl font-semibold mb-6 text-center">Update Membership</h2>
        <form className="space-y-6">
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Date Registered</label>
              <input
                type="date"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Membership Type</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select Membership 
                </option>
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center mt-6 space-x-8">
            <button
              type="button"
              className="px-6 py-2 w-32 text-black bg-[#FCD301] rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 border-2 border-black"
              onClick={handleConfirm} // Call handleConfirm on confirm
            >
              Confirm
            </button>
            
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 w-32 text-white bg-red-400 rounded-md shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMembership;
