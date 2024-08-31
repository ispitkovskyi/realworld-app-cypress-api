/// <references types="cypress" />

describe('Test with backend', () => {
    beforeEach('login to application', () => {
        cy.loginToApplication()
    })

    it('verify use can log out successfully', {retries: 1}, () => {
        cy.contains('Settings').click()
        cy.contains('Or click here to logout.').click()
        cy.get('.navbar-nav').should('contain', 'Sign up1')
    })
})
