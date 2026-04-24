export default {
  plugins: ['prettier-plugin-tailwindcss'],
  /** Tailwind v4: el plugin necesita una hoja con @import "tailwindcss" (ver README del plugin). */
  tailwindStylesheet: './tailwind-prettier.css',
  tabWidth: 2,

  printWidth: 120,
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
}
