import { getScreenshotPath } from '../support/utils';

const requirement = "F013";
const passwordChange = 'Passwort ändern';
describe(passwordChange, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const confirmPassword = 'Benutzer sollten in der Lage sein, ihr aktuelles Passwort einzugeben, um ihre Identität zu bestätigen.';
  it(confirmPassword, () => {

    cy.screenshot(
      getScreenshotPath(requirement, passwordChange, confirmPassword),
      {
        overwrite: true,
      }
    );
  });



  const newPassword = 'Benutzer sollten in der Lage sein, ein neues Passwort einzugeben und zu bestätigen.';
  it(newPassword, () => {

    cy.screenshot(
      getScreenshotPath(requirement, passwordChange, newPassword),
      {
        overwrite: true,
      }
    );
  });

  const newPasswordConstraints = ' Das neue Passwort muss bestimmte Anforderungen erfüllen, z. B. eine Mindestlänge und die Verwendung von Sonderzeichen.';
  it(newPasswordConstraints, () => {

    cy.screenshot(
      getScreenshotPath(requirement, passwordChange, newPasswordConstraints),
      {
        overwrite: true,
      }
    );
  });

  const passwordChangeLogout = 'Nachdem das Passwort geändert wurde, sollte der Benutzer automatisch abgemeldet werden und sich mit dem neuen Passwort erneut anmelden müssen.';
  it(passwordChangeLogout, () => {

    cy.screenshot(
      getScreenshotPath(requirement, passwordChange, passwordChangeLogout),
      {
        overwrite: true,
      }
    );
  });
});