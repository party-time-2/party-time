import { getScreenshotPath } from '../support/utils';

const requirement = "F002";

const editEvents = 'Events bearbeiten';
describe(editEvents, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const updateEvent = 'Veranstalter können ein bereits erstelltes Event auswählen und die entsprechenden Informationen bearbeiten und speichern.';
  it(updateEvent, () => {

    cy.screenshot(
      getScreenshotPath(requirement, editEvents, updateEvent),
      {
        overwrite: true,
      }
    );
  });
});