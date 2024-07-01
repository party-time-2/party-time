import { getScreenshotPath } from '../support/utils';

const requirement = "F018";
const eventDirections = 'Wegbeschreibung zum Event';
describe(eventDirections, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const understandableDirectionsTest = 'Die Wegbeschreibung sollte klar, präzise und leicht verständlich sein.';
  it(understandableDirectionsTest, () => {

    cy.screenshot(
      getScreenshotPath(requirement, eventDirections, understandableDirectionsTest),
      {
        overwrite: true,
      }
    );
  });
});