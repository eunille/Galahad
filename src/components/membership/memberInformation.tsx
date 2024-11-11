import React, { useState } from "react";

interface MemberInformationProps {
  onClose: () => void;
}

const MemberInformation: React.FC<MemberInformationProps> = ({ onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [memberData, setMemberData] = useState({
    firstName: "David",
    lastName: "Juan",
    contactNumber: "+63",
    emergencyNumber: "+63",
    userID: "4907",
    gender: "Male",
    membership: "Monthly",
    status: "Active",
    birthday: "1990-01-01"
  });

  const handleEdit = () => setIsEditing(!isEditing);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMemberData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-lg shadow-lg relative">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Member Information
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            {isEditing ? (
              <input
                name="firstName"
                value={memberData.firstName}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm"
              />
            ) : (
              <span className="block p-2 border rounded-md">
                {memberData.firstName}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            {isEditing ? (
              <input
                name="lastName"
                value={memberData.lastName}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm"
              />
            ) : (
              <span className="block p-2 border rounded-md">
                {memberData.lastName}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact Number
            </label>
            {isEditing ? (
              <input
                name="contactNumber"
                value={memberData.contactNumber}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm"
              />
            ) : (
              <span className="block p-2 border rounded-md">
                {memberData.contactNumber}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Emergency Number
            </label>
            {isEditing ? (
              <input
                name="emergencyNumber"
                value={memberData.emergencyNumber}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm"
              />
            ) : (
              <span className="block p-2 border rounded-md">
                {memberData.emergencyNumber}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              User ID
            </label>
            <span className="block p-2 border rounded-md">
              {memberData.userID}
            </span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <span className="block p-2 border rounded-md">
              {memberData.gender}
            </span>
          </div>

          <div className="col-span-2 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Birthday
              </label>
              <span className="block p-2 border rounded-md">
                {memberData.birthday}
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Membership
              </label>
              <span className="block p-2 border rounded-md">
                {memberData.membership}
              </span>
            </div>
          </div>

          <div className="col-span-2 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <span
                className={`block p-2 border rounded-md ${
                  memberData.status === "Active"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {memberData.status}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6 space-x-32">
          <button
            onClick={handleEdit}
            className="px-6 py-2 w-32 text-black bg-[#FCD301] rounded-md shadow-md border-2 border-black"
          >
            {isEditing ? "Save" : "Edit"}
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2 w-32 text-white bg-red-400 rounded-md shadow-md hover:bg-red-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberInformation;
