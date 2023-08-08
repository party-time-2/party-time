import {
  account_not_found_error,
  navigateParticipantsOverview,
  participant_email,
  participant_email_invalid_error,
  user_email,
  user_name,
} from '../support/app.po';

describe('party-time-view-participants', () => {
  beforeEach(() => {
    cy.login();
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
    navigateParticipantsOverview();
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

describe('party-time-add-participant', () => {
  beforeEach(() => {
    cy.login();
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
    navigateParticipantsOverview();
  });
  it('should show participant_email_invalid', () => {
    cy.get('#email').type('a');
    cy.contains(participant_email_invalid_error());
    cy.screenshot();
  });

  it('should show participant_already_invited', () => {
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

  it('should show participant_unknown', () => {
    cy.intercept('POST', '/api/event/1/participants/' + user_email(), {
      statusCode: 404,
      body: {
        error: 'NOT_FOUND',
        message: account_not_found_error(),
      },
    });
    cy.get('#email').type(user_email());
    cy.get('party-time-primary-button > #add').click();
    cy.contains(account_not_found_error());
    cy.screenshot();
  });

  it('should show participant_invite', () => {
    cy.intercept('POST', '/api/event/1/participants/' + user_email(), {
      statusCode: 200,
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
        {
          account: {
            id: 3,
            name: user_name(),
            email: user_email(),
            emailVerified: true,
          },
          status: 'INVITED',
        },
      ],
    });
    cy.get('#email').type(user_email());
    cy.get('party-time-primary-button > #add').click();
    cy.get('party-time-participant-selector').contains(user_email()).should('exist')
    cy.screenshot();
  });
});

describe('party-time-remove-participant', () => {
  beforeEach(() => {
    cy.login();
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
    navigateParticipantsOverview();
  });

  it('should show participant_not_invited_error', () => {
    cy.login();
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
    navigateParticipantsOverview();
    cy.intercept('DELETE', '/api/event/1/participants/' + participant_email(), {
      statusCode: 404,
      body: {
        error: 'NOT_FOUND',
        message: account_not_found_error(),
      },
    });
    cy.get('.flex > p').click();
    cy.contains(account_not_found_error());
    cy.screenshot();
  });

  it('should show participant_remove', () => {
    cy.intercept('DELETE', '/api/event/1/participants/' + participant_email(), {
      statusCode: 200,
      body: [],
    });
    cy.get('.flex > p').click();
    cy.contains(participant_email()).should('not.exist')
    cy.screenshot();
  });
});
