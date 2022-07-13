module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint"
  ],
  extends: [
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  rules: {
    "semi": ["error", "always"],
    "indent": ["error", 4, { "SwitchCase": 1 }]
  },
};
