import React, { useEffect, useState } from "react";
import { FaUserPlus, FaFileExport, FaEye } from "react-icons/fa";
import Sidebar from "@/components/ui/sidebar";
import MemberRegistration from "@/components/membership/membershipRegistration";
import Receipt from "@/components/membership/membershipReceipt";
import Purchase from "@/components/purchase/purchase";
import MemberInformation from "@/components/membership/memberInformation";
import UpdateMembership from "@/components/membership/updateMembership";
import dataFetch from "@/services/dataService";
import Member from "@/models/member.d";
import Successful from "@/components/ui/popups/successful"; // Adjust path as needed

const Dashboard = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [showPurchase, setShowPurchase] = useState(false);
  const [showMemberInfo, setShowMemberInfo] = useState(false);
  const [showUpdateMembership, setShowUpdateMembership] = useState(false);
  const [members, setMembers] = useState<Member[]>([]); // Displayed members based on search
  const [selectedMember, setSelectedMember] = useState<any | null>(null);
  const [allMembers, setAllMembers] = useState<Member[]>([]); // Full list of members
  const [membershipFilter, setMembershipFilter] = useState<string>(""); // For membership filter (Daily or Monthly)

  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value; 
    setSearchTerm(term);
    filterMembers(term, membershipFilter);
  };

  const handleFilterByMembership = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = event.target.value;
    setMembershipFilter(selectedType);

    filterMembers(searchTerm, selectedType);
  };

    const filterMembers = (searchTerm: string, membershipType: string) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

  
      const filtered = allMembers.filter((member) => {
      const fullName = `${member.first_name} ${member.last_name}`.toLowerCase();
      const matchesSearch =
        fullName.includes(lowerCaseSearchTerm) ||
        member.id.toString().includes(lowerCaseSearchTerm) ||
        member.first_name.toLowerCase().includes(lowerCaseSearchTerm) ||
        member.last_name.toLowerCase().includes(lowerCaseSearchTerm);

      // Filter by membership if a membership type is selected
      const matchesMembership =
        membershipType === "" || String(member.membership_type) === membershipType;

      return matchesSearch && matchesMembership;
    });

    setMembers(filtered); // Update the displayed list
  };

  const openModal = () => {
    setShowModal(true);
    setShowReceipt(false);
    setShowPurchase(false);
    setShowMemberInfo(false);
    setShowUpdateMembership(false);
  };

  const closeModal = () => setShowModal(false);

  const handleConfirmRegistration = (newMember: any) => {
    const updatedMembers = [newMember, ...members]; 
    setMembers(updatedMembers);
    localStorage.setItem("members", JSON.stringify(updatedMembers));
    setSelectedMember(newMember);
    setShowModal(false);
    setShowReceipt(true);

    setShowSuccess(true);
    // Show success popup
  
  
  // Reset showSuccess state after 3 seconds
  setTimeout(() => {
    setShowSuccess(false);
  }, 3000); // 3 seconds delay to hide the success popup
  };

  const openPurchaseModal = () => {
    setShowPurchase(true);
    setShowModal(false);
    setShowReceipt(false);
    setShowMemberInfo(false);
    setShowUpdateMembership(false);
  };

  const closePurchaseModal = () => setShowPurchase(false);

  const openMemberInfoModal = (member: any) => {
    setSelectedMember(member); 
    setShowMemberInfo(true);
    setShowModal(false);
    setShowReceipt(false);
    setShowPurchase(false);
    setShowUpdateMembership(false);
  };

  const closeMemberInfoModal = () => setShowMemberInfo(false);

  const openUpdateMembershipModal = () => {
    setShowUpdateMembership(true);
    setShowModal(false);
    setShowReceipt(false);
    setShowPurchase(false);
    setShowMemberInfo(false);
  };

  const closeUpdateMembershipModal = () => setShowUpdateMembership(false);

  const handleUpdateMembershipConfirm = () => {
    setShowUpdateMembership(false);
    setShowReceipt(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found in local storage.");
      return;
    }

    const savedMembers = localStorage.getItem("members");
    if (savedMembers) {
      const parsedMembers = JSON.parse(savedMembers);
      setMembers(parsedMembers); 
      setAllMembers(parsedMembers); 
    } else {
      getMembers(token);
    }
  }, []);

  const getMembers = async (token: string) => {
    const url = "members/";
    const method = "GET";

    try {
      const response = await dataFetch(url, method, {}, token);
      const sortedMembers = response.sort(
        (a: any, b: any) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      console.log(response)
      setMembers(sortedMembers);
      setAllMembers(sortedMembers); 
    } catch (error) {
      console.error("Failed to fetch members:", error);
    }
  };

  const styles = {
    container: "flex h-screen",
    content: "flex-1 p-6 bg-gray-50 overflow-hidden ml-60",
    title: "text-2xl font-bold mb-4 mt-5 ml-32",
    card: "max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-4 border border-black mt-16",
    searchWrapper: "flex items-center justify-between mb-6",
    searchInput:
      "p-2 border rounded-md shadow-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500",
    filterSelect:
      "p-2 border rounded-md shadow-md w-35 focus:outline-none focus:ring-2 focus:ring-blue-500",
    actionButton:
      "bg-black text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-800 flex items-center gap-2",
    exportButton:
      "bg-[#FCD301] text-black font-semibold px-4 py-2 rounded-md shadow-md border-2 border-black flex items-center gap-2",
    tableContainer:
      "relative overflow-x-auto overflow-y-auto h-[70vh] scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent",
    table: "min-w-full text-sm text-left text-gray-500",
    tableHeader:
      "text-xs text-gray-700 uppercase bg-gray-50 border-b sticky top-0 z-10",
    tableRow: "bg-white border-b hover:bg-gray-100",
    tableCell: "px-5 py-4",
    viewButton:
      "bg-black w-24 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-800 border border-black flex items-center gap-2",
    purchaseButton:
      "bg-[#FCD301] w-24 text-black px-4 py-2 rounded-md shadow-md border-2 border-black flex items-center gap-2",
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
      {showSuccess && <Successful />}
       

        <div className={styles.card}>
          <div className={styles.searchWrapper}>
            <div className="flex space-x-4">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange} 
                placeholder="Search by Name or ID"
                className={styles.searchInput}
              />
              <select
                value={membershipFilter}
                onChange={handleFilterByMembership}
                className={styles.filterSelect}
              >
                <option value="">All Members</option>
                <option value="Daily">Daily</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
            <div className="flex space-x-2 mr-2">
              <button onClick={openModal} className={styles.actionButton}>
                <FaUserPlus />
                Add Member
              </button>
              
            </div>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead className={styles.tableHeader}>
                <tr>
                  <th scope="col" className={styles.tableCell}>
                    ID
                  </th>
                  <th scope="col" className={styles.tableCell}>
                    Firstname
                  </th>
                  <th scope="col" className={styles.tableCell}>
                    Lastname
                  </th>
                  <th scope="col" className={styles.tableCell}>
                    Membership
                  </th>
                  <th scope="col" className={styles.tableCell}></th>
                  <th scope="col" className={styles.tableCell}></th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id} className={styles.tableRow}>
                    <td className={styles.tableCell}>{member.id}</td>
                    <td className={styles.tableCell}>{member.first_name}</td>
                    <td className={styles.tableCell}>{member.last_name}</td>
                    <td className={styles.tableCell}>
                      <span>{member.membership_type || "not set"}
                      
                      </span>
                    </td>
                    <td className={styles.tableCell}>
                      <button
                        className={styles.viewButton}
                        onClick={() => openMemberInfoModal(member)}
                      >
                        <FaEye />
                        View
                      </button>
                    </td>
                    <td className={styles.tableCell}>
                      <button
                        className={styles.purchaseButton}
                        onClick={openPurchaseModal}
                      >
                        Purchase
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showModal && (
          <MemberRegistration
            onClose={closeModal}
            onConfirm={handleConfirmRegistration}
          />
        )}

        {showReceipt && <Receipt onClose={() => setShowReceipt(false)} />}

        {showPurchase && (
          <Purchase
            onClose={closePurchaseModal}
            onRenew={openUpdateMembershipModal}
            memberData={selectedMember}
          />
        )}

        {showMemberInfo && (
          <MemberInformation
            onClose={closeMemberInfoModal}
            selectedMemberData={selectedMember}
            onConfirm={(updatedMember: any) => {
              setMembers((prevMembers) =>
                prevMembers.map((member) =>
                  member.id === updatedMember.id ? updatedMember : member
                )
              );
              closeMemberInfoModal();
            }}
          />
        )}

        {showUpdateMembership && (
          <UpdateMembership
            onClose={closeUpdateMembershipModal}
            onConfirm={handleUpdateMembershipConfirm}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
