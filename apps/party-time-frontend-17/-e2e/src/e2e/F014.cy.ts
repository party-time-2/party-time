import { getScreenshotPath } from '../support/utils';

const requirement = "F014";
const verifyAccount = 'Konto verifizieren';
describe(verifyAccount, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const nameAndEmailRequired = 'Benutzer müssen bei der Registrierung Name und E-Mail-Adresse angeben.';
  it(nameAndEmailRequired, () => {

    cy.screenshot(
      getScreenshotPath(requirement, verifyAccount, nameAndEmailRequired),
      {
        overwrite: true,
      }
    );
  });
});