import { getScreenshotPath } from '../support/utils';

const requirement = 'F006';
const participantsOverview = 'Teilnehmer überblicken';
describe(participantsOverview, () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.login();
    cy.visit('/events');
  });

  const showEventParticipantsTest =
    'Veranstalter sollten in der Lage sein, eine Liste aller aktuell eingeladenen Teilnehmer eines Events anzuzeigen.';
  it(showEventParticipantsTest, () => {
    cy.get('[data-cy="participants-button"]').first().click();
    cy.screenshot(getScreenshotPath(requirement, participantsOverview, '1'), {
      overwrite: true,
    });
  });
});
