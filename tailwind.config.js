/** @type {import('tailwindcss').Config} */
// Marketing design system tokens (scoped `.mkt`; values resolve to CSS variables in
// src/marketing/styles/tokens.css). Theme-aware via the `.dark` class.
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        mkt: {
          primary: {
            900: 'rgb(var(--mkt-primary-900) / <alpha-value>)',
            700: 'rgb(var(--mkt-primary-700) / <alpha-value>)',
            500: 'rgb(var(--mkt-primary-500) / <alpha-value>)',
            300: 'rgb(var(--mkt-primary-300) / <alpha-value>)',
            50: 'rgb(var(--mkt-primary-50) / <alpha-value>)',
          },
          accent: {
            600: 'rgb(var(--mkt-accent-600) / <alpha-value>)',
            400: 'rgb(var(--mkt-accent-400) / <alpha-value>)',
            200: 'rgb(var(--mkt-accent-200) / <alpha-value>)',
          },
          gold: {
            500: 'rgb(var(--mkt-gold-500) / <alpha-value>)',
            200: 'rgb(var(--mkt-gold-200) / <alpha-value>)',
          },
          ink: {
            900: 'rgb(var(--mkt-ink-900) / <alpha-value>)',
            700: 'rgb(var(--mkt-ink-700) / <alpha-value>)',
            500: 'rgb(var(--mkt-ink-500) / <alpha-value>)',
            300: 'rgb(var(--mkt-ink-300) / <alpha-value>)',
          },
          bg: 'rgb(var(--mkt-bg) / <alpha-value>)',
          surface: 'rgb(var(--mkt-surface) / <alpha-value>)',
          elevated: 'rgb(var(--mkt-elevated) / <alpha-value>)',
          border: 'rgb(var(--mkt-border) / <alpha-value>)',
          focus: 'rgb(var(--mkt-focus) / <alpha-value>)',
          success: 'rgb(var(--mkt-success) / <alpha-value>)',
          warning: 'rgb(var(--mkt-warning) / <alpha-value>)',
          error: 'rgb(var(--mkt-error) / <alpha-value>)',
          info: 'rgb(var(--mkt-info) / <alpha-value>)',
        },
      },
      borderRadius: {
        'mkt-sm': '6px',
        'mkt-md': '10px',
        'mkt-lg': '16px',
        'mkt-xl': '24px',
      },
      maxWidth: {
        'mkt-content': '1200px',
        'mkt-wide': '1440px',
        'mkt-prose': '72ch',
      },
      boxShadow: {
        'mkt-1': '0 1px 2px rgb(11 18 32 / 0.06), 0 1px 3px rgb(11 18 32 / 0.08)',
        'mkt-2': '0 4px 12px rgb(11 18 32 / 0.08)',
        'mkt-3': '0 12px 32px rgb(11 18 32 / 0.12)',
      },
    },
  },
  plugins: [],
};
