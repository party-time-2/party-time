import { getScreenshotPath } from '../support/utils';

const requiremnt = "F003";
const event_group = 'delete-event-success';
describe(event_group, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const delete_event_success_test = 'should show delete-event-success';
  it(delete_event_success_test, () => {

    cy.screenshot(
      getScreenshotPath(requiremnt, event_group, delete_event_success_test),
      {
        overwrite: true,
      }
    );
  });
});


const change_event_error_group = 'delete-event-error';
describe(change_event_error_group, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const delete_event_error_test = 'should show delete-event-error';
  it(delete_event_error_test, () => {


    cy.screenshot(
      getScreenshotPath(requiremnt, change_event_error_group, delete_event_error_test),
      {
        overwrite: true,
      }
    );
  });
});