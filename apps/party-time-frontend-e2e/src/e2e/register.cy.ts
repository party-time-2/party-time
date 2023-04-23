import { navigateRegister } from '../support/app.po';

describe('party-time-register-error-user', () => {
  it('should show user_too_short', () => {
    navigateRegister();
    cy.get('#name').type('a');
    cy.contains('Der Benutzername muss mindestens 5 Zeichen lang sein.');
    cy.screenshot();
  });
  it('should show user_too_long', () => {
    navigateRegister();
    cy.get('#name').type(
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    );
    cy.contains('Der Benutzername darf maximal 30 Zeichen lang sein.');
    cy.screenshot();
  });
  it('should show user_required', () => {
    navigateRegister();
    cy.get('#name').type('a');
    cy.get('#name').clear();
    cy.contains('Bitte gib einen Benutzernamen ein.');
    cy.screenshot();
  });
});

describe('party-time-register-error-mail', () => {
  it('should show mail_required', () => {
    navigateRegister();
    cy.get('#email').type('a');
    cy.get('#email').clear();
    cy.contains(
      'Bitte gib deine E-Mail Adresse ein damit wir verifzieren können dass du eine echte Person bist und du zur Not dein Passwort zurück setzen kannst.'
    );
    cy.screenshot();
  });
  it('should show mail_invalid', () => {
    navigateRegister();
    cy.get('#email').type('a');
    cy.contains(
      'Bitte gib eine Valide E-Mail Adresse ein damit wir verifzieren können dass du eine echte Person bist. Es wird eine Verfizierung an diese Adresse gesendet.'
    );
    cy.screenshot();
  });
});

describe('party-time-register-error-pw', () => {
  it('should show pw_required', () => {
    navigateRegister();
    cy.get('#password').type('a');
    cy.get('#password').clear();
    cy.contains('Bitte gib ein Passwort ein.');
    cy.screenshot();
  });
  it('should show pw_short', () => {
    navigateRegister();
    cy.get('#password').type('a');
    cy.contains('Das Passwort muss mindestens 8 Zeichen lang sein.');
    cy.screenshot();
  });
  it('should show pw_long', () => {
    navigateRegister();
    cy.get('#password').type('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    cy.contains('Das Passwort darf maximal 30 Zeichen lang sein.');
    cy.screenshot();
  });
  it('should show pw_wrong_chars', () => {
    navigateRegister();
    cy.get('#password').type('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    cy.contains('Das Passwort muss mindestens 1 Sonderzeichen');
  });
});

describe('party-time-register', () => {
  const dateTime = Date.now().toString();

  it('should show registration_success', () => {
    navigateRegister();
    cy.get('#name').type(dateTime);
    cy.get('#email').type(dateTime + '@test.de');
    cy.get('#password').type('Hallo123!nbasmdnbasd');
    cy.get('.w-full > party-time-primary-button > .h-9').click();
    cy.contains('Hey ' + dateTime + '!');
    cy.contains('Dein Account wurde erstellt');
    cy.contains(
      'Bitte bestätige deine E-Mail Adresse ' + dateTime + '@test.de'
    );
    cy.screenshot();
  });

  it('should show mail_in_use', () => {
    navigateRegister();
    cy.get('#name').type(dateTime);
    cy.get('#email').type(dateTime + '@test.de');
    cy.get('#password').type('Hallo123!nbasmdnbasd');
    cy.get('.w-full > party-time-primary-button > .h-9').click();
    cy.contains('Hey!');
    cy.contains('Dein Account konnte leider nicht erstellt werden');
    cy.contains('Status: BAD_REQUEST');
    cy.contains('Fehler:');
    cy.contains('Ein Account mit dieser Email existiert bereits!');
    cy.screenshot();
  });
});