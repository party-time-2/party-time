import { getScreenshotPath } from '../support/utils';

const requirement = "F007";
const success_group = 'party-time-access-event-success';
describe(success_group, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const view_participants_test = 'should show view_participants';
  it(view_participants_test, () => {

    cy.screenshot(
      getScreenshotPath(requirement, success_group, view_participants_test),
      {
        overwrite: true,
      }
    );
  });
});
