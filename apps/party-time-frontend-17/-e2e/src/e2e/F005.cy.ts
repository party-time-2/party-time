import { getScreenshotPath } from '../support/utils';

const requirement = "F005";
const uninviteGuest = 'Gäste ausladen';
describe(uninviteGuest, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const uninviteGuestTest = 'Veranstalter können einzelne Gäste ausladen.';
  it(uninviteGuestTest, () => {

    cy.screenshot(
      getScreenshotPath(requirement, uninviteGuest, uninviteGuestTest),
      {
        overwrite: true,
      }
    );
  });
});