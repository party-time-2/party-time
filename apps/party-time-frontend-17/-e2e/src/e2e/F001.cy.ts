import { getScreenshotPath } from '../support/utils';

const requirement = 'F001';

const createEventGroup = 'Events anlegen';
describe(createEventGroup, () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.login();
    cy.visit('/events');
    cy.screenshot(
      getScreenshotPath(requirement, createEventGroup, "1"),
      {
        overwrite: true,
      }
    );
  });

  const generateEvent =
    'Veranstalter sollten in der Lage sein, ein neues Event anzulegen, indem sie ein Formular ausfüllen, in dem sie alle relevanten Informationen zum Event (Name des Events, Datum, Uhrzeit, Veranstaltungsort) angeben.';
  it(generateEvent, () => {
    cy.get('.flex-row > .mdc-fab > .mat-mdc-button-touch-target').click();
    cy.get('[data-cy="event-name-input"]').type('Fußballspiel');
    cy.get('[data-cy="address-line-input"]').type('Grünwalder Str. 2');
    cy.get('[data-cy="address-addition-input"]').type('1. Stock');
    cy.get('[data-cy="zip-input"]').type('81547');
    cy.get('[data-cy="city-input"]').type('München');
    cy.get('[data-cy="country-input"]').type('Deutschland');
    cy.screenshot(
      getScreenshotPath(requirement, createEventGroup, "2"),
      {
        overwrite: true,
      }
    );
    cy.get('[data-cy="save-button"]').click();
    cy.screenshot(
      getScreenshotPath(requirement, createEventGroup, "3"),
      {
        overwrite: true,
      }
    );
  });
});
