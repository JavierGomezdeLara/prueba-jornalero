describe('App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')

    cy.get('td').should('have.length.above', 1)
  })

  describe('WHEN the page loads initially', () => {
    it('shows the page header', () => {
      cy.get('h1').should('have.text', 'Laborer CMS')
    })

    it('shows the correct table headers', () => {
      cy.get('th').should('have.length', 4)

      cy.get('th').eq(0).contains('Name').should('exist')
      cy.get('th').eq(1).contains('Email').should('exist')
      cy.get('th').eq(2).contains('Days since hired').should('exist')
      cy.get('th').eq(3).contains('Role').should('exist')
    })

    it('shows the number of days since hired in the "Days since hired" column', () => {
      cy.get('tr').each(($row, index) => {
        if (index !== 0) {
          cy.wrap($row).find('td:nth-child(3)').invoke('text').should('match', /^\d+ days ago$/)
        }
      })
    })

  })

  describe('WHEN the user clicks on a name', () => {
    it('opens the detail view and shows the correct information', () => {
      cy.get('td').contains('Jane Smith').click()
      cy.get('img').should('exist')
      cy.contains('Jane').should('exist')
      cy.contains('Smith').should('exist')
      cy.contains('jane.smith@laborer.com').should('exist')
      cy.contains('Admin').should('exist')
      cy.contains('2023-02-20').should('exist')

      cy.contains('Back').click()

      cy.get('td').contains('Linda Wilson').click()
      cy.get('img').should('exist')
      cy.contains('Linda').should('exist')
      cy.contains('Wilson').should('exist')
      cy.contains('linda.wilson@laborer.com').should('exist')
      cy.contains('Admin').should('exist')
      cy.contains('2023-05-30').should('exist')

      cy.contains('Back').click()

      cy.get('td').contains('Emily Jones').click()
      cy.contains('User').should('exist')

      cy.contains('Back').click()

      cy.get('td').contains('Michael Brown').click()
      cy.contains('Supervisor').should('exist')
    })
  })

  describe('WHEN the user clicks on the button to go back to the table view', () => {
    it('shows the table view', () => {
      cy.get('table').should('exist')

      cy.get('td').contains('Jane Smith').click()

      cy.get('table').should('not.exist')
      cy.contains('Back').click()

      cy.get('table').should('exist')
    })
  })

  describe.skip('WHEN the user navigates between the detail and the table views', () => {
    it('should not make multiple calls for the same data', ()=>{
      cy.intercept('GET', 'http://localhost:3000/api/laborers').as('getLaborers')
      cy.intercept('GET', 'http://localhost:3000/api/laborers/5').as('getLaborer')

      cy.get('td').contains('Linda Wilson').click()
      cy.contains('Back').click()
      cy.get('td').contains('Linda Wilson').click()
      cy.contains('Back').click()
      cy.get('td').contains('Linda Wilson').click()

      cy.get('@getLaborers.all').should('have.length', 1)
      cy.get('@getLaborer.all').should('have.length', 1)
    })
  })
})
