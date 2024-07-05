import { getScreenshotPath } from '../support/utils';

const requirement = 'F018';
const eventDirections = 'Wegbeschreibung zum Event';
describe(eventDirections, () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.login();
    cy.visit('/events');
  });

  const understandableDirectionsTest =
    'Die Wegbeschreibung sollte klar, präzise und leicht verständlich sein.';
  it(understandableDirectionsTest, () => {
    cy.get('[data-cy="map-button"]').first().click();
    cy.screenshot(getScreenshotPath(requirement, eventDirections, '1'), {
      overwrite: true,
      capture: 'viewport',
    });
  });
});
