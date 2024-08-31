const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  env: {
    username: 'someInvalidEmail@ukr.net',  //valid value is inside the cypress.env.json file overrides this one
    password: 'conduit',
    apiUrl: 'https://conduit-api.bondaracademy.com/api'
  },
  retries: {
    runMode: 2, // in CI pipeline:  npx run --spec 'cypress/e2e/2_secondTest.spec.js'
    openMode: 0, // when debugging visually in Cypress UI
  },
  e2e: {
    baseUrl: 'https://conduit.bondaracademy.com/',
    // specPattern: 'cypress/e2e/**/{*.spec,.*cy}.js',
    specPattern: [
      // '**/*.{js,jsx,ts,tsx}',
      'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
      'cypress/e2e/**/*.spec.{js,jsx,ts,tsx}',
      'cypress/e2e/**/{*.spec,.*cy}.js',
      'cypress/e2e/**/*.{js,jsx,ts,tsx}'
    ]
 /*   setupNodeEvents(on, config) {
      const username = process.env.DB_USERNAME
      const password = process.env.PASSWORD

      if(!password) {
        throw new Error('missing credentials')
      }

      config.env = {username, password}
      return config
      // implement node event listeners here
    },*/
  },
});
