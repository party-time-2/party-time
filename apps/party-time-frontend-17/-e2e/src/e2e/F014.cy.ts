import { curry } from 'cypress/types/lodash';
import { getScreenshotPath } from '../support/utils';

const requirement = 'F014';
const verifyAccount = 'Konto verifizieren';
describe(verifyAccount, () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('/auth/verify');
  });

  const nameAndEmailRequired =
    'Benutzer müssen nach der Registrierung ihre E-Mail-Adresse verifizieren.';
  it(nameAndEmailRequired, () => {
    cy.get('[data-cy="token-input"]').type(
      '4edc2ee0-260b-43d2-877a-e2016c14d164'
    );
    cy.screenshot(getScreenshotPath(requirement, verifyAccount, '1'), {
      overwrite: true,
      capture: 'viewport',
    });
    cy.get('[data-cy="verify-button"]').click();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait();
    cy.screenshot(getScreenshotPath(requirement, verifyAccount, '2'), {
      overwrite: true,
      capture: 'viewport',
    });
  });
});
