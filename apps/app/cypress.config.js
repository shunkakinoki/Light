const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require("@cypress/code-coverage/task")(on, config);
      return config;
    },
    baseUrl: "http://localhost:3000",
    projectId: "krmrf2",
    runMode: 3,
    pageLoadTimeout: 300000,
  },
});
