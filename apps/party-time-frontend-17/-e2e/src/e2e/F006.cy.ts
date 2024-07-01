import { getScreenshotPath } from '../support/utils';

const requirement = "F006";
const participantsOverview = 'Teilnehmer überblicken';
describe(participantsOverview, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const showEventParticipantsTest = 'Veranstalter sollten in der Lage sein, eine Liste aller aktuell eingeladenen Teilnehmer eines Events anzuzeigen.';
  it(showEventParticipantsTest, () => {

    cy.screenshot(
      getScreenshotPath(requirement, participantsOverview, showEventParticipantsTest),
      {
        overwrite: true,
      }
    );
  });
});
