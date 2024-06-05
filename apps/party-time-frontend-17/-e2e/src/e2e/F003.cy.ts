import { getScreenshotPath } from '../support/utils';

const requirement = "F003";
const success_group = 'delete-event-success';
describe(success_group, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const delete_event_test = 'should show delete-event';
  it(delete_event_test, () => {

    cy.screenshot(
      getScreenshotPath(requirement, success_group, delete_event_test),
      {
        overwrite: true,
      }
    );
  });
});


const error_group = 'delete-event-error';
describe(error_group, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const delete_event_error_test = 'should show delete-event';
  it(delete_event_error_test, () => {


    cy.screenshot(
      getScreenshotPath(requirement, error_group, delete_event_error_test),
      {
        overwrite: true,
      }
    );
  });
});