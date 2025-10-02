describe('Login Test', () => {
  it('successfully logs in a user', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[type=email]').type('user@ars.com');
    cy.get('input[type=password]').type('user123');
  cy.get('[data-cy=login-btn]').click();
  cy.wait(1200); // Wait for setTimeout and redirect
  cy.url().should('include', '/flights');
  cy.contains('Available Flights');
  });
});
