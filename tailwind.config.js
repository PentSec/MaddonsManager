/** @type {import('tailwindcss').Config} */
const daisyui = require('daisyui')
const typography = require('@tailwindcss/typography')
const tailwind_theme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/**/*.{html,js}',
    './*.{html,js}',
    './index.html',
    './renderer.js',
    './config.html',
    './config.js',
    './alert.html',
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
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter',
      'dim',
      'nord',
      'sunset',
    ],
    darkTheme: 'dark', // nombre de uno de los temas incluidos para el modo oscuro
    base: true, // aplica el color de fondo y color de primer plano para el elemento raíz por defecto
    styled: true, // incluye colores y decisiones de diseño de daisyUI para todos los componentes
    utils: true, // agrega clases utilitarias responsivas y de modificadores
    prefix: '', // prefijo para los nombres de clase de daisyUI (componentes, modificadores y nombres de clase responsivos. No colores)
    logs: true, // muestra información sobre la versión de daisyUI y la configuración usada en la consola al construir tu CSS
    themeRoot: ':root', // El elemento que recibe las variables CSS de color del tema
  },
};