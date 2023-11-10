/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        "scale-out-center": {
          "0%": {
            "-webkit-transform": "scale(1)",
            transform: "scale(1)",
            opacity: 1,
          },
          "100%": {
            "-webkit-transform": "scale(0)",
            transform: "scale(0)",
            opacity: 1,
          },
        },
      },
      backgroundImage: {
        gradient: "linear-gradient(to right, white 60%, yellow 40%)",
      },
      animation: {
        "scale-out-center":
          "scale-out-center 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both ",
      },
    },
  },
  plugins: [],
};
