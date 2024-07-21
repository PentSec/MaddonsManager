/** @type {import('tailwindcss').Config} */
const daisyui = require('daisyui');
const typography = require('@tailwindcss/typography');
const tailwind_theme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/**/*.{html,js}',
    './*.{html,js}',
    './index.html',
    './src/renderer.js',
    './src/components/config.html',
    './src/components/config.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans', ...tailwind_theme.fontFamily.sans],
        mono: ['Victor Mono', ...tailwind_theme.fontFamily.mono],
      },
    },
  },
  plugins: [
    typography,
    daisyui,
    require('tailwind-scrollbar'),
  ],
  daisyui: {
    themes: [
      'light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate',
      'synthwave', 'retro', 'cyberpunk', 'valentine', 'halloween',
      'garden', 'forest', 'aqua', 'lofi', 'pastel', 'fantasy',
      'wireframe', 'black', 'luxury', 'dracula', 'cmyk', 'autumn',
      'business', 'acid', 'lemonade', 'night', 'coffee', 'winter',
      'dim', 'nord', 'sunset',
    ],
    darkTheme: 'dark',
    base: true,
    styled: true,
    utils: true,
    prefix: '',
    logs: true,
    themeRoot: ':root',
  },
};