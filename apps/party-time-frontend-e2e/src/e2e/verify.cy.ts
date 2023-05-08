import { navigateVerify, verifyToken } from '../support/app.po';

describe('party-time-verify-error-token', () => {
  it('should show token_required', () => {
    navigateVerify();
    cy.get('#token').type('a');
    cy.get('#token').clear();
    cy.contains('Bitte gib den Token aus der E-Mail ein.');
    cy.screenshot();
  });

  it('should show token_invalid', () => {
    navigateVerify();
    cy.get('#token').type('a');
    cy.contains('Bitte überprüfe den Token.');
    cy.screenshot();
  });
});

describe('party-time-verify', () => {
  it('should show verify_success', () => {
    navigateVerify();
    cy.intercept(
      {
        method: 'POST',
        url: '/api/auth/verify/' + verifyToken(),
      },
      {
        statusCode: 200,
      }
    );
    cy.get('#token').type(verifyToken());
    cy.get('.w-full > party-time-primary-button > .h-9').click();
    cy.contains('Du kannst dich nun einloggen');
    cy.contains('Zum Login');
    cy.screenshot();
  });
  it('should show verify_error', () => {
    navigateVerify();
    cy.intercept(
      {
        method: 'POST',
        url: '/api/auth/verify/' + verifyToken(),
      },

      {
        statusCode: 400,
        body: {
          status: 'BAD_REQUEST',
          timestamp: '2023-04-26T19:12:55.474193286',
          message: 'Email Verifizierung fehlgeschlagen',
        },
      }
    );
    cy.get('#token').type(verifyToken());
    cy.get('.w-full > party-time-primary-button > .h-9').click();
    cy.contains('Email Verifizierung fehlgeschlagen');
    cy.screenshot();
  });
});
