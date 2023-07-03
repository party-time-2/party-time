import {
  navigateParticipantsOverview,
  participant_email,
  participant_email_invalid_error,
} from '../support/app.po';

describe('party-time-view-participants', () => {
  beforeEach(() => {
    cy.login();
    navigateParticipantsOverview();
  });

  it('should show participant_email_invalid', () => {
    cy.get('#email').type('a');
    cy.contains(participant_email_invalid_error());
    cy.screenshot();
  });

  it('should show invite_participant_error', () => {
    cy.intercept('GET', '/api/event/1/participants', {
      body: [
        {
          account: {
            id: 2,
            name: 'Dagobert Duck',
            email: participant_email(),
            emailVerified: true,
          },
          status: 'INVITED',
        },
      ],
    });
    cy.intercept('POST', '/api/event/1/participants/' + participant_email(), {
      statusCode: 400,
      body: {
        error: 'Bad Request',
        message:
          'Der Account mit der Email ' +
          participant_email() +
          ' wurde bereits eingeladen',
      },
    });
    cy.get('#email').type(participant_email());
    cy.get('party-time-primary-button > #add').click();
    cy.contains(
      'Der Account mit der Email ' +
        participant_email() +
        ' wurde bereits eingeladen'
    );
    cy.screenshot();
  });

  it('should show view_participants', () => {
    cy.intercept('GET', '/api/event/1/participants', {
      body: [],
    });
    cy.intercept('POST', '/api/event/1/participants/' + participant_email(), {
      body: [
        {
          account: {
            id: 2,
            name: 'Dagobert Duck',
            email: participant_email(),
            emailVerified: true,
          },
          status: 'INVITED',
        },
      ],
    });

    cy.get('#email').type(participant_email());
    cy.get('party-time-primary-button > #add').click();
    cy.screenshot();
  });
});
