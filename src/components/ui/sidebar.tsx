// src/components/ui/Sidebar.tsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 border-r-2 border-black bg-white"
        aria-label="Sidebar"
      >
        <div className="h-full px-4 py-6 overflow-y-auto">
          <div className="flex flex-col items-center mb-6">
            <img
              className="w-32 h-32 mb-4 rounded-full shadow-lg border border-gray-300"
              src="../src/assets/img/logo/gym-logo.png" 
              alt="Gym Logo"
            />
            <span className="text-2xl font-bold text-gray-800">AE Gym Flow</span>
          </div>
          <ul className="flex flex-col items-center space-y-2 font-medium">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center p-3 text-gray-800 bg-yellow-300 rounded-lg border border-black hover:bg-yellow-400 transition-colors"
              >
                <svg
                  className="w-6 h-6 text-gray-500 transition duration-75"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
                <span className="ms-3">Main Dashboard</span>
              </Link>
            </li>
            
            <li>
              <Link
                to="/reports"
                className="flex items-center p-3 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <svg
                  className="w-6 h-6 text-gray-500 transition duration-75"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 12h2v8H4v-8zm7-6h2v14h-2V6zm7 3h2v11h-2V9z" />
                </svg>
                <span className="ms-3">Analytics</span>
              </Link>
            </li>

            {/* New Products link */}
            <li>
              <Link
                to="/productsInventory"
                className="flex items-center p-3 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <svg
                  className="w-6 h-6 text-gray-500 transition duration-75"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 6H4C3.44772 6 3 6.44772 3 7V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V7C21 6.44772 20.5523 6 20 6ZM19 19H5V8H19V19Z" />
                </svg>
                <span className="ms-3">Pricing</span>
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="flex items-center p-3 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <svg
                  className="w-6 h-6 text-gray-500 transition duration-75"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 6H4C3.44772 6 3 6.44772 3 7V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V7C21 6.44772 20.5523 6 20 6ZM19 19H5V8H19V19Z" />
                </svg>
                <span className="ms-3">Login</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

