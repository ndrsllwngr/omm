describe('Cypress Generate-Demo', () => {
  it('sign up scenario', () => {
    cy.visit('https://omm.vercel.app/')
    cy.get('.hover\\3Atext-gray-300').click()
    cy.get('#email').type('newuser123@testing.com')
    cy.get('#password').type('cypresstest123')
    cy.get('.border-transparent').click()
    cy.get('form').submit()
    cy.wait(500)
    cy.get('.hover\\3A bg-gray-300').click()
    cy.wait(500)
    cy.get('.appearance-none:nth-child(5)').click()

    cy.get('.flex:nth-child(1) > button > img').click()
    cy.get('.appearance-none:nth-child(5)').click()
    cy.get('.appearance-none:nth-child(5)').type('this is fine meme ')
    cy.get('.flex-shrink-0:nth-child(8)').click()
  })
})
