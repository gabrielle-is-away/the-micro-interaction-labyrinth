/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f7ff',
          500: '#6366f1',
          900: '#312e81',
        },
      },
      animation: {
        'sr-pulse': 'sr-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'sr-pulse': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: .5 },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
