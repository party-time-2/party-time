import { getScreenshotPath } from '../support/utils';

const requirement = 'F001';

const createEventGroup = 'Events anlegen';
describe(createEventGroup, () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/events');
  });

  const generateEvent =
    'Veranstalter sollten in der Lage sein, ein neues Event anzulegen, indem sie ein Formular ausfüllen, in dem sie alle relevanten Informationen zum Event (Name des Events, Datum, Uhrzeit, Veranstaltungsort) angeben.';
  it(generateEvent, () => {
    cy.get('.flex-row > .mdc-fab > .mat-mdc-button-touch-target').click();
cy.get('[data-cy="event-name-input"]').type('Test Event');


    cy.screenshot(
      getScreenshotPath(requirement, createEventGroup, generateEvent),
      {
        overwrite: true,
      }
    );
  });
});
