import React from "react";

interface MemberRegistrationProps {
  onClose: () => void;
  onConfirm: () => void;
}

const MemberRegistration: React.FC<MemberRegistrationProps> = ({
  onClose,
  onConfirm,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg relative">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          New Member Registration
        </h2>
        <form className="grid grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First name
            </label>
            <input
              type="text"
              placeholder="Max"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last name
            </label>
            <input
              type="text"
              placeholder="Juan"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact Number
            </label>
            <input
              type="text"
              placeholder="+63"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          {/* Emergency Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Emergency Number
            </label>
            <input
              type="text"
              placeholder="+63"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          {/* Birthday */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Birthday
            </label>
            <input
              type="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            >
              <option disabled selected>
                Select Gender
              </option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          {/* Membership Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Membership Type
            </label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select Membership Type
              </option>
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          {/* Date Registered */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date Registered
            </label>
            <input
              type="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          {/* Confirm and Cancel buttons */}
          <div className="col-span-2 flex justify-center mt-6 space-x-28">
            <button
              type="button"
              onClick={onConfirm}
              className="px-6 py-2 w-32 text-black bg-[#FCD301] rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 border-2 border-black"
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

export default MemberRegistration;
