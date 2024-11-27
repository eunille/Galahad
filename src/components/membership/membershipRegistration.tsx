import React, { useState } from "react";
import dataFetch from "@/services/dataService";
import Receipt from "./membershipReceipt";

interface MemberRegistrationProps {
  onClose: () => void;
  onConfirm: (memberData: any) => void;
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
  const [membership, setMembership] = useState(""); // Default to empty
  const [registered_at, setregistered_at] = useState("");
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [showReceipt, setShowReceipt] = useState(false);

  const params = {
    first_name,
    last_name,
    birth_date,
    gender,
    contact,
    emergency_contact,
    membership,
    registered_at,
  };

  const validateField = (fieldName: string, value: string) => {
    let error = "";

    if (!value.trim()) {
      error = `${fieldName.replace(/_/g, " ").replace(/([A-Z])/g, " $1")} is required.`;
    } else if (
      (fieldName === "contact" || fieldName === "emergency_contact")
    ) {
      let normalizedValue = value.replace(/\D/g, '');
      if (normalizedValue.startsWith("09") && normalizedValue.length === 11) {
        normalizedValue = `+63${normalizedValue.substring(1)}`; 
      }
      if (!/^\+63[9][0-9]{9}$/.test(normalizedValue) && !/^[09][9][0-9]{9}$/.test(value)) {
        error = `${fieldName.replace(/_/g, " ").replace(/([A-Z])/g, " $1")} must be a valid phone number (09XXXXXXXXX).`;
      }
    }
  
    return error;
  };
  
  
  

  const validateForm = () => {
    const errors: Record<string, string> = {};

    Object.entries(params).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) errors[key] = error;
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const createMember = async () => {
    if (!validateForm()) return;

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token not found in local storage.");
        return;
      }

      const url = "members/";
      const method = "POST";
      const response = await dataFetch(url, method, params, token);

      if (response) {
        onConfirm({
          id: response.id,
          first_name,
          last_name,
          birth_date,
          gender,
          contact,
          emergency_contact,
          membership,
          registered_at,
        });

        // Reset form and close modal
        setFirstName("");
        setLastName("");
        setBirthday("");
        setGender("");
        setContactNumber("");
        setEmergencyNumber("");
        setMembership(""); // Reset membership to empty
        setregistered_at("");
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
              First Name
            </label>
            <input
              type="text"
              placeholder="First Name"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {validationErrors.first_name && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.first_name}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last Name"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {validationErrors.last_name && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.last_name}</p>
            )}
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact Number
            </label>
            <input
              type="text"
              placeholder="Contact Number"
              value={contact}
              onChange={(e) => setContactNumber(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {validationErrors.contact && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.contact}</p>
            )}
          </div>

          {/* Emergency Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Emergency Number
            </label>
            <input
              type="text"
              placeholder="Emergency Number"
              value={emergency_contact}
              onChange={(e) => setEmergencyNumber(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {validationErrors.emergency_contact && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.emergency_contact}</p>
            )}
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
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {validationErrors.gender && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.gender}</p>
            )}
          </div>

          {/* Membership Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Membership Type
            </label>
            <select
              value={membership}
              onChange={(e) => setMembership(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              <option value="" disabled>
                Membership Type
              </option>
              <option value="Daily">Daily</option>
              <option value="Monthly">Monthly</option>
            </select>
            {validationErrors.membership && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.membership}</p>
            )}
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
            />
            {validationErrors.birth_date && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.birth_date}</p>
            )}
          </div>

          {/* Date Registered */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date Registered
            </label>
            <input
              type="date"
              value={registered_at}
              onChange={(e) => setregistered_at(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {validationErrors.registered_at && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.registered_at}</p>
            )}
          </div>

         
        </form>

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
        {showReceipt && <Receipt onClose={() => setShowReceipt(false)} />}
      </div>
    </div>
  );
};

export default MemberRegistration;
