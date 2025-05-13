/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0c5458',    // Main color
        secondary: '#0d7a7f',  // Slightly lighter shade
        accent: '#0e9fa6',     // Lightest shade
        'primary-dark': '#094042', // Darker shade
        'primary-light': '#0e9fa6', // Lighter shade
      },
    },
  },
  plugins: [],
}