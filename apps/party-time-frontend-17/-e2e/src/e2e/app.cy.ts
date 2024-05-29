describe('party-time-frontend-17-e2e', () => {
  beforeEach(() => cy.visit('/'));
  it('should load the page', () => {
    cy.get('h1').contains('Willkommen bei Party Time');
  });
});
