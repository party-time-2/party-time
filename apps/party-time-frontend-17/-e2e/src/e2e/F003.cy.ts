import { getScreenshotPath } from '../support/utils';

const requirement = 'F003';

const deleteEvents = 'Events löschen';
describe(deleteEvents, () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.login();
    cy.visit('/events');
    cy.screenshot(getScreenshotPath(requirement, deleteEvents, '1'), {
      overwrite: true,
      capture: 'viewport',
    });
  });

  const deleteEvent =
    'Veranstalter können ein Event löschen, indem sie auf der Plattform auf das entsprechende Event zugreifen und die Option "Löschen" auswählen.';
  it(deleteEvent, () => {
    cy.get('[data-cy="delete-button"]').first().click();
    cy.screenshot(getScreenshotPath(requirement, deleteEvents, '2'), {
      overwrite: true,
      capture: 'viewport',
    });
  });
});
