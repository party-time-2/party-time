import { getScreenshotPath } from '../support/utils';

const requirement = 'F008';
const eventAcceptanceGroup = 'Zusage zum Event geben';
describe(eventAcceptanceGroup, () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.login();
    cy.visit('/events');
  });

  const acceptInvitation =
    'Teilnehmer sollten in der Lage sein, ihre Zusage zum Event auf der Plattform zu geben, indem sie auf eine Schaltfläche klicken.';
  it(acceptInvitation, () => {
    cy.screenshot(getScreenshotPath(requirement, eventAcceptanceGroup, '1'), {
      overwrite: true,
      capture: 'viewport',
    });
    cy.get('[data-cy="participate-button"]').first().click();
    cy.screenshot(getScreenshotPath(requirement, eventAcceptanceGroup, '1'), {
      overwrite: true,
      capture: 'viewport',
    });
  });
});
