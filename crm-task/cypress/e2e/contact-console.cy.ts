describe('compliance rules', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('toggles filtered contacts correctly', () => {
    // check that the text of each Tag component is not 'interested'
    cy.get('[data-cy^="status-badge-"]').each(($tag) => {
      cy.wrap($tag).should('not.contain.text', 'interested')
    })

    // hit the 'interested filter btn'
    // maybe a cy.intercept with a fixture would be recommended here but, being a get call
    // and for time constrains, I guess it can stay so :)
    cy.get('[data-cy="filter-btn-interested"]').click()

    // check that the btn is now not outlined
    cy.get('[data-cy="filter-btn-interested"]').should('not.have.class', 'p-button-outlined')

    // check 'interested' contacts being toggled
    cy.get('[data-cy^="status-badge-"]')
      .filter(':contains("interested")')
      .should('have.length.greaterThan', 0)
  })

  it('switches language correctly', () => {
    // check locale is english
    cy.get('[data-cy="filters-header"]').should('have.text', 'Toggle contact status')
    cy.get(
      '[data-p-sortable-column="false"] > .p-datatable-column-header-content > .p-datatable-column-title'
    ).should('have.text', 'Phone')

    // hit language btn
    cy.get('[data-cy="lang-toggle-btn"]').click()

    // check locale switched to german
    cy.get('[data-cy="filters-header"]').should('have.text', 'Kontaktstatus umschalten')
    cy.get(
      '[data-p-sortable-column="false"] > .p-datatable-column-header-content > .p-datatable-column-title'
    ).should('have.text', 'Telefon')
  })
})
