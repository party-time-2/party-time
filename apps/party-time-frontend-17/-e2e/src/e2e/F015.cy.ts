import { getScreenshotPath } from '../support/utils';

const requirement = "F015";
const deleteAccount = 'Konto löschen';
describe(deleteAccount, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const accountDeletionSuccessTest = 'Benutzer sollten in der Lage sein, ihr Konto durch Ausfüllen eines Formulars auf der Plattform zu löschen.';
  it(accountDeletionSuccessTest, () => {

    cy.screenshot(
      getScreenshotPath(requirement, deleteAccount, accountDeletionSuccessTest),
      {
        overwrite: true,
      }
    );
  });
  const accountDeletionConfirmationError = 'Das Formular sollte eine Bestätigungsoption für den Benutzer enthalten, um sicherzustellen, dass das Löschen des Kontos beabsichtigt ist.';
  it(accountDeletionConfirmationError, () => {
  
    cy.screenshot(
      getScreenshotPath(requirement, deleteAccount, accountDeletionConfirmationError),
      {
        overwrite: true,
      }
    );
  });
});
