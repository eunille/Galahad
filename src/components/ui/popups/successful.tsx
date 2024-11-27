import React, { useState, useEffect } from 'react';

const Successful = () => {
  const [isVisible, setIsVisible] = useState(true);

  // Automatically hide the popup after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false); // Hide the popup after 3 seconds
    }, 3000);

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  // If the popup is not visible, don't render anything
  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-5 right-5 max-w-md bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700 transform transition-opacity duration-500 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      role="alert"
      aria-live="assertive"
      aria-labelledby="hs-toast-success-example-label"
      style={{ zIndex: 1000 }}
    >
      <div className="flex p-4 items-center">
        <div className="shrink-0">
          <svg
            className="text-teal-500"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <p id="hs-toast-success-example-label" className="text-sm text-gray-700 dark:text-neutral-400">
           Added Successfully
          </p>
        </div>
      </div>
    </div>
  );
};

export default Successful;