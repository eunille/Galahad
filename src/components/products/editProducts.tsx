import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const EditProducts = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [category, setCategory] = useState<string>('');
  const [productName, setProductName] = useState<string>('');
  const [stockAmount, setStockAmount] = useState<number | string>('');
  const [price, setPrice] = useState<number | string>('');

  // Simulated product data for editing
  useEffect(() => {
    // In a real application, you would fetch this data based on product ID
    const productData = {
      image: 'https://via.placeholder.com/150', // Example image URL
      name: 'Example Product',
      category: 'Product',
      stock: 100,
      price: 29.99
    };

    setImagePreview(productData.image);
    setProductName(productData.name);
    setCategory(productData.category);
    setStockAmount(productData.stock);
    setPrice(productData.price);
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    // Logic to save changes
    console.log("Product details updated:", { productName, category, stockAmount, price });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
        <h1 className="text-xl font-semibold mb-6 text-gray-800">Edit Product</h1>
        
        <div className="flex space-x-8">
          {/* Left Side - Image/Preview Section */}
          <div className="w-1/2 flex flex-col items-center justify-center space-y-4">
            <div className="relative w-3/4 h-80 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
              {imagePreview ? (
                <img src={imagePreview} alt="Product Preview" className="object-cover h-full w-full" />
              ) : (
                <span className="text-gray-400">Image Preview</span>
              )}
              <label className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 flex items-center justify-center text-white font-semibold cursor-pointer transition-opacity">
                <span>Click to Upload Image</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </label>
            </div>
          </div>
          
          {/* Right Side - Form Section */}
          <div className="w-1/2 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                placeholder="Enter product name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              >
                <option value="" disabled>Select a category</option>
                <option value="Product">Product</option>
                <option value="Services">Services</option>
              </select>
            </div>
            

            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                placeholder="Enter price"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-8">
          <button onClick={handleSaveChanges} className="py-2 px-4 bg-[#FCD301] text-black font-semibold rounded-lg shadow border-2 border-black">
            Save Changes
          </button>
          <Link to="/productsInventory">
            <button className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition focus:outline-none focus:ring-2 focus:ring-red-400">Cancel</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditProducts;
