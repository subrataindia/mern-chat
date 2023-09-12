const { run } = require("jest");
const { resolve } = require("path");

async function runTests() {
  try {
    const config = {
      preset: "react-native",
      testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
      testPathIgnorePatterns: ["/node_modules/", "/android/", "/ios/"], // Adjust these patterns as needed
    };
    const projectDir = resolve(__dirname, "./"); // Adjust the path to your project root
    const results = await run([], projectDir, config);
    console.log(results);
  } catch (error) {
    console.error("Error running tests:", error);
  }
}

runTests();
