import { getScreenshotPath } from '../support/utils';

const requirement = 'F015';
const deleteAccount = 'Konto löschen';
describe(deleteAccount, () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.login();
    cy.visit('/account/delete');
  });

  const accountDeletionSuccessTest =
    'Benutzer sollten in der Lage sein, ihr Konto durch Ausfüllen eines Formulars auf der Plattform zu löschen.';
  it(accountDeletionSuccessTest, () => {
    cy.get('[data-cy="password-input"]').type('Hallo123!party');
    cy.screenshot(
      getScreenshotPath(requirement, deleteAccount,  '1'),
      {
        overwrite: true,
        capture: 'viewport',
      }
    );
  });
  const accountDeletionConfirmationError =
    'Das Formular sollte eine Bestätigungsoption für den Benutzer enthalten, um sicherzustellen, dass das Löschen des Kontos beabsichtigt ist.';
  it(accountDeletionConfirmationError, () => {
    cy.get('[data-cy="password-input"]').type('Hallo123!party');
    cy.get('[data-cy="delete-account-button"]').click();
 // eslint-disable-next-line cypress/no-unnecessary-waiting
 cy.wait(300);
    cy.screenshot(
      getScreenshotPath(
        requirement,
        deleteAccount,
        '2'
      ),
      {
        overwrite: true,
        capture: 'viewport',
      }
    );
  });
});
