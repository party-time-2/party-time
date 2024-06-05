import { getScreenshotPath } from '../support/utils';

const requirement = "F009";
const success_group = 'decline-invite success';
describe(success_group, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const invite_declined_test = 'should show invite_declined';
  it(invite_declined_test, () => {

    cy.screenshot(
      getScreenshotPath(requirement, success_group, invite_declined_test),
      {
        overwrite: true,
      }
    );
  });
});

const error_group = 'decline-invite error';
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
