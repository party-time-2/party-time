import { getScreenshotPath } from '../support/utils';

const requirement = 'F013';
const passwordChange = 'Passwort ändern';
describe(passwordChange, () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.login();
    cy.visit('/account/change-password');
  });

  const confirmPassword =
    'Benutzer sollten in der Lage sein, ihr aktuelles Passwort einzugeben, um ihre Identität zu bestätigen.';
  it(confirmPassword, () => {
    cy.get('[data-cy="old-password-input"]').type('Hallo123!party');
    cy.screenshot(getScreenshotPath(requirement, passwordChange, '1'), {
      overwrite: true,
      capture: 'viewport',
    });
  });

  const newPasswordConstraints =
    ' Das neue Passwort muss bestimmte Anforderungen erfüllen, z. B. eine Mindestlänge und die Verwendung von Sonderzeichen.';
  it(newPasswordConstraints, () => {
    cy.get('[data-cy="new-password-input"]').type('prty');
    cy.get('[data-cy="old-password-input"]').focus();

    cy.screenshot(getScreenshotPath(requirement, passwordChange, '2'), {
      overwrite: true,
      capture: 'viewport',
    });
  });
  const newPassword =
    'Benutzer sollten in der Lage sein, ein neues Passwort einzugeben und zu bestätigen.';
  it(newPassword, () => {
    cy.get('[data-cy="new-password-input"]').type('Hallo123!party');
    cy.screenshot(getScreenshotPath(requirement, passwordChange, '3'), {
      overwrite: true,
      capture: 'viewport',
    });
  });

  const passwordChangeLogout =
    'Nachdem das Passwort geändert wurde, sollte der Benutzer automatisch abgemeldet werden und sich mit dem neuen Passwort erneut anmelden müssen.';
  it(passwordChangeLogout, () => {
    cy.get('[data-cy="old-password-input"]').type('Hallo123!party');
    cy.get('[data-cy="new-password-input"]').type('Hallo123!party');
    cy.screenshot(getScreenshotPath(requirement, passwordChange, '4'), {
      overwrite: true,
      capture: 'viewport',
    });
    cy.get('[data-cy="submit-button"]').click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.screenshot(getScreenshotPath(requirement, passwordChange, '5'), {
      overwrite: true,
      capture: 'viewport',
    });
  });
});
