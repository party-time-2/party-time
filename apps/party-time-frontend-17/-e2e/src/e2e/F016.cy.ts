import { getScreenshotPath } from '../support/utils';

const requirement = "F016";
const success_group = 'event success';
describe(success_group, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const event_test = 'should show event';
  it(event_test, () => {

    cy.screenshot(
      getScreenshotPath(requirement, success_group, event_test),
      {
        overwrite: true,
      }
    );
  });

});