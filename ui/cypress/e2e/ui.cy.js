describe('empty spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000') // visit local host
  })

  it('should display', () => {
    cy.get('h1').should('be.visible').contains('FASH CARDS') // verify header title present
    cy.get('.logo').should('be.visible').contains('🤬') // verify logo on home page
  })

  it('should have an About page', () => {
    cy.get('nav.column > :nth-child(1)').click() // click about
    cy.get('h2').should('be.visible').contains('About') // see 'About' on page
  })

  it('should be able to get instructions for a new game', () => {
    cy.get('nav.column > :nth-child(2)').click() // click Start
    cy.get('.App > section.column > :nth-child(1)').should('be.visible').contains('You have 1 minute to guess as many hate-symbols as you can.') // can see instructions containing correct text
  })
  
  it('should be able to start a game', () => {
    cy.get('nav.column > :nth-child(2)').click() // click 'Start'
    cy.get('nav.column > :nth-child(1)').click() // click 'Play'
    cy.get('.countdown > span').should('be.visible') // can see timer
    cy.get('.focus > .card-section > .card-container > .card > .front > .card-image-container').should('be.visible') // can see card
    cy.get('.focus > .card-section > :nth-child(2) > .card-answers').should('be.visible').children().should('have.length', 4) // have 4 response buttons
  })

  
  it('can flip a card to view more information', () => {
    cy.get('nav.column > :nth-child(2)').click() // click 'Start'
    cy.get('nav.column > :nth-child(1)').click() // click 'Play'
    cy.get('.focus > .card-section > .card-container').find('img') // verify image present
    cy.get('.focus > .card-section > :nth-child(2) > .card-options > :nth-child(2)').click() // click flip icon
    cy.get('.focus > .card-section > .card-container').find('p') // verify text present
  })

  it('can click answer buttons', () => {
    
  });
  
  it('can save cards to view later', () => {
    cy.get('nav.column > :nth-child(2)').click() // click 'Start'
    cy.get('nav.column > :nth-child(1)').click() // click 'Play'
    cy.get('.focus > .card-section > :nth-child(2) > .card-options > :nth-child(1)').click() // click the Save Icon
    cy.get('nav.column > button').click() // click 'Home'
    cy.get('nav.column > :nth-child(3)').click() //click 'Saved Cards'
    cy.get('.card-carousel > :nth-child(2)').should('be.visible').children().should('have.length', 1)
  })

  it.skip('can navigate home at any time', () => {
    cy.get('nav.column > :nth-child(1)').click() // click about
    cy.get('button').click() // click 'Home'
    cy.get('.logo').should('be.visible').contains('🤬') // verify Home page

    cy.get('nav.column > :nth-child(2)').click() // click 'Start'
    cy.get('nav.column > :nth-child(2)').click() // click 'Home'
    cy.get('.logo').should('be.visible').contains('🤬') // verify Home page

    cy.get('nav.column > :nth-child(2)').click() // click 'Start'
    cy.get('nav.column > :nth-child(1)').click() // click 'Play'
    cy.get('nav.column > button').click() // click 'Home'
    cy.get('.logo').should('be.visible').contains('🤬') // verify Home page

    cy.get('nav.column > :nth-child(2)').click() // click 'Start'
    cy.get('nav.column > :nth-child(1)').click() // click 'Play'
    cy.wait(60500) // wait 60.5 seconds for game to end
    cy.get('nav.column > :nth-child(1)').click() // click 'Home'
    cy.get('.logo').should('be.visible').contains('🤬') // verify Home page
  })

  it('should game-over after one minute and present you with your score', () => {
    cy.get('nav.column > :nth-child(2)').click() // click 'Start'
    cy.get('nav.column > :nth-child(1)').click() // click 'Play'
    Cypress._.times(50, (i) => {
      cy.get('#root > section > section > div > div > article.card-section.column.focus > section > div:nth-child(2) > div.card-answers.column > button:nth-child(1)').click()   
      cy.wait(500)
    })    
    cy.wait(30000)
    cy.get('.carousel-item > .column > :nth-child(2)').should('be.visible').contains('%')
  });

})