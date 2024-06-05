import { getScreenshotPath } from '../support/utils';

const requirement = "F010";
const success_group = 'login success';
describe(success_group, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const login_test = 'should show login';
  it(login_test, () => {

    cy.screenshot(
      getScreenshotPath(requirement, success_group, login_test),
      {
        overwrite: true,
      }
    );
  });
});

const error_group = 'login error';
describe(error_group, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const login_error = 'should show login';
  it(login_error, () => {

    cy.screenshot(
      getScreenshotPath(requirement, error_group, login_error),
      {
        overwrite: true,
      }
    );
  });

  const password_required_test = 'should show password_required';
  it(password_required_test, () => {

    cy.screenshot(
      getScreenshotPath(requirement, error_group, password_required_test),
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
});
