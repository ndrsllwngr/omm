describe('Cypress Demo-Login', () => {
  it('sign up scenario', () => {
    cy.visit('https://omm.vercel.app/')
    cy.get('.hover\\3Atext-gray-300').click()
    cy.get('#email').type('newuser123@testing.com')
    cy.get('#password').type('cypresstest123')
    cy.get('.border-transparent').click()
    cy.get('form').submit()
  })
})
