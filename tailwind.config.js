/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FBCA17',
        'lightning-yellow': {
          '50': '#fefce8',
          '100': '#fef8c3',
          '200': '#feee8a',
          '300': '#fede46',
          '400': '#fbca17',
          '500': '#ebb007',
          '600': '#cb8703',
          '700': '#a26006',
          '800': '#854b0e',
          '900': '#713e12',
          '950': '#421f06',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio')
  ],
}

