/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        surface: '#f9fafb',     // light gray
        text: '#111827',        // almost black
        muted: '#6b7280',       // gray-500
        border: '#e5e7eb',      // gray-200
        sidebar: '#1f2937',     // gray-800
        sidebarText: '#f3f4f6', // gray-100
        hover: '#374151',       // gray-700
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      spacing: {
        layout: '1.5rem', // Global padding/margin
      },
      fontSize: {
        title: '1.875rem',   // 30px
        subtitle: '1.25rem', // 20px
      },
    },
  },
  plugins: [],
};
