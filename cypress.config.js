const { defineConfig } = require("cypress");
// require("@cypress/grep/src/plugin")(config);

module.exports = defineConfig({
  e2e: {
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
