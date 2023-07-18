import {
  api_error_400,
  navigateDeleteEvent,
  pt_city,
  user_email,
  user_name,
} from '../support/app.po';
import {
  navigateChangeEvent,
  pt_addressLine,
  pt_country,
  pt_name,
  pt_zip,
} from '../support/app.po';

describe('delete-event-error', () => {
  beforeEach(() => {
    cy.login();
    navigateDeleteEvent();
  });

  it('should show delete-event-error', () => {
    cy.intercept('DELETE', '/api/event/1', {
      statusCode: 400,
      body: {
        message: api_error_400(),
      },
    }).as('event');
    cy.get('.mr-4 > #delete').click();
    cy.contains(api_error_400());
    cy.screenshot();
  });
});

describe('delete-event-success', () => {
  beforeEach(() => {
    cy.login();
    navigateDeleteEvent();
  });

  it('should show delete-event-success', () => {
    cy.intercept('DELETE', '/api/event/1', {
      statusCode: 200,
    }).as('event');

    cy.get('.mr-4 > #delete').click();
    cy.contains('Dein Event wurde erfolgreich gelöscht.');
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
});
