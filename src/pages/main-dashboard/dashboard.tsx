// src/pages/dashboard/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { FaFilter, FaUserPlus, FaFileExport, FaEye } from "react-icons/fa";
import Sidebar from "@/components/ui/sidebar";
import MemberRegistration from "@/components/membership/membershipRegistration";
import Receipt from "@/components/membership/membershipReceipt";
import Purchase from "@/components/purchase/purchase";
import MemberInformation from "@/components/membership/memberInformation";
import UpdateMembership from "@/components/membership/updateMembership";
import dataFetch from "@/services/dataService";
import Member from "@/models/member.d";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [showPurchase, setShowPurchase] = useState(false);
  const [showMemberInfo, setShowMemberInfo] = useState(false);
  const [showUpdateMembership, setShowUpdateMembership] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedMember, setSelectedMember] = useState<any | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
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
    const updatedMembers = [newMember, ...members]; // Add the new member to the beginning
    setMembers(updatedMembers);
    localStorage.setItem("members", JSON.stringify(updatedMembers));
    setSelectedMember(newMember);
    setShowModal(false);
    setShowReceipt(true);
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
    setSelectedMember(member); // Set the selected member for viewing
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
      setMembers(JSON.parse(savedMembers));
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
      setMembers(sortedMembers);

      localStorage.setItem("members", JSON.stringify(sortedMembers));
    } catch (error) {
      console.error("Failed to fetch members:", error);
    }
  };

  const styles = {
    container: "flex h-screen",
    content: "flex-1 p-6 bg-gray-100 overflow-hidden ml-60",
    title: "text-2xl font-bold mb-4 mt-5 ml-32",
    card: "max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-4 border border-black",
    searchWrapper: "flex items-center justify-between mb-6",
    searchInput:
      "p-2 border rounded-md shadow-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500",
    filterButton:
      "bg-white px-4 py-2 rounded-md text-gray-700 shadow-sm hover:bg-gray-100 flex items-center gap-2",
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
        <h2 className={styles.title}>Dashboard</h2>

        <div className={styles.card}>
          <div className={styles.searchWrapper}>
            <div className="flex space-x-4">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search..."
                className={styles.searchInput}
              />
              <button className={styles.filterButton}>
                <FaFilter />
                Filter
              </button>
            </div>
            <div className="flex space-x-2">
              <button onClick={openModal} className={styles.actionButton}>
                <FaUserPlus />
                Add Member
              </button>
              <button className={styles.exportButton}>
                <FaFileExport />
                Export Excel
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
                {members.map((member: any, index: number) => (
                  <tr key={index} className={styles.tableRow}>
                    <td
                      className={`${styles.tableCell} font-medium text-gray-900 whitespace-nowrap`}
                    >
                      {member.id}
                    </td>
                    <td className={styles.tableCell}>{member.first_name}</td>
                    <td className={styles.tableCell}>{member.last_name}</td>
                    <td className={styles.tableCell}>
                      <span
                        className={`${
                          member.membership === "Daily"
                            ? "bg-gray-200 text-gray-700"
                            : member.membership === "Monthly"
                            ? "bg-gray-200 text-gray-700"
                            : "bg-red-200 text-red-700"
                        } px-2 py-1 rounded-full text-xs font-semibold`}
                      >
                        {member.membership || "Not Set"}
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
            onConfirm={() => {}}
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
