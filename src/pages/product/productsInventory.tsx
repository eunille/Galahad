import React from "react";
import { Link } from "react-router-dom"; // Import Link
import Sidebar from "@/components/ui/sidebar";

const ProductsInventory = () => {
  const products = [
    {
      name: "Creatine",
      price: 25,
      imgSrc: "https://via.placeholder.com/150",
    },
    {
      name: "Mass Gainer",
      price: 30,
      imgSrc: "https://via.placeholder.com/150",
    },
    {
      name: "Amino",
      price: 20,
      imgSrc: "https://via.placeholder.com/150",
    },
  ];

  const services = [
    {
      name: "Treadmill",
      price: 562,
      imgSrc: "https://via.placeholder.com/150",
    },
    { name: "Towel", price: 10, imgSrc: "https://via.placeholder.com/150" },
  ];

  return (
    <div className="flex h-screen mt-2">
    <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow ml-64 p-6 bg-gray-50 overflow-y-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6 border-b border-gray-300 pb-4">
          <h2 className="text-2xl font-bold text-gray-800">Pricing</h2>
          <div className="flex space-x-4">
            
            <button className="py-2 px-4 bg-[#FCD301] text-black font-semibold rounded-lg shadow border-2 border-black">
              Membership Price
            </button>
          </div>
        </div>

        

        {/* Products Section */}
        <div className="w-full max-w-full px-4 py-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <div
                key={index}
                className="relative p-4 bg-white border-2 border-black rounded-tr-lg rounded-br-lg shadow-sm"
              >
                {/* Product Tag */}
                <span className="absolute -top-1 -left-1 bg-[#FCD301] text-black py-2 px-3 text-md rounded-br-lg rounded-tl-lg font-semibold border-2 border-black">
                  {product.name}
                </span>

                {/* Product Image */}
                <div className="w-full h-32 mb-4 flex items-center justify-center">
                  <img
                    src={product.imgSrc}
                    alt={product.name}
                    className="object-contain h-full rounded-md"
                  />
                </div>

                {/* Price, Stock, and Edit Button Row */}
                <div className="flex items-center justify-between border-t pt-2">
                  <div className="flex space-x-28">
                    <div>
                      <p className="text-xs text-gray-500">Price</p>
                      <p className="text-xl font-bold text-gray-900">
                        ₱{product.price}
                      </p>
                    </div>
                    <div>
                     
                      <p className="text-xl font-bold text-gray-900">
                    
                      </p>
                    </div>
                  </div>
                  <Link to="/editProducts">
                    <button className="py-1 px-4 bg-black text-white rounded-lg hover:bg-gray-900 transition font-semibold">
                      Edit
                    </button>
                  </Link>
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
              <div
                key={index}
                className="relative p-4 bg-white border-2 border-black rounded-tr-lg rounded-br-lg shadow-sm"
              >
                {/* Service Tag */}
                <span className="absolute -top-1 -left-1 bg-[#FCD301] text-black py-2 px-3 text-md rounded-br-lg rounded-tl-lg font-semibold border-2 border-black">
                  {service.name}
                </span>

                {/* Service Image */}
                <div className="w-full h-32 mb-4 flex items-center justify-center">
                  <img
                    src={service.imgSrc}
                    alt={service.name}
                    className="object-contain h-full rounded-md"
                  />
                </div>

                {/* Price and Edit Button Row */}
                <div className="flex items-center justify-between border-t pt-2 px-2">
                  <div>
                    <p className="text-xs text-gray-500">Price</p>
                    <p className="text-xl font-bold text-gray-900">
                      ₱{service.price}
                    </p>
                  </div>
                  <Link to="/editProducts">
                    <button className="py-1 px-4 bg-black text-white rounded-lg hover:bg-gray-900 transition font-semibold">
                      Edit
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsInventory;
