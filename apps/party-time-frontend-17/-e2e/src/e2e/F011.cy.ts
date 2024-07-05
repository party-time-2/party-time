import { getScreenshotPath } from '../support/utils';

const requirement = 'F011';
const login_account_success = 'Konto anmelden';
describe(login_account_success, () => {
  beforeEach(() => {
cy.viewport(1920, 1080);

    cy.visit('/auth/login');
  });

  const loginFormTest =
    'Nutzer müssen ein Anmeldeformular ausfüllen, das ihre E-Mail-Adresse und ein Passwort erfordert.';
  it(loginFormTest, () => {
    cy.screenshot(
      getScreenshotPath(requirement, login_account_success, "1"),
      {
        overwrite: true,
        capture: 'viewport',
      }
    );

    cy.get('[data-cy="email-input"]').type('verified1@partytime.de');
    cy.get('[data-cy="password-input"]').type('Hallo123!party');
    
    cy.screenshot(
      getScreenshotPath(requirement, login_account_success, "2"),
      {
        overwrite: true,
        capture: 'viewport',
      }
    );
    cy.get('[data-cy="login-button"]').click();
 cy.screenshot(
      getScreenshotPath(requirement, login_account_success, "3"),
      {
        overwrite: true,
        capture: 'viewport',
      }
    );
  });
});
