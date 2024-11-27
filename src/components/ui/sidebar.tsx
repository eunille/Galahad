import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
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
        className="fixed top-0 left-0 z-40 w-64 h-screen bg-white shadow-lg sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full flex flex-col justify-between px-4 py-6">
          {/* Logo and Header */}
          <div>
            <div className="flex flex-col items-center mb-8">
              <img
                className="w-24 h-24 mb-4 rounded-full shadow-lg"
                src="../src/assets/img/logo/gym-logo.png"
                alt="Gym Logo"
              />
              <span className="text-xl font-semibold text-gray-900">
                AE Gym 
              </span>
            </div>
            {/* Navigation Items */}
            <ul className="space-y-3">
              {/* Main Dashboard */}
              <li>
                <Link
                  to="/dashboard"
                  className={`flex items-center px-4 py-2 rounded-lg ${
                    isActive("/dashboard")
                      ? "bg-yellow-300 text-gray-900"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <svg
                    className="w-6 h-6 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                  <span className="ms-3 font-medium">Membership</span>
                </Link>
              </li>
              {/* Analytics */}
              <li>
                <Link
                  to="/reports"
                  className={`flex items-center px-4 py-2 rounded-lg ${
                    isActive("/reports")
                      ? "bg-yellow-300 text-gray-900"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <svg
                    className="w-6 h-6 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 12h2v8H4v-8zm7-6h2v14h-2V6zm7 3h2v11h-2V9z" />
                  </svg>
                  <span className="ms-3 font-medium">Analytics</span>
                </Link>
              </li>
              {/* Pricing */}
              <li>
                <Link
                  to="/productsInventory"
                  className={`flex items-center px-4 py-2 rounded-lg ${
                    isActive("/productsInventory")
                      ? "bg-yellow-300 text-gray-900"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <svg
                    className="w-6 h-6 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6H4C3.44772 6 3 6.44772 3 7V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V7C21 6.44772 20.5523 6 20 6ZM19 19H5V8H19V19Z" />
                  </svg>
                  <span className="ms-3 font-medium">Products</span>
                </Link>
              </li>
            </ul>
          </div>
          {/* Log Out */}
          <div>
            <Link
              to="/login"
              className={`flex items-center px-4 py-2 rounded-lg ${
                isActive("/login")
                  ? "bg-yellow-300 text-gray-900"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <svg
                className="w-6 h-6 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M9 3H4a1 1 0 00-1 1v16a1 1 0 001 1h5v-2H5V5h4V3zm11 9l-5-5v3H9v4h6v3l5-5z" />
              </svg>
              <span className="ms-3 font-medium">Log out</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
