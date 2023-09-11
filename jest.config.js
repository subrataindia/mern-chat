module.exports = {
  preset: "jest-expo",
  setupFiles: ["./setupTests.js"],
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  transformIgnorePatterns: [
    "node_modules/(?!(@?(jest-)?react-native|@react-navigation|react-native-vector-icons|@react-native/js-polyfills)/)",
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
};
