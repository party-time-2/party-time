import { getScreenshotPath } from '../support/utils';

const requirement = 'F007';
const invitationReceivedGroup = 'Einladung erhalten';
describe(invitationReceivedGroup, () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.login();
    cy.visit('/events');
  });

  const eventDetails =
    'Einladungen sollten alle relevanten Informationen zum Event enthalten.';
  it(eventDetails, () => {
cy.scrollTo('top');
    cy.screenshot(
      getScreenshotPath(requirement, invitationReceivedGroup, '1'),
      {
        overwrite: true,
        capture: 'viewport',
      }
    );
  });
//   const inviteDecline =
//     'Teilnehmer sollten in der Lage sein, Einladungen anzunehmen oder abzulehnen.';
//   it(inviteDecline, () => {
// cy.scrollTo('top');
//     cy.screenshot(
//       getScreenshotPath(requirement, invitationReceivedGroup, '2'),
//       {
//         overwrite: true,
//         capture: 'viewport',
//       }
//     );
//   });
});
