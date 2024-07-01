import { getScreenshotPath } from '../support/utils';

const requirement = "F009";
const eventCancelation = 'Absage zum Event geben';
describe(eventCancelation, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const declineInvitation = 'Teilnehmer sollten in der Lage sein, ihre Absage zum Event auf der Plattform zu geben, indem sie auf eine Schaltfläche klicken.';
  it(declineInvitation, () => {

    cy.screenshot(
      getScreenshotPath(requirement, eventCancelation, declineInvitation),
      {
        overwrite: true,
      }
    );
  });
});
