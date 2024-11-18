import React, { useState } from "react";
import Sidebar from "@/components/ui/sidebar";
import EditProducts from "@/components/products/editProducts"; // Import the modal component

const ProductsInventory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample product and service data
  const products = [
    { name: "Creatine", price: 25, imgSrc: "https://via.placeholder.com/150" },
    { name: "Mass Gainer", price: 30, imgSrc: "https://via.placeholder.com/150" },
    { name: "Amino", price: 20, imgSrc: "https://via.placeholder.com/150" },
  ];

  const services = [
    { name: "Treadmill", price: 562, imgSrc: "https://via.placeholder.com/150" },
    { name: "Towel", price: 10, imgSrc: "https://via.placeholder.com/150" },
  ];

  // Function to open the edit modal
  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex h-screen mt-2">
      {/* Main Content */}
      <div className="flex h-full w-full">
        <Sidebar />

        <div className="flex flex-col flex-grow ml-64 p-6 bg-gray-50 overflow-y-auto">
          <div className="flex justify-between items-center mb-6 border-b border-gray-300 pb-4">
            <h2 className="text-2xl font-bold text-gray-800">Pricing</h2>
            <button className="py-2 px-4 bg-[#FCD301] text-black font-semibold rounded-lg shadow border-2 border-black" >
              Membership Price
            </button>
          </div>

          {/* Products Section */}
          <div className="w-full max-w-full px-4 py-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <div key={index} className="relative p-4 bg-white border-2 border-black rounded-lg shadow-sm">
                  <span className="absolute -top-1 -left-1 bg-[#FCD301] text-black py-2 px-3 text-md rounded-br-lg rounded-tl-lg font-semibold border-2 border-black">
                    {product.name}
                  </span>
                  <div className="w-full h-32 mb-4 flex items-center justify-center">
                    <img src={product.imgSrc} alt={product.name} className="object-contain h-full rounded-md" />
                  </div>
                  <div className="flex items-center justify-between border-t pt-2">
                    <div>
                      <p className="text-xs text-gray-500">Price</p>
                      <p className="text-xl font-bold text-gray-900">₱{product.price}</p>
                    </div>
                    <button
                      onClick={handleEditClick}
                      className="py-1 px-4 bg-black text-white rounded-lg hover:bg-gray-900 transition font-semibold"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Services Section */}
          <div className="w-full max-w-full px-4 py-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div key={index} className="relative p-4 bg-white border-2 border-black rounded-lg shadow-sm">
                  <span className="absolute -top-1 -left-1 bg-[#FCD301] text-black py-2 px-3 text-md rounded-br-lg rounded-tl-lg font-semibold border-2 border-black">
                    {service.name}
                  </span>
                  <div className="w-full h-32 mb-4 flex items-center justify-center">
                    <img src={service.imgSrc} alt={service.name} className="object-contain h-full rounded-md" />
                  </div>
                  <div className="flex items-center justify-between border-t pt-2">
                    <div>
                      <p className="text-xs text-gray-500">Price</p>
                      <p className="text-xl font-bold text-gray-900">₱{service.price}</p>
                    </div>
                    <button
                      onClick={handleEditClick}
                      className="py-1 px-4 bg-black text-white rounded-lg hover:bg-gray-900 transition font-semibold"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Render modal if isModalOpen is true */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Slightly darkened overlay to draw focus to the modal */}
          <div className="fixed inset-0 bg-black opacity-30"></div>

          {/* Modal with eye-catching style */}
          <div className="relative bg-white rounded-lg shadow-xl p-8 w-full max-w-3xl z-50 transform transition-transform duration-200 ease-out scale-105">
            <EditProducts closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsInventory;
