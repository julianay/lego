/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        tomato: '#FF6347',
      },
    },
  },
  plugins: [],
} 