const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  collectCoverage: true,
  collectCoverageFrom: ["./src/**"],
  moduleDirectories: ["node_modules", "<rootDir>/"],
  moduleNameMapper: {
    "^@lightdotso/og/(.*)$": "<rootDir>/src/$1",
  },
  testEnvironment: "jest-environment-jsdom",
};

module.exports = createJestConfig(customJestConfig);
