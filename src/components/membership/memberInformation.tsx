import Member from "@/models/member.d";
import React, { useState } from "react";
import dataFetch from "@/services/dataService";

interface MemberInformationProps {
  onClose: () => void;
  onConfirm: (data: any) => void;
  selectedMemberData: Member;
}

const MemberInformation: React.FC<MemberInformationProps> = ({
  onClose,
  onConfirm,
  selectedMemberData,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  console.log(selectedMemberData);
  const [member, setMemberData] = useState({
    firstName: "David",
    lastName: "Juan",
    contactNumber: "+63",
    emergencyNumber: "+63",
    userID: "4907",
    gender: "Male",
    membership: "Monthly",
    status: "Active",
    birthday: "1990-01-01",
    registeredAt: "2021-01-01",
  });

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMemberData({ ...member, [name]: value });
  };

  const checkEligibility = (purchased_at: string) => {
    const currDate = new Date();
    const purchaseDate = new Date(purchased_at);
    const timeDiff = currDate.getTime() - purchaseDate.getTime();
    const dayDiff = timeDiff / (1000 * 3600 * 24);

    if (dayDiff <= 30) {
      return "Active";
    } else {
      return "Inactive";
    }
  };

  const handleSave = () => {
    // Call onConfirm with the edited data when saving
    onConfirm(selectedMemberData);
    setIsEditing(false); // Exit edit mode
  };

  const fetchMemberData = async (Id: number) => {
    const url = `members/${Id}/`; // Example endpoint for fetching member details
    const method = "GET";
    
    try {
      const response = await dataFetch(url, method);
      console.log(url);
      console.log(method);
      localStorage.setItem("token", response.access);
      console.log(response.access);
    } catch (error) {
      console.log();
      console.log(url);
      console.log(method);
    }
  };

  const handleEdit = async (Id: number) => {
    const url = `members/${Id}/`; // Endpoint for updating member details
    const method = "PUT";
  
    try {
      const response = await dataFetch(url, method);
      console.log(url);
      console.log(method);

      console.log(response.access);
    } catch (error) {
      console.log();
      console.log(url);
      console.log(method);
    }
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
                value={selectedMemberData.first_name}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm"
              />
            ) : (
              <span className="block p-2 border rounded-md">
                {selectedMemberData.first_name}
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
                value={selectedMemberData.last_name}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm"
              />
            ) : (
              <span className="block p-2 border rounded-md">
                {selectedMemberData.last_name}
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
                value={selectedMemberData.contact}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm"
              />
            ) : (
              <span className="block p-2 border rounded-md">
                {selectedMemberData.contact}
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
                value={selectedMemberData.emergency_contact}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm"
              />
            ) : (
              <span className="block p-2 border rounded-md">
                {selectedMemberData.emergency_contact}
              </span>
            )}
          </div>

          <div className="col-span-2 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Birthday
              </label>
              <span className="block p-2 border rounded-md">
                {selectedMemberData.birth_date}
              </span>
            </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <span className="block p-2 border rounded-md">
              {selectedMemberData.gender}
            </span>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              User ID
            </label>
            <span className="block p-2 border rounded-md">
              {selectedMemberData.id}
            </span>
          </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Membership
              </label>
              <span className="block p-2 border rounded-md">
                {selectedMemberData.membership === 1 ? "Monthly" : "Daily"}
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
                  checkEligibility(selectedMemberData.purchased_at || "")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              ></span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date Registered
              </label>
              {isEditing ? (
                <input
                  name="registered_at"
                  value={selectedMemberData.registered_at}
                  onChange={handleChange}
                  className="w-full rounded-md border-gray-300 shadow-sm"
                />
              ) : (
                <span className="block p-2 border rounded-md">
                  {selectedMemberData.registered_at}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-6 space-x-32">
          <button
            onClick={isEditing ? handleSave : () => handleEdit(selectedMemberData.id)}
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
