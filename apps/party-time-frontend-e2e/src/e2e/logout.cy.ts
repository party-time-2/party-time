import { navigateLogout } from '../support/app.po';

describe('party-time-logout', () => {
  beforeEach(() => {
    cy.login();
  });

  it('should show redirect_to_login', () => {
    navigateLogout();
    cy.url().should('include', '/login');
    cy.screenshot();
  });
});
