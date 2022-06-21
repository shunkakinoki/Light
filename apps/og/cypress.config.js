const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    projectId: "div8g5",
    runMode: 3,
  },
});
