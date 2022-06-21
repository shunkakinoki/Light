const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    projectId: "6un49s",
    runMode: 3,
  },
});
