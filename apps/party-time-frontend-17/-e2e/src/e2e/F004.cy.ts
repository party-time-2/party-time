import { getScreenshotPath } from '../support/utils';

const requirement = 'F004';

const inviteGuests = 'Gäste einladen';
describe(inviteGuests, () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.login();
    cy.visit('/events');
  });

  const inviteGuestByEmail =
    'Veranstalter sollten in der Lage sein, Gäste zu ihren Events einzuladen, indem sie deren E-Mail-Adresse in ein entsprechendes Feld eingeben.';
  it(inviteGuestByEmail, () => {
    cy.get('[data-cy="participants-button"]').first().click();
    cy.screenshot(getScreenshotPath(requirement, inviteGuests, '1'), {
      overwrite: true,
    });
    cy.get('[data-cy="email-input"]').type('verified1@partytime.de');
    cy.get('[data-cy="add-participant-button"]').click();
    cy.screenshot(getScreenshotPath(requirement, inviteGuests, '2'), {
      overwrite: true,
    });
  });

  const displayInvitationStatus =
    'Die Plattform sollte den Status der Einladung verfolgen und anzeigen, ob sie zu- oder abgesagt wurde.';
  it(displayInvitationStatus, () => {
    cy.screenshot(getScreenshotPath(requirement, inviteGuests, '3'), {
      overwrite: true,
    });
    cy.get('[data-cy="decline-button"]').each(($button) => {
      cy.wrap($button).click();
    });
    cy.screenshot(getScreenshotPath(requirement, inviteGuests, '4'), {
      overwrite: true,
    });
  });
});
