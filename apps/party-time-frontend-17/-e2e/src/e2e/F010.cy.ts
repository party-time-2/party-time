import { getScreenshotPath } from '../support/utils';

const requirement = "F010";
const createAccountGroup = 'Konto erstellen';
describe(createAccountGroup, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const hasRequiredFields = 'alle erforderlichen Felder ';
  it(hasRequiredFields, () => {

    cy.screenshot(
      getScreenshotPath(requirement, createAccountGroup, hasRequiredFields),
      {
        overwrite: true,
      }
    );
  });
});