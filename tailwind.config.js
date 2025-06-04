/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'glow': 'glow 4s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': {
            textShadow: '0 0 0px #fff',
          },
          '100%': {
            textShadow: '0 0 20px #fff, 0 0 30px #fff, 0 0 40px #fff',
          }
        }
      }
    },
  },
  plugins: [],
}; 