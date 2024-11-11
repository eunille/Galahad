import React, { useState } from "react";
import PurchaseReceipt from "./purchaseReceipt";

interface PurchaseProps {
  onClose: () => void;
  onRenew: () => void;
  onConfirm?: () => void; // Make onConfirm optional
}

interface Product {
  name: string;
  quantity: number;
}

const Purchase: React.FC<PurchaseProps> = ({ onClose, onRenew }) => {
  const [products, setProducts] = useState<Product[]>([
    { name: "Creatine", quantity: 0 },
    { name: "Mass Gainer", quantity: 0 },
    { name: "Amino", quantity: 0 },
  ]);

  const [services, setServices] = useState<
    { name: string; checked: boolean }[]
  >([
    { name: "Water", checked: false },
    { name: "Towel", checked: false },
    { name: "Treadmill", checked: false },
  ]);

  const [showReceipt, setShowReceipt] = useState(false);

  const updateQuantity = (
    items: Product[],
    index: number,
    delta: number,
    setter: React.Dispatch<React.SetStateAction<Product[]>>
  ) => {
    const updatedItems = [...items];
    updatedItems[index].quantity = Math.max(
      0,
      updatedItems[index].quantity + delta
    );
    setter(updatedItems);
  };

  const toggleService = (index: number) => {
    const updatedServices = [...services];
    updatedServices[index].checked = !updatedServices[index].checked;
    setServices(updatedServices);
  };

  const handleConfirm = () => {
    setShowReceipt(true);
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
  };

  const handleConfirmReceipt = () => {
    setShowReceipt(false); // Close the modal
  };

  return (
    <>
      {showReceipt ? (
        <PurchaseReceipt
          onClose={() => {
            handleCloseReceipt();
            onClose();
            handleConfirmReceipt();
          }}
        />
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg transform transition-all duration-300">
            <h2 className="text-gray-800 font-bold text-2xl mb-6 text-center">
              Purchase
            </h2>
            <hr className="mb-6 border-t-2 border-gray-200" />
            <div className="grid grid-cols-2 gap-8 mb-6">
              <div>
                <label className="text-lg font-semibold text-gray-700">
                  Products
                </label>
              </div>
              <div>
                <label className="text-lg font-semibold text-gray-700">
                  Services
                </label>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                {products.map((product, index) => (
                  <div
                    key={product.name}
                    className="flex items-center justify-between mb-4"
                  >
                    <span className="text-gray-700 font-medium">
                      {product.name}
                    </span>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() =>
                          updateQuantity(products, index, 1, setProducts)
                        }
                        className="w-8 h-8 flex items-center justify-center bg-[#FCD301] text-black rounded-full font-bold shadow hover:bg-yellow-400"
                      >
                        +
                      </button>
                      <span className="px-4 py-2 text-gray-700 font-semibold bg-gray-100 rounded-md shadow-inner">
                        {product.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(products, index, -1, setProducts)
                        }
                        className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-full font-bold shadow hover:bg-gray-800"
                      >
                        -
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                {services.map((service, index) => (
                  <div
                    key={service.name}
                    className={`flex w-44 items-center p-4 mb-4 rounded-lg border-2 cursor-pointer transition duration-200 ${
                      service.checked
                        ? "bg-yellow-100 border-yellow-500"
                        : "bg-white border-gray-300 hover:bg-gray-100"
                    }`}
                    onClick={() => toggleService(index)}
                  >
                    <input
                      type="checkbox"
                      checked={service.checked}
                      onChange={() => toggleService(index)} // Update state on checkbox change
                      className="mr-2 w-6 h-6 border-gray-300 rounded-sm text-black focus:ring-black"
                    />
                    <span className="text-gray-700 font-medium">
                      {service.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <button
                className="px-8 py-2 bg-[#FCD301] text-gray-800 font-bold rounded-lg shadow-lg border border-black transform transition hover:bg-yellow-500 hover:scale-105"
                onClick={handleConfirm}
              >
                Confirm
              </button>
              <button
                onClick={onRenew}
                className="px-6 py-2 w-32 text-white bg-black rounded-md shadow-md"
              >
                Renew
              </button>

              <button
                className="px-8 py-2 bg-red-500 text-white font-bold rounded-lg shadow-lg transform transition hover:bg-red-600 hover:scale-105"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Purchase;
