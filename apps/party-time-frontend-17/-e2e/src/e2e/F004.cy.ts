import { getScreenshotPath } from '../support/utils';

const requirement = "F004";

const inviteGuests = 'Gäste einladen';
describe(inviteGuests, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const inviteGuestByEmail = 'Veranstalter sollten in der Lage sein, Gäste zu ihren Events einzuladen, indem sie deren E-Mail-Adresse in ein entsprechendes Feld eingeben.';
  it(inviteGuestByEmail, () => {

    cy.screenshot(
      getScreenshotPath(requirement, inviteGuests, inviteGuestByEmail),
      {
        overwrite: true,
      }
    );
  });

  const displayInvitationStatus = ' Die Plattform sollte den Status der Einladung verfolgen und anzeigen, ob sie zu- oder abgesagt wurde.';
  it(displayInvitationStatus, () => {

    cy.screenshot(
      getScreenshotPath(requirement, inviteGuests, displayInvitationStatus),
      {
        overwrite: true,
      }
    );
  });
});