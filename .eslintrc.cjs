module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "overrides": [],
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  plugins: ['react-refresh',"react", "react-hooks", "@typescript-eslint"],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-unused-vars": "off"
  }
}
