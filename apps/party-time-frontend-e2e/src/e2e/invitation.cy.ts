import {
  accept_api_url,
  decline_api_url,
  event_not_found_error,
  navigateAcceptInvite,
  navigateDeclineInvite,
  not_invited_error,
} from '../support/app.po';

describe('accept-invite success', () => {
  it('should show invite_accepted', () => {
    cy.login();
    cy.intercept(
      {
        method: 'POST',
        url: accept_api_url(),
      },
      {
        statusCode: 200,
      }
    ).as('acceptInvite');
    navigateAcceptInvite();
    cy.wait('@acceptInvite');
    cy.contains('Wir haben deine Zusage gespeichert.');
    cy.screenshot();
  });
});

describe('accet-invite error', () => {
  beforeEach(() => {
    cy.login();
  });
  it('should show participant_not_invited', () => {
    cy.intercept(
      {
        method: 'POST',
        url: accept_api_url(),
      },
      {
        statusCode: 403,
        body: {
          message: not_invited_error(),
        },
      }
    ).as('notInvited');

    navigateAcceptInvite();
    cy.wait('@notInvited');
    cy.contains(not_invited_error());
    cy.screenshot();
  });

  it('should show event_not_found', () => {
    cy.intercept(
      {
        method: 'POST',
        url: accept_api_url(),
      },
      {
        statusCode: 404,
        body: {
          message: event_not_found_error(),
        },
      }
    ).as('noEvent');

    navigateAcceptInvite();
    cy.wait('@noEvent');
    cy.contains(event_not_found_error());
    cy.screenshot();
  });
});

describe('decline-invite success', () => {
  it('should show invite_declined', () => {
    cy.login();
    cy.intercept(
      {
        method: 'POST',
        url: decline_api_url(),
      },
      {
        statusCode: 200,
      }
    );
    navigateDeclineInvite();
    cy.contains('Wir haben deine Absage gespeichert.');
    cy.screenshot();
  });
});

describe('decline-invite error', () => {
  beforeEach(() => {
    cy.login();
  });
  it('should show participant_not_invited', () => {
    cy.intercept(
      {
        method: 'POST',
        url: decline_api_url(),
      },
      {
        statusCode: 403,
        body: {
          message: not_invited_error(),
        },
      }
    ).as('notInvited');

    navigateDeclineInvite();
    cy.wait('@notInvited');
    cy.contains(not_invited_error());
    cy.screenshot();
  });

  it('should show event_not_found', () => {
    cy.intercept(
      {
        method: 'POST',
        url: decline_api_url(),
      },
      {
        statusCode: 404,
        body: {
          message: event_not_found_error(),
        },
      }
    ).as('noEvent');

    navigateDeclineInvite();
    cy.wait('@noEvent');
    cy.contains(event_not_found_error());
    cy.screenshot();
  });
});
