import type { Config } from 'tailwindcss';

/**
 * Renk paleti entegrematik.com kurumsal kimliğiyle birebir uyumludur:
 * - Lacivert tonları: #0F172A (navy-900), #1E293B (navy-800) -> slate ile eşleşir
 * - Marka mavileri:   #2563EB (brand-600), #3B82F6 (brand-500)
 */
const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        navy: {
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      boxShadow: {
        card: '0 4px 24px -4px rgb(15 23 42 / 0.08)',
        'card-hover': '0 16px 40px -8px rgb(15 23 42 / 0.16)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;