import { data } from 'cypress/types/jquery';
import { getScreenshotPath } from '../support/utils';

const requirement = 'F012';
const signOutGroup = 'Konto abmelden';
describe(signOutGroup, () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    
    
  });
  
  const logoutLinkPresence =
  'Es muss eine klare und deutliche Möglichkeit geben, um sich von einem Konto abzumelden.';
  it(logoutLinkPresence, () => {
    cy.login();
    cy.visit('/');

    cy.get('[data-cy="user-menu"]').click();

    cy.screenshot(
      getScreenshotPath(requirement, signOutGroup, "1"),
      {
        overwrite: true,
        capture: 'viewport',
      }
    );

    cy.get('[data-cy="sign-out-button"]').click();

    cy.screenshot(
      getScreenshotPath(requirement, signOutGroup, "2"),
      {
        overwrite: true,
        capture: 'viewport',
      }
    );
  });

  const unavailableDataAfterLogout =
    ' Nachdem ein Benutzer sich abgemeldet hat, kann er auf keine persönlichen Daten zugreifen, bis er sich nicht wieder angemeldet hat.';
  it(unavailableDataAfterLogout, () => {

    cy.visit('/');
    cy.screenshot(
      getScreenshotPath(requirement, signOutGroup, "3"),
      {
        overwrite: true,
        capture: 'viewport',
      }
    );
    cy.get('[data-cy="create-event-button"]').click();
    cy.screenshot(
      getScreenshotPath(requirement, signOutGroup, "4"),
      {
        overwrite: true,
        capture: 'viewport',
      }
    );
  });
});
