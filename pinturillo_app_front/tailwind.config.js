/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'main-blue'     : '#5CACC4',
        'main-green'    : '#8CD19D',
        'main-yellow'   : '#CEE879',
        'main-orange'   : '#FCB653',
        'main-red'      : '#FF5254'
      },
      backgroundImage: {
        'principal-image': "url('/src/assets/images/background.webp')",
      }
    },
  },
  plugins: [],
}

