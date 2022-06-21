const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    projectId: "ukw6xm",
    runMode: 3,
  },
});
