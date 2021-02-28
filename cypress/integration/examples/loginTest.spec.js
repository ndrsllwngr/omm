describe('Cypress Demo-Login', () => {
  it('sign up scenario', () => {
    cy.visit('https://omm.vercel.app/')
    cy.get('.hover\\3Atext-gray-300').click()
    cy.get('#email').type('newuser123@testing.com')
    cy.get('#password').type('cypresstest123')
    cy.get('.border-transparent').click()
    cy.get('form').submit()
    cy.get('.hover\\3A bg-gray-300').click()
    cy.visit('https://omm.vercel.app/create')

    cy.get('.flex:nth-child(3) > button > img').click()
    cy.get('.upper-canvas').click()
    cy.get('.col-span-9').click()
    cy.get('.grid-cols-3').click()
    cy.get('.flex-shrink-0:nth-child(8)').click()
  })
})
