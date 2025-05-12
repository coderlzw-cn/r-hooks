export default {
    '*.{js,ts}': [
      "npm run lint",
      "npm run format",
      "npm run lint:check",
      "npm run format:check",
    ],
    '*.{json,md}': [
      "npm run format",
      "npm run format:check",
    ],
  };