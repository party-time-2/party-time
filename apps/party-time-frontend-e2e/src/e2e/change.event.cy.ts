import {
  pt_addressLineAddition_long_error,
  pt_city,
  pt_zip_chars_error,
  user_email,
  user_name,
} from '../support/app.po';
import {
  long_string,
  navigateChangeEvent,
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

describe('change-event-error', () => {
  beforeEach(() => {
    cy.login();
    cy.intercept('GET', '/api/event/1', {
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
    }).as('event');
    navigateChangeEvent();
  });

  it('should show party_name_required', () => {
    cy.wait('@event');
    cy.get('#name').clear();
    cy.get('#name').type(pt_name());
    cy.get('#name').clear();
    cy.contains(pt_name_required_error());
    cy.screenshot();
  });

  it('should show party_name_short', () => {
    cy.wait('@event');
    cy.get('#name').clear();
    cy.get('#name').type(short_string());
    cy.contains(pt_name_short_error());
    cy.screenshot();
  });

  it('should show party_name_long', () => {
    cy.wait('@event');
    cy.get('#name').clear();
    cy.get('#name').type(very_long_string());
    cy.contains(pt_name_long_error());
    cy.screenshot();
  });

  it('should show party_address_required', () => {
    cy.wait('@event');
    cy.get('#addressLine').clear();
    cy.get('#addressLine').type(pt_addressLine());
    cy.get('#addressLine').clear();
    cy.contains(pt_address_required_error());
    cy.screenshot();
  });

  it('should show party_address_short', () => {
    cy.wait('@event');
    cy.get('#addressLine').clear();
    cy.get('#addressLine').type(short_string());
    cy.contains(pt_address_short_error());
    cy.screenshot();
  });

  it('should show party_address_long', () => {
    cy.wait('@event');
    cy.get('#addressLine').clear();
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
    cy.wait('@event');
    cy.get('#zip').clear();
    cy.get('#zip').type(pt_zip());
    cy.get('#zip').clear();
    cy.contains(pt_zip_required_error());
    cy.screenshot();
  });

  it('should show party_zip_short', () => {
    cy.wait('@event');
    cy.get('#zip').clear();
    cy.get('#zip').type('123');
    cy.contains(pt_zip_short_error());
    cy.screenshot();
  });

  it('should show party_zip_long', () => {
    cy.wait('@event');
    cy.get('#zip').clear();
    cy.get('#zip').type('123123123');
    cy.contains(pt_zip_long_error());
    cy.screenshot();
  });

  it('should show party_zip_chars', () => {
    cy.wait('@event');
    cy.get('#zip').clear();
    cy.get('#zip').type('abc');
    cy.contains(pt_zip_chars_error());
    cy.screenshot();
  });

  it('should show party_city_required', () => {
    cy.wait('@event');
    cy.get('#city').clear();
    cy.contains(pt_city_required_error());
    cy.screenshot();
  });

  it('should show party_city_short', () => {
    cy.wait('@event');
    cy.get('#city').clear();
    cy.get('#city').type(short_string());
    cy.contains(pt_city_short_error());
    cy.screenshot();
  });

  it('should show party_city_long', () => {
    cy.wait('@event');
    cy.get('#city').clear();
    cy.get('#city').type(long_string());
    cy.contains(pt_city_long_error());
    cy.screenshot();
  });

  it('should show party_country_required', () => {
    cy.wait('@event');
    cy.get('#country').clear();
    cy.contains(pt_country_required_error());
    cy.screenshot();
  });

  it('should show party_country_short', () => {
    cy.wait('@event');
    cy.get('#country').clear();
    cy.get('#country').type(short_string());
    cy.contains(pt_country_short_error());
    cy.screenshot();
  });

  it('should show party_country_long', () => {
    cy.wait('@event');
    cy.get('#country').clear();
    cy.get('#country').type(long_string());
    cy.contains(pt_country_long_error());
    cy.screenshot();
  });
});

describe('change-event-error', () => {
  beforeEach(() => {
    cy.login();
    cy.intercept('GET', '/api/event/1', {
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
    }).as('event');
    navigateChangeEvent();
  });

  it('should show party_change_error', () => {
    cy.intercept('PUT', '/api/event', {
      statusCode: 400,
      body: {
        message: 'Die Anfrage konnte nicht bearbeitet werden',
      },
    }).as('changeParty');

    cy.wait('@event');
    cy.get('#edit').click();
    cy.wait('@changeParty');
    cy.contains('Die Anfrage konnte nicht bearbeitet werden');
    cy.screenshot();
  });
});

describe('change-event', () => {
  beforeEach(() => {
    cy.login();
    cy.intercept('GET', '/api/event/1', {
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
    }).as('event');
    navigateChangeEvent();
  });

  it('should show change_success', () => {
    cy.intercept('PUT', '/api/event', {
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
    }).as('changeParty');

    cy.get('party-time-primary-button > #edit').click();
    cy.wait('@changeParty');
    cy.contains(`Dein Event ${pt_name()} wurde erfolgreich geändert.`);
    cy.screenshot();
  });
});
