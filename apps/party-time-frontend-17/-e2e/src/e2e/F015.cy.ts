import { getScreenshotPath } from '../support/utils';

const requirement = "F015";
const success_group = 'delete success';
describe(success_group, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const delete_success_test = 'should show delete_success';
  it(delete_success_test, () => {

    cy.screenshot(
      getScreenshotPath(requirement, success_group, delete_success_test),
      {
        overwrite: true,
      }
    );
  });
});

const error_group = 'delete error';
describe(error_group, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const delete_error_test = 'should show delete_error';
  it(delete_error_test, () => {

    cy.screenshot(
      getScreenshotPath(requirement, error_group, delete_error_test),
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

});