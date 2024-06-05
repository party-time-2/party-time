import { getScreenshotPath } from '../support/utils';

const insert_group = 'worteingabe';
const error_group = 'worteingabe-error';
describe(error_group, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const show_letter_input_test = 'should show letter_input';
  it(show_letter_input_test, () => {


    cy.screenshot(
      getScreenshotPath('F001', insert_group, show_letter_input_test),
      {
        overwrite: true,
      }
    );
  });
});