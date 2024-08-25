// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('loginToApplication', () => {
    // cy.visit('/login')
    // cy.get('[placeholder="Email"]').type('terem222@ukr.net')
    // cy.get('[placeholder="Password"]').type('conduit')
    // cy.get('form').submit()

    const userCredentials = {"user": {"email": "terem222@ukr.net", "password": "conduit"}}

    cy.request("POST", "https://conduit-api.bondaracademy.com/api/users/login", userCredentials)
        .its('body').then((body) => {
        const token = body.user.token

        // SAVE TOKEN INTO CYPRESS ALIAS TO REUSE IN TESTS
        cy.wrap(token).as('token')

        // Get the token
        cy.visit('/', {
            // Save the token into the browser's Application -> Local Storage before doing anything else in browser
            onBeforeLoad(win) {
                // 'jwtToken' value taken from browser dev tools -> Application -> Local storage
                win.localStorage.setItem('jwtToken', token)
            }
        })
    })
})
