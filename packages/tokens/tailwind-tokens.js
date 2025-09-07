// Optional: Use this file to expose design tokens as Tailwind theme values
// You can import it in tailwind.config.js like:
// const tokens = require('@clotheslinestudio/tokens/tailwind-tokens.js')
module.exports = {
  theme: {
    extend: {
      borderRadius: {
        DEFAULT: 'var(--radius-base)',
      },
      spacing: {
        1: 'var(--spacing-1)',
        2: 'var(--spacing-2)',
      },
      fontSize: {
        base: 'var(--font-size-base)',
      }
    }
  }
}