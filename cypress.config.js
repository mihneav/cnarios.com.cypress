const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    viewportWidth: 1280,
    viewportHeight: 1024,
    setupNodeEvents(on, config) {
      const { plugin: cypressGrepPlugin } = require("@cypress/grep/plugin");
      cypressGrepPlugin(config);
      return config;
    },
    includeShadowDom: true,
    baseUrl: "https://www.cnarios.com/concepts",
    env: {
      grepFilterSpecs: true,
    },
  },
});
