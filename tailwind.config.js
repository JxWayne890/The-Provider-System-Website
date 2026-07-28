/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0B3060',
        accent: '#B45309',
        background: '#F4F7FB',
        dark: '#031427',
        muted: '#53677D',
        sand: '#E6EDF6',
        teal: '#087E8B',
        sky: '#DDECF8',
        sun: '#FF9F1C',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Space Grotesk"', 'sans-serif'],
        drama: ['"DM Serif Display"', 'serif'],
        data: ['"Space Mono"', 'monospace'],
      },
      boxShadow: {
        card: '0 18px 50px rgba(11, 48, 96, 0.08)',
        lift: '0 24px 70px rgba(3, 20, 39, 0.16)',
      },
      maxWidth: {
        reading: '46rem',
      },
    },
  },
  plugins: [],
}
