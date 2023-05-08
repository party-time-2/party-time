import {
  pw_long,
  navigateChange,
  pw_long_error,
  pw_required_error,
  pw_short_error,
  pw_short,
  pw_wrong_chars_error,
  pw_valid,
} from '../support/app.po';

describe('party-time-change-error', () => {
  beforeEach(() => {
    cy.login();
    navigateChange();
  });

  it('should show pw_old_required', () => {
    cy.get('#current-password').type(pw_short());
    cy.get('#current-password').clear();
    cy.contains('Bitte gib dein aktuelles Passwort ein.');
    cy.screenshot();
    // cy.get('#new-password');
    // cy.get('party-time-primary-button > #change')
  });

  it('should show pw_new_required', () => {
    cy.get('#new-password').type(pw_short());
    cy.get('#new-password').clear();
    cy.contains(pw_required_error());
    cy.screenshot();
  });

  it('should show pw_new_short', () => {
    cy.get('#new-password').type(pw_short());
    cy.get('#new-password').clear();
    cy.get('#new-password').type(pw_short());
    cy.contains(pw_short_error());
    cy.screenshot();
  });

  it('should show pw_new_long', () => {
    cy.get('#new-password').type(pw_long());
    cy.contains(pw_long_error());
    cy.screenshot();
  });

  it('should show pw_new_wrong_chars', () => {
    cy.get('#new-password').type(pw_short());
    cy.contains(pw_wrong_chars_error());
    cy.screenshot();
  });
});

describe('party-time-change', () => {
  beforeEach(() => {
    cy.login();
    navigateChange();
  });

  it('should show change_success', () => {
    cy.intercept(
      {
        method: 'POST',
        url: '/api/auth/change',
      },
      {
        statusCode: 200,
      }
    ).as('change');
    cy.get('#current-password').type(pw_valid());
    cy.get('#new-password').type(pw_valid());
    cy.get('party-time-primary-button > #change').click();
    cy.contains('Dein Passwort wurde geändert.');
    cy.screenshot();
  });

  it('should show change_error', () => {
    cy.intercept(
      {
        method: 'POST',
        url: '/api/auth/change',
      },
      {
        statusCode: 400,
        body: {
          message:
            'Die Anfrage konnte nicht bearbeitet werden, da keine gültigen Authentifizierungsdaten für die angeforderte Ressource vorliegen!',
        },
      }
    );
    cy.get('#current-password').type(pw_valid());
    cy.get('#new-password').type(pw_valid());
    cy.get('party-time-primary-button > #change').click();
    cy.contains(
      'Die Anfrage konnte nicht bearbeitet werden, da keine gültigen Authentifizierungsdaten für die angeforderte Ressource vorliegen!'
    );
    cy.screenshot();
  });
});
