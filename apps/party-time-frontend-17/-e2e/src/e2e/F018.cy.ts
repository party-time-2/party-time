import { getScreenshotPath } from '../support/utils';

const requirement = "F018";
const success_group = 'location success';
describe(success_group, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const location_success_test = 'should show location_success';
  it(location_success_test, () => {

    cy.screenshot(
      getScreenshotPath(requirement, success_group, location_success_test),
      {
        overwrite: true,
      }
    );
  });
});