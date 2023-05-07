/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        poppinsLight: "PoppinsLight",
        poppinsSemiBold: "PoppinsSemiBold",
        lobster: "Lobster",
      },
    },
  },
  plugins: [],
};
