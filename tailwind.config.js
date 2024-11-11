const flowbite = require("flowbite/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{html,js,ts,jsx,tsx}", // Ensure Flowbite React components are included
  ],
  theme: {
  	extend: {
  		
  	}
  },
  plugins: [
    flowbite, // Directly reference flowbite as a plugin
      require("tailwindcss-animate")
],
};
