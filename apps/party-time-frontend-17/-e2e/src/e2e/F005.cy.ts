import { getScreenshotPath } from '../support/utils';

const requirement = 'F005';
const uninviteGuest = 'Gäste ausladen';
describe(uninviteGuest, () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.login();
    cy.visit('/events');
  });

  const uninviteGuestTest = 'Veranstalter können einzelne Gäste ausladen.';
  it(uninviteGuestTest, () => {
    cy.get('[data-cy="participants-button"]').first().click();
    cy.screenshot(
      getScreenshotPath(requirement, uninviteGuest, "1"),
      {
        overwrite: true,
        capture: 'viewport',
      }
    );
    cy.get('[data-cy="uninvite-button"]').first().click();
    cy.screenshot(
      getScreenshotPath(requirement, uninviteGuest, '2'),
      {
        overwrite: true,
        capture: 'viewport',
      }
    );
  });
});
