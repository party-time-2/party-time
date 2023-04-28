import { navigateLogin } from '../support/app.po';

describe('party-time-login-error', () => {
  it('should show user_required', () => {
    navigateLogin();
    cy.get('#email').type('a');
    cy.get('#email').clear();
    cy.contains('Bitte gib deine E-Mail Adresse ein.');
    cy.screenshot();
  });

  it('should show password_required', () => {
    navigateLogin();
    cy.get('#password').type('a');
    cy.get('#password').clear();
    cy.contains('Bitte gib dein Passwort ein.');
    cy.screenshot();
  });
});

describe('party-time-login', () => {
  it('should show login_error', () => {
    navigateLogin();
    cy.intercept(
      {
        method: 'POST',
        url: '/api/auth/login',
      },
      {
        statusCode: 401,
        body: {
          status: 'Login Failed',
          timestamp: '2023-04-26T19:12:55.474193286',
          message:
            'Wir konnten dich leider nicht einloggenLogin fehlgeschlagen',
        },
      }
    );

    cy.get('#email').type('abc');
    cy.get('#password').type('abc');
    cy.get('.w-full > party-time-primary-button > .h-9').click();
    cy.contains('401');
    cy.contains('Wir konnten dich leider nicht einloggen');
    cy.screenshot();
  });

  it('should show login_success', () => {
    navigateLogin();
    cy.intercept(
      {
        method: 'POST',
        url: '/api/auth/login',
      },
      {
        statusCode: 200,
        body: {
          token: 'nice token',
        },
      }
    );

    cy.get('#email').type('abc');
    cy.get('#password').type('abc');
    cy.get('.w-full > party-time-primary-button > .h-9').click();
    cy.contains('Du wurdest erfolgreich eingeloggt.');
    cy.screenshot();
  });
});
