import React, { useEffect, useState } from "react";
import dataFetch from "@/services/dataService";
import Member from "@/models/member.d";

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

  // State to store member data
  const [member, setMember] = useState({
    first_name: "",
    last_name: "",
    contact: "",
    emergency_contact: "",
    birth_date: "",
    gender: "",
    membership: "",
    status: "",
    id: "",
    purchased_at: "",
    registered_at: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch member data via GET request
  const fetchMemberData = async (id: number) => {
    const url = `http://127.0.0.1:8000/api/members/${id}/`;
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Authentication token is missing!");
      return;
    }

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const fetchedMember = await response.json();
        setMember(fetchedMember);
        console.log("Member data fetched:", fetchedMember);
      } else {
        const errorResponse = await response.json();
        console.error("Failed to fetch member data:", errorResponse);
        setError(
          errorResponse.detail || "Failed to fetch member details. Please try again."
        );
      }
    } catch (error) {
      console.error("An error occurred while fetching member data:", error);
      setError("An unexpected error occurred.");
    }
  };

  // Function to dynamically handle changes in input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

  // Function to check membership eligibility
  const checkEligibility = (purchased_at: string) => {
    const currDate = new Date();
    const purchaseDate = new Date(purchased_at);
    const timeDiff = currDate.getTime() - purchaseDate.getTime();
    const dayDiff = timeDiff / (1000 * 3600 * 24);

    return dayDiff <= 30 ? "Active" : "Inactive";
  };

  // PUT request to update member details
  const handleEdit = async (id: string, memberData: any) => {
    const url = `http://127.0.0.1:8000/api/members/${id}/`;
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Authentication token is missing!");
      return;
    }

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(memberData),
      });

      if (response.ok) {
        const updatedMember = await response.json();
        console.log("Member updated successfully:", updatedMember);
        setResponseMessage("Member updated successfully!");
        setIsEditing(false); // Exit edit mode
        onConfirm(updatedMember); // Pass updated data to parent
      } else {
        const errorResponse = await response.json();
        console.error("Update failed:", errorResponse);
        setError(
          errorResponse.detail || "Failed to update member. Please try again."
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError("An unexpected error occurred.");
    }
  };

  // Save button handler
  const handleSave = () => {
    handleEdit(member.id.toString(), member);
  };

  // Fetch member data on component mount or when selectedMemberData changes
  useEffect(() => {
    if (selectedMemberData.id) {
      fetchMemberData(selectedMemberData.id);
    }
  }, [selectedMemberData]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-lg shadow-lg relative">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Member Information
        </h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {responseMessage && (
          <div className="text-green-500 text-center mb-4">
            {responseMessage}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            {isEditing ? (
              <input
                name="first_name"
                value={member.first_name || ""}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm"
              />
            ) : (
              <span className="block p-2 border rounded-md">
                {member.first_name}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            {isEditing ? (
              <input
                name="last_name"
                value={member.last_name || ""}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm"
              />
            ) : (
              <span className="block p-2 border rounded-md">
                {member.last_name}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact Number
            </label>
            {isEditing ? (
              <input
                name="contact"
                value={member.contact || ""}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm"
              />
            ) : (
              <span className="block p-2 border rounded-md">{member.contact}</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Emergency Number
            </label>
            {isEditing ? (
              <input
                name="emergency_contact"
                value={member.emergency_contact || ""}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm"
              />
            ) : (
              <span className="block p-2 border rounded-md">
                {member.emergency_contact}
              </span>
            )}
          </div>
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
            <span className="block p-2 border rounded-md">{member.id}</span>
          </div>

          <div>
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
            <span className="block p-2 border rounded-md">
              {selectedMemberData.registered_at}
            </span>
          </div>
          </div>
        </div>
        <div className="flex justify-center mt-6 space-x-32">
          <button
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className="px-6 py-2 w-32 text-black bg-[#FCD301] rounded-md shadow-md border-2 border-black"
          >
            {isEditing ? "Save" : "Edit"}
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2 w-32 text-white bg-red-400 rounded-md shadow-md hover:bg-red-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberInformation;
