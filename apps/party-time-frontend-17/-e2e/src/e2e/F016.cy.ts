import { getScreenshotPath } from '../support/utils';

const requirement = 'F016';
const eventsSummary = 'Events überblicken';
describe(eventsSummary, () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.login();
    cy.visit('/events');
  });

  const ownEventsListPageTest =
    'Die Plattform sollte eine Liste von allen eigenen Events auf einer Seite bereitstellen.';
  it(ownEventsListPageTest, () => {
    cy.screenshot(getScreenshotPath(requirement, eventsSummary, '1'), {
      overwrite: true,
      capture: 'viewport',
    });
  });

  const eventSummary =
    'Die Liste sollte die wichtigsten Informationen über das Event, wie den Namen, das Datum, die Uhrzeit und den Veranstaltungsort, enthalten.';
  it(eventSummary, () => {
    cy.screenshot(getScreenshotPath(requirement, eventsSummary, '2'), {
      overwrite: true,
      capture: 'viewport',
    });
  });
});
