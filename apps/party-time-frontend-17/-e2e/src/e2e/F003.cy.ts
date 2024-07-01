import { getScreenshotPath } from '../support/utils';

const requirement = "F003";

const deleteEvents = 'Events löschen';
describe(deleteEvents, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const deleteEvent = 'Veranstalter können ein Event löschen, indem sie auf der Plattform auf das entsprechende Event zugreifen und die Option "Löschen" auswählen.';
  it(deleteEvent, () => {

    cy.screenshot(
      getScreenshotPath(requirement, deleteEvents, deleteEvent),
      {
        overwrite: true,
      }
    );
  });

  const eventDeletionTest = 'Das Event wird dann dauerhaft von der Plattform entfernt.';
  it(eventDeletionTest, () => {

    cy.screenshot(
      getScreenshotPath(requirement, deleteEvents, eventDeletionTest),
      {
        overwrite: true,
      }
    );
  });
});