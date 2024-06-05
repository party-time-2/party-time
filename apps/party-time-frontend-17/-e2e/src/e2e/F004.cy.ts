import { getScreenshotPath } from '../support/utils';

const requiremnt = "F004";
const event_group = 'party-time-add-participant-success';
describe(event_group, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const participant_invite_test = 'should show participant_invite';
  it(participant_invite_test, () => {

    cy.screenshot(
      getScreenshotPath(requiremnt, event_group, participant_invite_test),
      {
        overwrite: true,
      }
    );
  });
});


const party_time_add_participant_error_group = 'party-time-add-participant-error';
describe(party_time_add_participant_error_group, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const participant_already_invited_error_test = 'should show participant_already_invited';
  it(participant_already_invited_error_test, () => {


    cy.screenshot(
      getScreenshotPath(requiremnt, party_time_add_participant_error_group, participant_already_invited_error_test),
      {
        overwrite: true,
      }
    );
  });

  const participant_email_invalid_error_test = 'should show participant_email_invalid';
  it(participant_email_invalid_error_test, () => {


    cy.screenshot(
      getScreenshotPath(requiremnt, party_time_add_participant_error_group, participant_email_invalid_error_test),
      {
        overwrite: true,
      }
    );
  });

  const participant_unknown_error_test = 'should show participant_unknown';
  it(participant_unknown_error_test, () => {


    cy.screenshot(
      getScreenshotPath(requiremnt, party_time_add_participant_error_group, participant_unknown_error_test),
      {
        overwrite: true,
      }
    );
  });
});