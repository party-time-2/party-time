import { getScreenshotPath } from '../support/utils';

const requirement = "F007";
const invitationReceivedGroup = 'Einladung erhalten';
describe(invitationReceivedGroup, () => {
  beforeEach(() => {
    cy.visit('/');
  });

   const eventDetails  = 'Einladungen sollten alle relevanten Informationen zum Event enthalten.';
  it(eventDetails, () => {

    cy.screenshot(
      getScreenshotPath(requirement, invitationReceivedGroup, eventDetails),
      {
        overwrite: true,
      }
    );
  });
const inviteDecline = 'Teilnehmer sollten in der Lage sein, Einladungen anzunehmen oder abzulehnen.';
  it(inviteDecline, () => {

    cy.screenshot(
      getScreenshotPath(requirement, invitationReceivedGroup, inviteDecline),
      {
        overwrite: true,
      }
    );
  });
});
