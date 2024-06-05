import { getScreenshotPath } from '../support/utils';

const requirement = "F012";
const success_group = 'change success';
describe(success_group, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const redirect_to_login_test = 'should show redirect_to_login';
  it(redirect_to_login_test, () => {

    cy.screenshot(
      getScreenshotPath(requirement, success_group, redirect_to_login_test),
      {
        overwrite: true,
      }
    );
  });
});

