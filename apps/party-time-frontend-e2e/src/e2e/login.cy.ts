import {
  navigateLogin,
  user_mail_required,
  user_pw_required,
  pw_valid,
  short_string,
  user_email,
} from '../support/app.po';

describe('party-time-login-error', () => {
  it('should show user_required', () => {
    navigateLogin();
    cy.get('#email').type(short_string());
    cy.get('#email').clear();
    cy.contains(user_mail_required());
    cy.screenshot();
  });

  it('should show password_required', () => {
    navigateLogin();
    cy.get('#password').type(short_string());
    cy.get('#password').clear();
    cy.contains(user_pw_required());
    cy.screenshot();
  });
});

describe('party-time-login', () => {
  it('should show login_error', () => {
    navigateLogin();
    cy.fixture('login.json').then((data) => {
      console.log(data);
      cy.intercept(
        {
          method: 'POST',
          url: '/api/auth/login',
        },
        data
      );
    });

    cy.get('#email').type(user_email());
    cy.get('#password').type('abc');
    cy.get('party-time-primary-button > #Login').click();
    cy.contains('Wir konnten dich leider nicht einloggen.');
    cy.screenshot();
  });

  it('should show login_success', () => {
    navigateLogin();
    cy.fixture('login.json').then((data) => {
      cy.intercept(
        {
          method: 'POST',
          url: '/api/auth/login',
        },
        {
          data,
        }
      );
    });

    cy.get('#email').type(user_email());
    cy.get('#password').type(pw_valid());
    cy.get('party-time-primary-button > #Login').click();
    cy.contains('Du wurdest erfolgreich eingeloggt.');
    cy.screenshot();
  });
});
