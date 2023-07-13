import {
  pt_addressLineAddition_long_error,
  pt_city,
  user_email,
  user_name,
} from '../support/app.po';
import {
  long_string,
  navigateCreateEvent,
  pt_addressLine,
  pt_address_long_error,
  pt_address_required_error,
  pt_address_short_error,
  pt_city_long_error,
  pt_city_required_error,
  pt_city_short_error,
  pt_country,
  pt_country_long_error,
  pt_country_required_error,
  pt_country_short_error,
  pt_name,
  pt_name_long_error,
  pt_name_required_error,
  pt_name_short_error,
  pt_zip,
  pt_zip_long_error,
  pt_zip_required_error,
  pt_zip_short_error,
  short_string,
  very_long_string,
} from '../support/app.po';

describe('create-event-error', () => {
  beforeEach(() => {
    cy.login();
    navigateCreateEvent();
  });

  it('should show party_name_required', () => {
    cy.get('#name').type(pt_name());
    cy.get('#name').clear();
    cy.contains(pt_name_required_error());
    cy.screenshot();
  });

  it('should show party_name_short', () => {
    cy.get('#name').type(short_string());
    cy.contains(pt_name_short_error());
    cy.screenshot();
  });

  it('should show party_name_long', () => {
    cy.get('#name').type(very_long_string());
    cy.contains(pt_name_long_error());
    cy.screenshot();
  });

  it('should show party_address_required', () => {
    cy.get('#addressLine').type(pt_addressLine());
    cy.get('#addressLine').clear();
    cy.contains(pt_address_required_error());
    cy.screenshot();
  });

  it('should show party_address_short', () => {
    cy.get('#addressLine').type(short_string());
    cy.contains(pt_address_short_error());
    cy.screenshot();
  });

  it('should show party_address_long', () => {
    cy.get('#addressLine').type(long_string());
    cy.contains(pt_address_long_error());
    cy.screenshot();
  });

  it('should show party_addressLineAddition_long', () => {
    cy.get('#addressLineAddition').type(long_string());
    cy.contains(pt_addressLineAddition_long_error());
    cy.screenshot();
  });

  it('should show party_zip_required', () => {
    cy.get('#zip').type(pt_zip());
    cy.get('#zip').clear();
    cy.contains(pt_zip_required_error());
    cy.screenshot();
  });

  it('should show party_zip_short', () => {
    cy.get('#zip').type('123');
    cy.contains(pt_zip_short_error());
    cy.screenshot();
  });

  it('should show party_zip_long', () => {
    cy.get('#zip').type('123123123');
    cy.contains(pt_zip_long_error());
    cy.screenshot();
  });

  it('should show party_city_required', () => {
    cy.get('#city').type(pt_name());
    cy.get('#city').clear();
    cy.contains(pt_city_required_error());
    cy.screenshot();
  });

  it('should show party_city_short', () => {
    cy.get('#city').type(short_string());
    cy.contains(pt_city_short_error());
    cy.screenshot();
  });

  it('should show party_city_long', () => {
    cy.get('#city').type(long_string());
    cy.contains(pt_city_long_error());
    cy.screenshot();
  });

  it('should show party_country_required', () => {
    cy.get('#country').type(pt_country());
    cy.get('#country').clear();
    cy.contains(pt_country_required_error());
    cy.screenshot();
  });

  it('should show party_country_short', () => {
    cy.get('#country').type(short_string());
    cy.contains(pt_country_short_error());
    cy.screenshot();
  });

  it('should show party_country_long', () => {
    cy.get('#country').type(long_string());
    cy.contains(pt_country_long_error());
    cy.screenshot();
  });
});

describe('create-event-error', () => {
  beforeEach(() => {
    cy.login();
    navigateCreateEvent();
  });

  it('should show party_create_error', () => {
    cy.intercept('POST', '/api/event', {
      statusCode: 400,
      body: {
        message: 'Die Anfrage konnte nicht bearbeitet werden',
      },
    }).as('createParty');

    cy.get('#name').type(pt_name());
    cy.get('#addressLine').type(pt_addressLine());
    cy.get('#zip').type(pt_zip());
    cy.get('#city').type(pt_city());
    cy.get('#country').type(pt_country());
    cy.get('#create').click();
    cy.wait('@createParty');
    cy.contains('Die Anfrage konnte nicht bearbeitet werden');
    cy.screenshot();
  });
});

describe('create-event', () => {
  beforeEach(() => {
    cy.login();
    navigateCreateEvent();
  });

  it('should show create_success', () => {
    cy.intercept('POST', '/api/event', {
      statusCode: 200,
      body: {
        id: '1',
        name: pt_name(),
        organizer: {
          id: '1',
          name: user_name(),
          email: user_email(),
          emailVerified: true,
        },
        dateTime: new Date().toISOString(),
        address: {
          addressLine: pt_addressLine(),
          addressLineAddition: '',
          zip: pt_zip(),
          city: pt_city(),
          country: pt_country(),
        },
      },
    }).as('createParty');

    cy.get('#name').type(pt_name());
    cy.get('#addressLine').type(pt_addressLine());
    cy.get('#zip').type(pt_zip());
    cy.get('#city').type(pt_city());
    cy.get('#country').type(pt_country());
    cy.get('party-time-primary-button > #create').click();
    cy.wait('@createParty');
    cy.contains(`Dein Event ${pt_name()} wurde erfolgreich erstellt.`);
    cy.screenshot();
  });
});
