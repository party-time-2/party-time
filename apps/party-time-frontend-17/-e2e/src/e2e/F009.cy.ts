import { getScreenshotPath } from '../support/utils';

const requirement = 'F009';
const eventCancelation = 'Absage zum Event geben';
describe(eventCancelation, () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.login();
    cy.visit('/events');
  });

  const declineInvitation =
    'Teilnehmer sollten in der Lage sein, ihre Absage zum Event auf der Plattform zu geben, indem sie auf eine Schaltfläche klicken.';
  it(declineInvitation, () => {
    cy.get('[data-cy="decline-button"]').first().click();
    cy.scrollTo('top');
    cy.screenshot(getScreenshotPath(requirement, eventCancelation, '1'), {
      overwrite: true,
      capture: 'viewport',
    });
  });
});
