context('Home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('Sign In button is visible', () => {
    cy.findByText('Sign In').should('be.visible')
  })

  it('Page title is correct', () => {
    cy.title().should('equal', 'Carbonite')
  })

  it('Home hero exists', () => {
    cy.findByText('Welcome to Carbonite').should('exist')
    cy.findByText(/Carbonite is an online encyclopedia/).should('exist')
  })

  it('Info cards exist', () => {
    cy.findByText('Films').should('exist')
    cy.findByText('People').should('exist')
    cy.findByText('Planets').should('exist')
    cy.findByText('Species').should('exist')
    cy.findByText('Starships').should('exist')
    cy.findByText('Vehicles').should('exist')
  })
})

export {}