module.exports = {
  useTabs: false,
  tabWidth: 2,
  singleQuote: true,
  printWidth: 160,
  endOfLine: 'lf',
  trailingComma: 'all',
  bracketSpacing: true,
  overrides: [
    {
      files: '*.md',
      options: {
        printWidth: 70,
        trailingComma: 'none',
        arrowParens: 'avoid',
        proseWrap: 'never',
      },
    },
  ],
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindAttributes: ['className'],
  tailwindFunctions: ['clsx'],
};
