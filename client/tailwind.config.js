/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'primary-color': '#C19D7A',
      'secondary-color':'#313131',
      'third-color':'#1C1C1C',
      'black':'#000',
      'white':'#fff',
      'grey':'#fafafa'
    }
    
  },
  plugins: [],
}