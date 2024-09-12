describe('compliance rules', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should open blank modal for adding contact', () => {
    // open modal for adding contact
    cy.get('[data-cy="add-modal-btn"]').click()

    // check modal header
    cy.get('#pv_id_1_header').contains('Add new contact')

    // check fields(one field) are empty
    cy.get('[data-cy="edit-modal-email-field"]').should('have.value', '')

    // check confirmation btn shows 'add' option
    cy.get('[data-cy="edit-modal-confirmation-btn"]').should('have.text', 'Add')
  })

  it('should open edit modal with a contact', () => {
    // open modal for editing Jane Doe contact
    cy.get('[data-cy="edit-contact-btn-2"]').click()

    // check modal header
    cy.get('#pv_id_1_header').contains('Jane Doe')

    // check e-mail input field content
    cy.get('[data-cy="edit-modal-email-field"]').should('have.value', 'jane.doe@example.com')

    // check confirmation btn shows 'edit' option
    cy.get('[data-cy="edit-modal-confirmation-btn"]').should('have.text', 'Edit')
  })

  it('should send a request with empty form fields', () => {
    // open modal for editing Jane Doe contact
    cy.get('[data-cy="edit-contact-btn-2"]').click()

    // clear value of email field
    cy.get('[data-cy="edit-modal-email-field"]').clear()

    // confirm
    cy.get('[data-cy="edit-modal-confirmation-btn"]').click()

    // check error toast
    cy.contains('All the fields must be filled')
  })

  it('should send an edit req correctly', () => {
    // intercept successful post call
    cy.intercept('PUT', '/contact_list/2', (req) => {
      return req.reply({
        status: 200,
        body: { message: 'Contact successfully edited' }
      })
    })

    // open modal for editing Jane Doe contact
    cy.get('[data-cy="edit-contact-btn-2"]').click()

    // clear value of email field
    cy.get('[data-cy="edit-modal-email-field"]').type('something')

    // confirm
    cy.get('[data-cy="edit-modal-confirmation-btn"]').click()

    // check error toast
    cy.contains('Contact successfully edited')
  })
})
