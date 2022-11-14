describe('ui tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000') // visit local host
  })

  it('should display', () => {
    cy.get('h1').should('be.visible').contains('FASH CARDS') // verify header title present
    cy.get('.logo').should('be.visible').contains('🤬') // verify logo on home page
  })

  it('should have an About page', () => {
    cy.get('[href="/about"] > button').click() // click about
    cy.get('h2').should('be.visible').contains('About') // see 'About' on page
  })

  it('should be able to get instructions for a new game', () => {
    cy.get('[href="/start"] > button').click() // click Start
    cy.get('.App > section.column > :nth-child(1)').should('be.visible').contains('You have 1 minute to guess as many hate-symbols as you can.') // can see instructions containing correct text
  })
  
  it('should be able to start a game', () => {
    cy.get('[href="/start"] > button').click() // click 'Start'
    cy.get('[href="/game"] > button').click() // click 'Play'
    cy.get('.countdown > span').should('be.visible') // can see timer
    cy.get('.focus > .card-section > .card-container > .card > .front > .card-image-container').should('be.visible') // can see card
    cy.get('.focus > .card-section > :nth-child(2) > .card-answers').should('be.visible').children().should('have.length', 4) // have 4 response buttons
  })

  
  it('can flip a card to view more information', () => {
    cy.get('[href="/start"] > button').click() // click 'Start'
    cy.get('[href="/game"] > button').click() // click 'Play'
    cy.get('.focus > .card-section > .card-container').find('img') // verify image present
    cy.get('.focus > .card-section > :nth-child(2) > .card-options > :nth-child(2)').click() // click flip icon
    cy.get('.focus > .card-section > .card-container').find('p') // verify text present
  })
  
  it('can save cards to view later', () => {
    cy.get('[href="/start"] > button').click() // click 'Start'
    cy.get('[href="/game"] > button').click() // click 'Play'
    cy.get('.focus > .card-section > :nth-child(2) > .card-options > :nth-child(1)').click() // click the Save Icon
    cy.get('[href="/home"] > button').click() // click 'Home'
    cy.get('[href="/saved"] > button').click() //click 'Saved Cards'
    cy.get('.card-carousel > :nth-child(2)').should('be.visible').children().should('have.length', 1)
  })

  it('can navigate home at any time', () => {
    cy.get('[href="/about"] > button').click() // click about
    cy.get('[href="/home"] > button').click() // click 'Home'
    cy.get('.logo').should('be.visible').contains('🤬') // verify Home page

    cy.get('[href="/start"] > button').click() // click 'Start'
    cy.get('[href="/home"] > button').click() // click 'Home'
    cy.get('.logo').should('be.visible').contains('🤬') // verify Home page

    cy.get('[href="/start"] > button').click() // click 'Start'
    cy.get('[href="/game"] > button').click() // click 'Play'
    cy.get('[href="/home"] > button').click() // click 'Home'
    cy.get('.logo').should('be.visible').contains('🤬') // verify Home page

    cy.get('[href="/start"] > button').click() // click 'Start'
    cy.get('[href="/game"] > button').click() // click 'Play'
    cy.wait(60500) // wait 60.5 seconds for game to end
    cy.get('[href="/home"] > button').click() // click 'Home'
    cy.get('.logo').should('be.visible').contains('🤬') // verify Home page
  })

  it('should be able to click answer buttons, game-over after one minute and present you with your score', () => {
    cy.get('[href="/start"] > button').click() // click 'Start'
    cy.get('[href="/game"] > button').click() // click 'Play'
    Cypress._.times(50, () => {
      cy.get('#root > section > section > div > div > article.card-section.column.focus > section > div:nth-child(2) > div.card-answers.column > button:nth-child(1)').click()   
      cy.wait(500)
    }) // click top answer and then NEXT button 25 times each
    cy.wait(30000) // wait 30 sec
    cy.get('#root > section > section > p:nth-child(2)').should('be.visible').contains('%') // verify game over screen text includes a percentage
  })

  it('should present a link to the ADL on the Game Over screen', () => {
    cy.get('[href="/start"] > button').click() // click 'Start'
    cy.get('[href="/game"] > button').click() // click 'Play'
    cy.wait(60500) // wait 60.5 seconds for game to end
    cy.get('#root > section > nav > div > a:nth-child(2)').should('have.attr', 'href', 'https://www.adl.org').children().should('have.text', 'Learn more about ADL') // verify button contains text and link
  });

})