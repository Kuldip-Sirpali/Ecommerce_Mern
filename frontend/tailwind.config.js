/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#650102", // Example custom color
        Hmain: "#77252c",
      },
    },
  },
  plugins: [],
};
