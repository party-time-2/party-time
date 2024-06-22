import { getScreenshotPath } from '../support/utils';

const requirement = "F003";

const groupName = 'Events löschen';
describe(groupName, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const deleteEventTest = 'Event löschen';
  it(deleteEventTest, () => {

    cy.screenshot(
      getScreenshotPath(requirement, groupName, deleteEventTest),
      {
        overwrite: true,
      }
    );
  });

  const deletedEventMissingTest = 'Event nicht vorhanden';
  it(deletedEventMissingTest, () => {

    cy.screenshot(
      getScreenshotPath(requirement, groupName, deletedEventMissingTest),
      {
        overwrite: true,
      }
    );
  });
});


// const error_group = 'delete-event-error';
// describe(error_group, () => {
//   beforeEach(() => {
//     cy.visit('/');
//   });

//   const delete_event_error_test = 'should show delete-event';
//   it(delete_event_error_test, () => {


//     cy.screenshot(
//       getScreenshotPath(requirement, error_group, delete_event_error_test),
//       {
//         overwrite: true,
//       }
//     );
//   });
// });