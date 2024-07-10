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
    cy.scrollTo('top');
    cy.screenshot(getScreenshotPath(requirement, signOutGroup, '1'), {
      overwrite: true,
      capture: 'viewport',
    });

    cy.get('[data-cy="sign-out-button"]').click();
    cy.scrollTo('top');
    cy.screenshot(getScreenshotPath(requirement, signOutGroup, '2'), {
      overwrite: true,
      capture: 'viewport',
    });
  });
});
