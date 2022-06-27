module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:vue/vue3-recommended", "standard", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["vue"],
  ignorePatterns: ["node_modules/", "dist/", "routes/", "src/"],
  globals: {
    Nova: true,
  },
  rules: {
    "no-console": ["error", { allow: ["warn", "error"] }],
    "no-empty-function": "error",
    "vue/no-unused-properties": [
      "error",
      { groups: ["props", "data", "computed", "methods", "setup"] },
    ],
    "vue/require-prop-types": "off",
  },
}
