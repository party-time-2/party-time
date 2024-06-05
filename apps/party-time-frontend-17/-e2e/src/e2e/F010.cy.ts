import { getScreenshotPath } from '../support/utils';

const requirement = "F010";
const success_group = 'register success';
describe(success_group, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const registration_test = 'should show registration';
  it(registration_test, () => {

    cy.screenshot(
      getScreenshotPath(requirement, success_group, registration_test),
      {
        overwrite: true,
      }
    );
  });
});

const error_group = 'register error';
describe(error_group, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const mail_in_use_test = 'should show mail_in_use';
  it(mail_in_use_test, () => {

    cy.screenshot(
      getScreenshotPath(requirement, error_group, mail_in_use_test),
      {
        overwrite: true,
      }
    );
  });

  const mail_invalid_test = 'should show mail_invalid';
  it(mail_invalid_test, () => {

    cy.screenshot(
      getScreenshotPath(requirement, error_group, mail_invalid_test),
      {
        overwrite: true,
      }
    );
  });

  const mail_required_test = 'should show mail_required';
  it(mail_required_test, () => {

    cy.screenshot(
      getScreenshotPath(requirement, error_group, mail_required_test),
      {
        overwrite: true,
      }
    );
  });

  const pw_long_test = 'should show pw_long';
  it(pw_long_test, () => {

    cy.screenshot(
      getScreenshotPath(requirement, error_group, pw_long_test),
      {
        overwrite: true,
      }
    );
  });

  const pw_required_test = 'should show pw_required';
  it(pw_required_test, () => {

    cy.screenshot(
      getScreenshotPath(requirement, error_group, pw_required_test),
      {
        overwrite: true,
      }
    );
  });

  const pw_short_test = 'should show pw_short';
  it(pw_short_test, () => {

    cy.screenshot(
      getScreenshotPath(requirement, error_group, pw_short_test),
      {
        overwrite: true,
      }
    );
  });

  const pw_wrong_chars_test = 'should show pw_wrong_chars';
  it(pw_wrong_chars_test, () => {

    cy.screenshot(
      getScreenshotPath(requirement, error_group, pw_wrong_chars_test),
      {
        overwrite: true,
      }
    );
  });

  const user_required_test = 'should show user_required';
  it(user_required_test, () => {

    cy.screenshot(
      getScreenshotPath(requirement, error_group, user_required_test),
      {
        overwrite: true,
      }
    );
  });

  const user_too_long_test = 'should show user_too_long';
  it(user_too_long_test, () => {

    cy.screenshot(
      getScreenshotPath(requirement, error_group, user_too_long_test),
      {
        overwrite: true,
      }
    );
  });

  const user_too_short_test = 'should show user_too_short';
  it(user_too_short_test, () => {

    cy.screenshot(
      getScreenshotPath(requirement, error_group, user_too_short_test),
      {
        overwrite: true,
      }
    );
  });
});
