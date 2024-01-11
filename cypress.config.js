const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8099',
    env: {
      hideCredentials: true,
      requestMode: true
    },
    experimentalRunAllSpecs: true,
  },
  fixturesFolder: false,
  video: false,
})