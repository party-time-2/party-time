import { navigateEventMap } from '../support/app.po';

describe('event-location success', () => {
  it('should show map', () => {
    cy.login();
    cy.intercept('GET', '/api/event/participants/1', {
      statusCode: 200,
      body: {
        id: 1,
        name: 'Test Event 1',
        organizer: {
          id: 1,
          name: 'Verified User 1',
          email: 'verified1@partytime.de',
          emailVerified: true,
        },
        dateTime: '2023-10-23 17:34:59',
        address: {
          addressLine: 'Obere Hauptstr. 48',
          addressLineAddition: '',
          zip: '85354',
          city: 'Freising',
          country: 'Deutschland',
        },
        participants: null,
        participatingStatus: 'PARTICIPATING',
      },
    });
    navigateEventMap();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);
    cy.get('iframe').should('be.visible');
    cy.screenshot();
  });
});

describe('event-location error', () => {
  it('should show event not found', () => {
    cy.login();
    cy.intercept('GET', '/api/event/participants/1', {
      statusCode: 404,
      body: {
        status: 'NOT_FOUND',
        timestamp: '2023-07-29 18:43:22',
        message: 'Das Event konnte nicht gefunden werden',
      },
    });
    navigateEventMap();
    cy.contains('Das Event konnte nicht gefunden werden');
    cy.screenshot();
  });
});
