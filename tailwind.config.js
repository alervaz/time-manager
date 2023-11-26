/** @type {import('tailwindcss').Config} */
module.exports = {
  variants: {
    opacity: ({ after }) => after(["disabled"]),
    extend: {
      backgroundColor: ['even'],
    }
  },

  content: ["./views/**/*.html"],
  theme: {
    extend: {},
  },
  plugins: [],
}

