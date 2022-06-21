const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    projectId: "ugz2uw",
    runMode: 3,
  },
});
