import { getScreenshotPath } from '../support/utils';

const requirement = "F012";
const signOutGroup = 'Konto abmelden';
describe(signOutGroup, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const logoutLinkPresence = 'Es muss eine klare und deutliche Möglichkeit geben, um sich von einem Konto abzumelden.';
  it(logoutLinkPresence, () => {

    cy.screenshot(
      getScreenshotPath(requirement, signOutGroup, logoutLinkPresence),
      {
        overwrite: true,
      }
    );
  });

  const unavailableDataAfterLogout = ' Nachdem ein Benutzer sich abgemeldet hat, kann er auf keine persönlichen Daten zugreifen, bis er sich nicht wieder angemeldet hat.';
  it(unavailableDataAfterLogout, () => {

    cy.screenshot(
      getScreenshotPath(requirement, signOutGroup, unavailableDataAfterLogout),
      {
        overwrite: true,
      }
    );
  });
});
