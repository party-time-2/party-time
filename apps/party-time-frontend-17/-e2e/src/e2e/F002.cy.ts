import { getScreenshotPath } from '../support/utils';

const requirement = 'F002';

const editEvents = 'Events bearbeiten';
describe(editEvents, () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.login();
    cy.visit('/events');
    cy.screenshot(getScreenshotPath(requirement, editEvents, '1'), {
      overwrite: true,
      capture: 'viewport',
    });
  });

  const updateEvent =
    'Veranstalter können ein bereits erstelltes Event auswählen und die entsprechenden Informationen bearbeiten und speichern.';
  it(updateEvent, () => {
    cy.get('[data-cy="edit-button"]').first().click();
    cy.get('[data-cy="event-name-input"]').clear();
    cy.get('[data-cy="event-name-input"]').type('Fußballspiel 2');
    cy.screenshot(getScreenshotPath(requirement, editEvents, '2'), {
      overwrite: true,
      capture: 'viewport',
    });
    cy.get('[data-cy="save-button"]').click();
cy.scrollTo('top');
    cy.screenshot(getScreenshotPath(requirement, editEvents, '3'), {
      overwrite: true,
      capture: 'viewport',
    });
  });
});
