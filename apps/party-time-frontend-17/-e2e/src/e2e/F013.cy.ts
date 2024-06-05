import { getScreenshotPath } from '../support/utils';

const requirement = "F013";
const success_group = 'change success';
describe(success_group, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const change_test = 'should show change';
  it(change_test, () => {

    cy.screenshot(
      getScreenshotPath(requirement, success_group, change_test),
      {
        overwrite: true,
      }
    );
  });
});

const error_group = 'change error';
describe(error_group, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const change_test = 'should show change';
  it(change_test, () => {

    cy.screenshot(
      getScreenshotPath(requirement, error_group, change_test),
      {
        overwrite: true,
      }
    );
  });

  const pw_new_long_test = 'should show pw_new_long';
  it(pw_new_long_test, () => {

    cy.screenshot(
      getScreenshotPath(requirement, error_group, pw_new_long_test),
      {
        overwrite: true,
      }
    );
  });

  const pw_new_required_test = 'should show pw_new_required';
  it(pw_new_required_test, () => {

    cy.screenshot(
      getScreenshotPath(requirement, error_group, pw_new_required_test),
      {
        overwrite: true,
      }
    );
  });

  const pw_new_short_test = 'should show pw_new_short';
  it(pw_new_short_test, () => {

    cy.screenshot(
      getScreenshotPath(requirement, error_group, pw_new_short_test),
      {
        overwrite: true,
      }
    );
  });

  const pw_new_wrong_chars_test = 'should show pw_new_wrong_chars';
  it(pw_new_wrong_chars_test, () => {

    cy.screenshot(
      getScreenshotPath(requirement, error_group, pw_new_wrong_chars_test),
      {
        overwrite: true,
      }
    );
  });

  const pw_old_required_test = 'should show pw_old_required';
  it(pw_old_required_test, () => {

    cy.screenshot(
      getScreenshotPath(requirement, error_group, pw_old_required_test),
      {
        overwrite: true,
      }
    );
  });
});