const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    projectId: "axo7ka",
    runMode: 3,
  },
});
