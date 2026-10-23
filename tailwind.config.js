/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class', // Permite alternar manualmente el theme
  theme: {
    extend: {
      colors: {
        darkBg: '#0b0f19',
        cardDark: '#131826',
        cardBorder: '#1f293d',
        accentLime: '#84cc16', // Estilo los toques de la imagen
        accentPurple: '#a855f7',
      },
    },
  },
  plugins: [],
}