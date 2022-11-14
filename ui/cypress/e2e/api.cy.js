describe('api tests', () => {

  it('handles failed API request', () => {
    cy.intercept(
      {
        method: 'GET',
        url: 'http://localhost:3001/api/hatesymbols'
      },{
        statusCode: 404,
        body: {
          message: 'Whoopsie! Hate-abase not found!'
        }
      }).as('failed-api-request') // stub fetch request  
    cy.visit('http://localhost:3000') // visit local host
    cy.wait('@failed-api-request')
    cy.get('h2').should('be.visible').contains('ERROR');
  })
})