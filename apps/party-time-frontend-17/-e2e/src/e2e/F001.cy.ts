import { getScreenshotPath } from '../support/utils';

const requirement = "F001";

const createEventGroup = 'Events anlegen';
describe(createEventGroup, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const generateEvent = 'Veranstalter sollten in der Lage sein, ein neues Event anzulegen, indem sie ein Formular ausfüllen, in dem sie alle relevanten Informationen zum Event (Name des Events, Datum, Uhrzeit, Veranstaltungsort) angeben.';
  it(generateEvent, () => {

    cy.screenshot(
      getScreenshotPath(requirement, createEventGroup, generateEvent),
      {
        overwrite: true,
      }
    );
  });
});