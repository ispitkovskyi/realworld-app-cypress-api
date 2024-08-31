const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  env: {
    username: 'someInvalidEmail@ukr.net',  //valid value is inside the cypress.env.json file overrides this one
    password: 'conduit',
    apiUrl: 'https://conduit-api.bondaracademy.com/api'
  },
  e2e: {
    setupNodeEvents(on, config) {
      const username = process.env.DB_USERNAME
      const password = process.env.PASSWORD

      if(!password) {
        throw new Error('missing credentials')
      }

      config.env = {username, password}
      return config
      // implement node event listeners here
    },

    baseUrl: 'https://conduit.bondaracademy.com/',
    specPattern: 'cypress/e2e/**/*.spec.{js,jsx,ts,tsx}'
  },
});
