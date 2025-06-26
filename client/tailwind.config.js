/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'space-dark': '#0D1117',      // Deep, dark blue-black for backgrounds
          'space-blue': '#161B22',      // Slightly lighter blue-black for panels
          'space-purple': '#8B5CF6',    // A vibrant purple accent
          'cosmic-green': '#34D399',    // A bright green, like an aurora
          'accent-cyan': '#22D3EE',      // Bright cyan for highlights and buttons
          'text-primary': '#F0F6FC',     // Off-white for primary text
          'text-secondary': '#8D96A0',    // Muted gray for secondary text
          'border-color': '#30363D',    // Subtle border color
        }
      },
    },
    plugins: [],
}
  