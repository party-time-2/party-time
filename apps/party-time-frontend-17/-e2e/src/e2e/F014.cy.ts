import { getScreenshotPath } from '../support/utils';

const requirement = "F014";
const success_group = 'verify success';
describe(success_group, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const verify_success_test = 'should show verify_success';
  it(verify_success_test, () => {

    cy.screenshot(
      getScreenshotPath(requirement, success_group, verify_success_test),
      {
        overwrite: true,
      }
    );
  });
});

const error_group = 'verify error';
describe(error_group, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const verify_error_test = 'should show verify_error';
  it(verify_error_test, () => {

    cy.screenshot(
      getScreenshotPath(requirement, error_group, verify_error_test),
      {
        overwrite: true,
      }
    );
  });


  const token_required_test = 'should show token_required';
  it(token_required_test, () => {

    cy.screenshot(
      getScreenshotPath(requirement, error_group, token_required_test),
      {
        overwrite: true,
      }
    );
  });

  const token_invalid_test = 'should show token_invalid';
  it(token_invalid_test, () => {

    cy.screenshot(
      getScreenshotPath(requirement, error_group, token_invalid_test),
      {
        overwrite: true,
      }
    );
  });
});