import {
  navigateEventOverview,
  pt_addressLine,
  pt_city,
  pt_country,
  pt_name,
  pt_zip,
  user_email,
  user_name,
} from '../support/app.po';

describe('party-time-overview-events', () => {
  beforeEach(() => {
    cy.login();
    cy.intercept(
      {
        method: 'GET',
        url: '/api/event',
      },

      {
        statusCode: 200,
        body: [
          {
            id: 37,
            name: pt_name(),
            organizer: {
              id: 1,
              name: user_name(),
              email: user_email(),
              emailVerified: true,
            },
            dateTime: '2021-06-30 22:00:00',
            address: {
              addressLine: pt_addressLine(),
              zip: pt_zip(),
              city: pt_city(),
              country: pt_country(),
            },
          },
          {
            id: 37,
            name: pt_name(),
            organizer: {
              id: 1,
              name: user_name(),
              email: user_email(),
              emailVerified: true,
            },
            dateTime: '2021-06-30 22:00:00',
            address: {
              addressLine: pt_addressLine(),
              zip: pt_zip(),
              city: pt_city(),
              country: pt_country(),
            },
          },
        ],
        headers: {
          'access-control-allow-origin': '*',
        },
      }
    );

    navigateEventOverview();
  });

  it('should show events', () => {
    cy.screenshot();
  });
});
