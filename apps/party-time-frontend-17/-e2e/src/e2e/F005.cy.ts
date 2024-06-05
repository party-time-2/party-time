import { getScreenshotPath } from '../support/utils';

const requirement = "F005";
const success_group = 'party-time-remove-participant-success';
describe(success_group, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const participant_invite_test = 'should show participant_invite';
  it(participant_invite_test, () => {

    cy.screenshot(
      getScreenshotPath(requirement, success_group, participant_invite_test),
      {
        overwrite: true,
      }
    );
  });
});


const error_group = 'party-time-add-participant-error';
describe(error_group, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const participant_not_invited_error_test = 'should show participant_not_invited_error';
  it(participant_not_invited_error_test, () => {


    cy.screenshot(
      getScreenshotPath(requirement, error_group, participant_not_invited_error_test),
      {
        overwrite: true,
      }
    );
  });

});