import { getScreenshotPath } from '../support/utils';

const requiremnt = "F001";

const event_group = 'create-event';
describe(event_group, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const create_success_test = 'should show create_success';
  it(create_success_test, () => {

    cy.screenshot(
      getScreenshotPath(requiremnt, event_group, create_success_test),
      {
        overwrite: true,
      }
    );
  });
});


const event_error_group = 'create-event-error';
describe(event_error_group, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const party_addressLineAddition_long_test = 'should show party_addressLineAddition_long';
  it(party_addressLineAddition_long_test, () => {


    cy.screenshot(
      getScreenshotPath(requiremnt, event_error_group, party_addressLineAddition_long_test),
      {
        overwrite: true,
      }
    );
  });

  const party_address_long_test = 'should show party_address_long';
  it(party_address_long_test, () => {


    cy.screenshot(
      getScreenshotPath(requiremnt, event_error_group, party_address_long_test),
      {
        overwrite: true,
      }
    );
  });

  const party_address_required_test = 'should show party_address_required';
  it(party_address_required_test, () => {


    cy.screenshot(
      getScreenshotPath(requiremnt, event_error_group, party_address_required_test),
      {
        overwrite: true,
      }
    );
  });

  const party_address_short_test = 'should show party_address_short';
  it(party_address_short_test, () => {


    cy.screenshot(
      getScreenshotPath(requiremnt, event_error_group, party_address_short_test),
      {
        overwrite: true,
      }
    );
  });

  const party_city_long_test = 'should show party_city_long';
  it(party_city_long_test, () => {


    cy.screenshot(
      getScreenshotPath(requiremnt, event_error_group, party_city_long_test),
      {
        overwrite: true,
      }
    );
  });

  const party_city_required_test = 'should show party_city_required';
  it(party_city_required_test, () => {


    cy.screenshot(
      getScreenshotPath(requiremnt, event_error_group, party_city_required_test),
      {
        overwrite: true,
      }
    );
  });

  const party_city_short_test = 'should show party_city_short';
  it(party_city_short_test, () => {


    cy.screenshot(
      getScreenshotPath(requiremnt, event_error_group, party_city_short_test),
      {
        overwrite: true,
      }
    );
  });

  const party_country_long_test = 'should show party_country_long';
  it(party_country_long_test, () => {


    cy.screenshot(
      getScreenshotPath(requiremnt, event_error_group, party_country_long_test),
      {
        overwrite: true,
      }
    );
  });

  const party_country_required_test = 'should show party_country_required';
  it(party_country_required_test, () => {


    cy.screenshot(
      getScreenshotPath(requiremnt, event_error_group, party_country_required_test),
      {
        overwrite: true,
      }
    );
  });

  const party_country_short_test = 'should show show party_country_short';
  it(party_country_short_test, () => {


    cy.screenshot(
      getScreenshotPath(requiremnt, event_error_group, party_country_short_test),
      {
        overwrite: true,
      }
    );
  });

  const party_create_error_test = 'should show party_create_error';
  it(party_create_error_test, () => {


    cy.screenshot(
      getScreenshotPath(requiremnt, event_error_group, party_create_error_test),
      {
        overwrite: true,
      }
    );
  });

  const party_name_long_test = 'should show party_name_long';
  it(party_name_long_test, () => {


    cy.screenshot(
      getScreenshotPath(requiremnt, event_error_group, party_name_long_test),
      {
        overwrite: true,
      }
    );
  });

  const party_name_required_test = 'should show party_name_required';
  it(party_name_required_test, () => {


    cy.screenshot(
      getScreenshotPath(requiremnt, event_error_group, party_name_required_test),
      {
        overwrite: true,
      }
    );
  });

  const party_name_short_test = 'should show party_name_short';
  it(party_name_short_test, () => {


    cy.screenshot(
      getScreenshotPath(requiremnt, event_error_group, party_name_short_test),
      {
        overwrite: true,
      }
    );
  });
  
  const party_zip_chars_test = 'should show party_zip_chars';
  it(party_zip_chars_test, () => {


    cy.screenshot(
      getScreenshotPath(requiremnt, event_error_group, party_zip_chars_test),
      {
        overwrite: true,
      }
    );
  });

  const party_zip_long_test = 'should show party_zip_long';
  it(party_zip_long_test, () => {


    cy.screenshot(
      getScreenshotPath(requiremnt, event_error_group, party_zip_long_test),
      {
        overwrite: true,
      }
    );
  });

  const party_zip_required_test = 'should show party_zip_required';
  it(party_zip_required_test, () => {


    cy.screenshot(
      getScreenshotPath(requiremnt, event_error_group, party_zip_required_test),
      {
        overwrite: true,
      }
    );
  });

  const party_zip_short_test = 'should show party_zip_short';
  it(party_zip_short_test, () => {


    cy.screenshot(
      getScreenshotPath(requiremnt, event_error_group, party_zip_short_test),
      {
        overwrite: true,
      }
    );
  });
});