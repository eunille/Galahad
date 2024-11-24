import React, { useEffect, useState } from "react";
import Sidebar from "@/components/ui/sidebar";
import EditProducts from "@/components/products/editProducts"; // Import the modal component
import dataFetch from "@/services/dataService";

const ProductsInventory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    id: number;
    name: string;
    price: string;
    stock: string;
    image: string | null;
    product_type: string;
    product_description: string;
  } | null>(null);

  const [products, setProducts] = useState<
    {
      id: number;
      name: string;
      price: string;
      stock: string;
      image: string | null;
      product_type: string;
      product_description: string;
    }[]
  >([]);

  const handleEditClick = (product: {
    id: number;
    name: string;
    price: string;
    stock: string;
    image: string | null;
    product_type: string;
    product_description: string;
  }) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const updateProductDetails = async (updatedProduct: {
  id: number;
  name: string;
  price: string;
  stock: string;
  image: string | null; // image field can either be a URL or null
  product_type: string;
  product_description: string;
}) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Token not found in local storage.");
    return;
  }

  const url = `products/${updatedProduct.id}/`;
  const method = "PUT"; // Using PUT to update the product

  // Ensure image field is set correctly (either a URL or null)
  const payload = {
    id: updatedProduct.id,
    name: updatedProduct.name,
    price: updatedProduct.price,
    stock: updatedProduct.stock,
    image: updatedProduct.image || null, // Set to null if no image is provided
    product_type: updatedProduct.product_type,
    product_description: updatedProduct.product_description,
  };

  try {
    // Send the updated data to the API
    const response = await dataFetch(url, method, payload, token);

    // If update is successful, update the local state
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    closeModal();
  } catch (error) {
    console.error("Failed to update product:", error);
  }
};

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found in local storage.");
      return;
    }
    getProducts(token);
  }, []);

  const getProducts = async (token: string) => {
    const url = "products/";
    const method = "GET";

    try {
      const response = await dataFetch(url, method, {}, token);
      const formattedData = response.map((item: any) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        stock: item.stock,
        image: item.image,
        product_type: item.product_type,
        product_description: item.product_description,
      }));
      setProducts(formattedData);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  return (
    <div className="flex h-screen mt-2">
      <div className="flex h-full w-full">
        <Sidebar />

        <div className="flex flex-col flex-grow ml-64 p-6 bg-gray-50 overflow-y-auto">
          <div className="flex justify-between items-center mb-6 border-b border-gray-300 pb-4">
            <h2 className="text-2xl font-bold text-gray-800">Pricing</h2>
            <button className="py-2 px-4 bg-[#FCD301] text-black font-semibold rounded-lg shadow border-2 border-black">
              Membership Price
            </button>
          </div>

          <div className="w-full max-w-full px-4 py-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="relative p-4 bg-white border-2 border-black rounded-lg shadow-sm"
                >
                  <span className="absolute -top-1 -left-1 bg-[#FCD301] text-black py-2 px-3 text-md rounded-br-lg rounded-tl-lg font-semibold border-2 border-black">
                    {product.name}
                  </span>
                  <div className="w-full h-32 mb-4 flex items-center justify-center">
                    <img
                      src={product.image || "https://via.placeholder.com/150"}
                      alt={product.name}
                      className="object-contain h-full rounded-md"
                    />
                  </div>
                  <div className="flex items-center justify-between border-t pt-2">
                    <div>
                      <p className="text-xs text-gray-500">Price</p>
                      <p className="text-xl font-bold text-gray-900">₱{product.price}</p>
                    </div>
                    <button
                      onClick={() => handleEditClick(product)}
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

      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-30"></div>
          <div className="relative bg-white rounded-lg shadow-xl p-8 w-full max-w-3xl z-50">
            <EditProducts
              product={{
                id: selectedProduct.id,
                name: selectedProduct.name,
                price: parseFloat(selectedProduct.price),
                imgSrc: selectedProduct.image,
              }}
              closeModal={closeModal}
              updateProduct={updateProductDetails}  
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsInventory;
