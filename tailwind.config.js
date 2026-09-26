import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        agri: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
        },
        trustblue: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0284c7',
          600: '#0369a1',
          700: '#075985',
          800: '#0c4a6e',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        ruralTrust: {
          "primary": "#0D7A5F",          // Deep emerald/forest green (agriculture, growth)
          "primary-content": "#ffffff",
          "secondary": "#0284C7",        // Trust blue (financial/market intelligence)
          "secondary-content": "#ffffff",
          "accent": "#D97706",           // Harvest amber
          "accent-content": "#ffffff",
          "neutral": "#1E293B",          // Slate dark
          "neutral-content": "#F8FAFC",
          "base-100": "#FFFFFF",         // Crisp card base
          "base-200": "#F8FAFC",         // App canvas background
          "base-300": "#E2E8F0",         // Borders and dividing lines
          "base-content": "#0F172A",     // High contrast readable text
          "info": "#0284C7",
          "success": "#16A34A",
          "warning": "#EAB308",
          "error": "#DC2626",
          "--rounded-box": "0.75rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "1.9rem",
          "--animation-btn": "0.2s",
          "--tab-radius": "0.5rem",
        },
      },
      "light",
      "forest"
    ],
    defaultTheme: "ruralTrust",
  },
}
