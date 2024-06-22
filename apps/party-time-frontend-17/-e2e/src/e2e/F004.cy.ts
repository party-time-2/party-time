import { getScreenshotPath } from '../support/utils';

const requirement = "F004";

const inviteGuests = 'Gäste einladen';
describe(inviteGuests, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const inviteGuestByEmail = 'Gast mit Email einladen';
  it(inviteGuestByEmail, () => {

    cy.screenshot(
      getScreenshotPath(requirement, inviteGuests, inviteGuestByEmail),
      {
        overwrite: true,
      }
    );
  });

  const displayInvitationStatus = 'Status der Einladung anzeigen';
  it(displayInvitationStatus, () => {

    cy.screenshot(
      getScreenshotPath(requirement, inviteGuests, displayInvitationStatus),
      {
        overwrite: true,
      }
    );
  });
});


// const error_group = 'party-time-add-participant-error';
// describe(error_group, () => {
//   beforeEach(() => {
//     cy.visit('/');
//   });

//   const participant_already_invited_error_test = 'should show participant_already_invited';
//   it(participant_already_invited_error_test, () => {


//     cy.screenshot(
//       getScreenshotPath(requirement, error_group, participant_already_invited_error_test),
//       {
//         overwrite: true,
//       }
//     );
//   });

//   const participant_email_invalid_error_test = 'should show participant_email_invalid';
//   it(participant_email_invalid_error_test, () => {


//     cy.screenshot(
//       getScreenshotPath(requirement, error_group, participant_email_invalid_error_test),
//       {
//         overwrite: true,
//       }
//     );
//   });

//   const participant_unknown_error_test = 'should show participant_unknown';
//   it(participant_unknown_error_test, () => {


//     cy.screenshot(
//       getScreenshotPath(requirement, error_group, participant_unknown_error_test),
//       {
//         overwrite: true,
//       }
//     );
//   });
// });