/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5A6D79',
          light: '#8FA4A8',
          dark: '#527784',
        },
        link: {
          DEFAULT: '#527784',
          hover: '#5A6D79',
        }
      },
    },
  },
  plugins: [],
}
