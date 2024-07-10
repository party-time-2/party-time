import { getuid } from 'process';
import { getScreenshotPath } from '../support/utils';
import { data } from 'cypress/types/jquery';

const requirement = 'F010';
const createAccountGroup = 'Konto erstellen';
describe(createAccountGroup, () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('/account/register');
  });

  const hasRequiredFields = 'alle erforderlichen Felder ';
  it(hasRequiredFields, () => {
    cy.get('[data-cy="name-input"]').type('Max Mustermann');
    cy.get('[data-cy="email-input"]').type(
      (Math.random() + 1).toString(36).substring(7) + '@mustermann.de'
    );
    cy.get('[data-cy="password-input"]').type('Hallo123!party');
    cy.get('[data-cy="register-submit-btn"]').click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
    cy.scrollTo('top');
    cy.screenshot(getScreenshotPath(requirement, createAccountGroup, '1'), {
      overwrite: true,
      capture: 'viewport',
    });
  });
});
