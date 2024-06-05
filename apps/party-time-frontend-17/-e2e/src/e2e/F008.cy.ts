import { getScreenshotPath } from '../support/utils';

const requirement = "F008";
const success_group = 'accept-invite success';
describe(success_group, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const invite_accepted_test = 'should show invite_accepted';
  it(invite_accepted_test, () => {

    cy.screenshot(
      getScreenshotPath(requirement, success_group, invite_accepted_test),
      {
        overwrite: true,
      }
    );
  });
});

const error_group = 'accept-invite error';
describe(error_group, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const event_not_found_test = 'should show event_not_found';
  it(event_not_found_test, () => {

    cy.screenshot(
      getScreenshotPath(requirement, error_group, event_not_found_test),
      {
        overwrite: true,
      }
    );
  });

  const participant_not_invited_test = 'should show participant_not_invited';
  it(participant_not_invited_test, () => {

    cy.screenshot(
      getScreenshotPath(requirement, error_group, participant_not_invited_test),
      {
        overwrite: true,
      }
    );
  });
});
