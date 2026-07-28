/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#081B2C',
        accent: '#A83D18',
        background: '#F5F0E8',
        dark: '#0A1723',
        muted: '#52606D',
        sand: '#E8DFD1',
        teal: '#0D666B',
        sky: '#DDECEE',
        sun: '#E9A23B',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Space Grotesk"', 'sans-serif'],
        drama: ['"DM Serif Display"', 'serif'],
        data: ['"Space Mono"', 'monospace'],
      },
      boxShadow: {
        card: '0 18px 50px rgba(8, 27, 44, 0.08)',
        lift: '0 24px 70px rgba(8, 27, 44, 0.16)',
      },
      maxWidth: {
        reading: '46rem',
      },
    },
  },
  plugins: [],
}
