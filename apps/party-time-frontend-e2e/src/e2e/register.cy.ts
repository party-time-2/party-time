import {
  navigateRegister,
  pw_long,
  pw_long_error,
  pw_required_error,
  pw_short,
  pw_short_error,
  pw_wrong_chars,
  pw_wrong_chars_error,
  user_long,
  user_long_error,
  user_required_error,
  user_short,
  user_short_error,
  pw_valid,
} from '../support/app.po';

describe('party-time-register-error-user', () => {
  it('should show user_too_short', () => {
    navigateRegister();
    cy.get('#username').type(user_short());
    cy.contains(user_short_error());
    cy.screenshot();
  });
  it('should show user_too_long', () => {
    navigateRegister();
    cy.get('#username').type(user_long());
    cy.contains(user_long_error());
    cy.screenshot();
  });
  it('should show user_required', () => {
    navigateRegister();
    cy.get('#username').type(user_short());
    cy.get('#username').clear();
    cy.contains(user_required_error());
    cy.screenshot();
  });
});

describe('party-time-register-error-mail', () => {
  it('should show mail_required', () => {
    navigateRegister();
    cy.get('#email').type('a');
    cy.get('#email').clear();
    cy.contains(
      'Bitte gib deine E-Mail Adresse ein damit wir verifizieren können dass du eine echte Person bist und du dein Passwort zurücksetzen kannst.'
    );
    cy.screenshot();
  });
  it('should show mail_invalid', () => {
    navigateRegister();
    cy.get('#email').type('a');
    cy.contains(
      'Bitte gib eine Valide E-Mail Adresse ein damit wir verifizieren können dass du eine echte Person bist. Es wird eine Verifizierung an diese Adresse gesendet.'
    );
    cy.screenshot();
  });
});

describe('party-time-register-error-pw', () => {
  it('should show pw_required', () => {
    navigateRegister();
    cy.get('#password').type(pw_short());
    cy.get('#password').clear();
    cy.contains(pw_required_error());
    cy.screenshot();
  });
  it('should show pw_short', () => {
    navigateRegister();
    cy.get('#password').type(pw_short());
    cy.contains(pw_short_error());
    cy.screenshot();
  });
  it('should show pw_long', () => {
    navigateRegister();
    cy.get('#password').type(pw_long());
    cy.contains(pw_long_error());
    cy.screenshot();
  });
  it('should show pw_wrong_chars', () => {
    navigateRegister();
    cy.get('#password').type(pw_wrong_chars());
    cy.contains(pw_wrong_chars_error());
  });
});

describe('party-time-register', () => {
  const dateTime = Date.now().toString();

  it('should show registration_success', () => {
    navigateRegister();
    cy.intercept(
      {
        method: 'POST',
        url: '/api/auth/register',
      },

      {
        statusCode: 200,
        body: {
          id: 37,
          name: dateTime,
          email: dateTime + '@test.de',
          emailVerified: false,
        },
        headers: {
          'access-control-allow-origin': '*',
        },
      }
    );
    cy.get('#username').type(dateTime);
    cy.get('#email').type(dateTime + '@test.de');
    cy.get('#password').type('Hallo123!nbasmdnbasd');
    cy.get('.w-full > party-time-primary-button > .h-9').click();
    cy.contains('Account erstellt');
    cy.contains(
      'Bitte bestätige deine E-Mail Adresse ' + dateTime + '@test.de'
    );
    cy.contains('Zur Verifikation');
    cy.screenshot();
  });

  it('should show mail_in_use', () => {
    navigateRegister();
    cy.intercept(
      {
        method: 'POST',
        url: '/api/auth/register',
      },

      {
        statusCode: 400,
        body: {
          status: 'BAD_REQUEST',
          timestamp: '',
          message: 'Ein Account mit dieser E-Mail existiert bereits!',
        },
        headers: {
          'access-control-allow-origin': '*',
        },
      }
    );
    cy.get('#username').type(dateTime);
    cy.get('#email').type(dateTime + '@test.de');
    cy.get('#password').type(pw_valid());
    cy.get('.w-full > party-time-primary-button > .h-9').click();

    cy.contains('Ein Account mit dieser E-Mail existiert bereits!');
    cy.screenshot();
  });
});
