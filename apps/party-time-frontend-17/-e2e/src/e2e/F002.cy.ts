import { getScreenshotPath } from '../support/utils';

const requiremnt = "F002";
const event_group = 'change-event';
describe(event_group, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const change_success_test = 'should show change_success';
  it(change_success_test, () => {

    cy.screenshot(
      getScreenshotPath(requiremnt, event_group, change_success_test),
      {
        overwrite: true,
      }
    );
  });
});


const change_event_error_group = 'change-event-error';
describe(change_event_error_group, () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const party_addressLineAddition_long_test = 'should show party_addressLineAddition_long';
  it(party_addressLineAddition_long_test, () => {


    cy.screenshot(
      getScreenshotPath(requiremnt, change_event_error_group, party_addressLineAddition_long_test),
      {
        overwrite: true,
      }
    );
  });

  const party_address_long_test = 'should show party_address_long';
  it(party_address_long_test, () => {


    cy.screenshot(
      getScreenshotPath(requiremnt, change_event_error_group, party_address_long_test),
      {
        overwrite: true,
      }
    );
  });

  const party_address_required_test = 'should show party_address_required';
  it(party_address_required_test, () => {


    cy.screenshot(
      getScreenshotPath(requiremnt, change_event_error_group, party_address_required_test),
      {
        overwrite: true,
      }
    );
  });

  const party_address_short_test = 'should show party_address_short';
  it(party_address_short_test, () => {


    cy.screenshot(
      getScreenshotPath(requiremnt, change_event_error_group, party_address_short_test),
      {
        overwrite: true,
      }
    );
  });

  const party_city_long_test = 'should show party_city_long';
  it(party_city_long_test, () => {


    cy.screenshot(
      getScreenshotPath(requiremnt, change_event_error_group, party_city_long_test),
      {
        overwrite: true,
      }
    );
  });

  const party_city_required_test = 'should show party_city_required';
  it(party_city_required_test, () => {


    cy.screenshot(
      getScreenshotPath(requiremnt, change_event_error_group, party_city_required_test),
      {
        overwrite: true,
      }
    );
  });

  const party_city_short_test = 'should show party_city_short';
  it(party_city_short_test, () => {


    cy.screenshot(
      getScreenshotPath(requiremnt, change_event_error_group, party_city_short_test),
      {
        overwrite: true,
      }
    );
  });

  const party_country_long_test = 'should show party_country_long';
  it(party_country_long_test, () => {


    cy.screenshot(
      getScreenshotPath(requiremnt, change_event_error_group, party_country_long_test),
      {
        overwrite: true,
      }
    );
  });

  const party_country_required_test = 'should show party_country_required';
  it(party_country_required_test, () => {


    cy.screenshot(
      getScreenshotPath(requiremnt, change_event_error_group, party_country_required_test),
      {
        overwrite: true,
      }
    );
  });

  const party_country_short_test = 'should show show party_country_short';
  it(party_country_short_test, () => {


    cy.screenshot(
      getScreenshotPath(requiremnt, change_event_error_group, party_country_short_test),
      {
        overwrite: true,
      }
    );
  });

  const party_create_error_test = 'should show party_create_error';
  it(party_create_error_test, () => {


    cy.screenshot(
      getScreenshotPath(requiremnt, change_event_error_group, party_create_error_test),
      {
        overwrite: true,
      }
    );
  });

  const party_name_long_test = 'should show party_name_long';
  it(party_name_long_test, () => {


    cy.screenshot(
      getScreenshotPath(requiremnt, change_event_error_group, party_name_long_test),
      {
        overwrite: true,
      }
    );
  });

  const party_name_required_test = 'should show party_name_required';
  it(party_name_required_test, () => {


    cy.screenshot(
      getScreenshotPath(requiremnt, change_event_error_group, party_name_required_test),
      {
        overwrite: true,
      }
    );
  });

  const party_name_short_test = 'should show party_name_short';
  it(party_name_short_test, () => {


    cy.screenshot(
      getScreenshotPath(requiremnt, change_event_error_group, party_name_short_test),
      {
        overwrite: true,
      }
    );
  });
  
  const party_zip_chars_test = 'should show party_zip_chars';
  it(party_zip_chars_test, () => {


    cy.screenshot(
      getScreenshotPath(requiremnt, change_event_error_group, party_zip_chars_test),
      {
        overwrite: true,
      }
    );
  });

  const party_zip_long_test = 'should show party_zip_long';
  it(party_zip_long_test, () => {


    cy.screenshot(
      getScreenshotPath(requiremnt, change_event_error_group, party_zip_long_test),
      {
        overwrite: true,
      }
    );
  });

  const party_zip_required_test = 'should show party_zip_required';
  it(party_zip_required_test, () => {


    cy.screenshot(
      getScreenshotPath(requiremnt, change_event_error_group, party_zip_required_test),
      {
        overwrite: true,
      }
    );
  });

  const party_zip_short_test = 'should show party_zip_short';
  it(party_zip_short_test, () => {


    cy.screenshot(
      getScreenshotPath(requiremnt, change_event_error_group, party_zip_short_test),
      {
        overwrite: true,
      }
    );
  });
});