import React, { useState } from "react";
import dataFetch from "@/services/dataService";
import Receipt from "./membershipReceipt";

interface MemberRegistrationProps {
  onClose: () => void;
  onConfirm: (memberData: any) => void; // Pass memberData as a parameter to parent
  
}



const MemberRegistration: React.FC<MemberRegistrationProps> = ({
  onClose,
  onConfirm,
}) => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [birth_date, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContactNumber] = useState("");
  const [emergency_contact, setEmergencyNumber] = useState("");
  const [membership, setMembership] = useState("Monthly");
  const [showReceipt, setShowReceipt] = useState(false);

  const params = {
    first_name,
    last_name,
    birth_date,
    gender,
    contact,
    emergency_contact,
    membership,
    registered_at: "2021-10-10",
  };

  

  const createMember = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token not found in local storage.");
        return;
      }

      const url = "members/";
      const method = "POST";
      console.log(params);
      const response = await dataFetch(url, method, params, token);

      if (response) {
        onConfirm({
          id: response.id, // Assuming response contains the new member's ID
          first_name,
          last_name,
          membership,
        });

        // Reset form and close modal
        setFirstName("");
        setLastName("");
        setBirthday("");
        setGender("");
        setContactNumber("");
        setEmergencyNumber("");
        setMembership("");
        onClose();
      }
    } catch (error) {
      console.error("Error creating member:", error);
    }
  };

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
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
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
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
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
              value={contact}
              onChange={(e) => setContactNumber(e.target.value)}
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
              value={emergency_contact}
              onChange={(e) => setEmergencyNumber(e.target.value)}
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
              value={birth_date}
              onChange={(e) => setBirthday(e.target.value)}
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
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Membership Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Membership Type
            </label>
            <select
              name="membership"
              id="membership"
              defaultValue={membership}
              onChange={(e) => setMembership(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              <option value="Daily">Daily</option>
              <option value="Monthly">Monthly</option>
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
              onClick={createMember}
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
        {showReceipt && <Receipt onClose={() => setShowReceipt(false)} />}
      </div>
    </div>
  );
};

export default MemberRegistration;
