import { getScreenshotPath } from '../support/utils';

const requirement = "F011";
const login_account_success = 'Konto anmelden';
describe(login_account_success, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const loginFormTest = 'Nutzer müssen ein Anmeldeformular ausfüllen, das ihre E-Mail-Adresse und ein Passwort erfordert.';
  it(loginFormTest, () => {

    cy.screenshot(
      getScreenshotPath(requirement, login_account_success, loginFormTest),
      {
        overwrite: true,
      }
    );
  });
});