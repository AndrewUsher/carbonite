context('Home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('Page title is correct', () => {
    cy.title().should('equal', 'Carbonite')
  })

  it('Home hero exists', () => {
    cy.findByText('Welcome to Carbonite').should('exist')
    cy.findByText(/Carbonite is an online encyclopedia/).should('exist')
  })

  it('Info cards exist', () => {
    cy.findAllByText('Films').should('exist')
    cy.findAllByText('People').should('exist')
    cy.findAllByText('Planets').should('exist')
    cy.findAllByText('Species').should('exist')
    cy.findAllByText('Starships').should('exist')
    cy.findAllByText('Vehicles').should('exist')
  })
})

export {}
