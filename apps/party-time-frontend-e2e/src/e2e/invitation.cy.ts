import { navigateAcceptInvite, navigateDeclineInvite } from '../support/app.po';

describe('accept-invite success', () => {
  it('should show invite_accepted', () => {
    cy.login();
    cy.intercept(
      {
        method: 'POST',
        url: '/api/event/1/participants/invitation/accept',
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
        url: '/api/event/1/participants/invitation/accept',
      },
      {
        statusCode: 403,
        body: {
              message: 'Du bist nicht zu diesem Event eingeladen.',
        },
      }
    ).as('notInvited');

    navigateAcceptInvite();
    cy.wait('@notInvited');
    cy.contains('Du bist nicht zu diesem Event eingeladen.');
    cy.screenshot();
  });

  it('should show event_not_found', () => {
    cy.intercept(
      {
        method: 'POST',
        url: '/api/event/1/participants/invitation/accept',
      },
      {
        statusCode: 404,
        body: {
              message: 'Das Event wurde nicht gefunden.',
        },
      }
    ).as('noEvent');

    navigateAcceptInvite();
    cy.wait('@noEvent');
    cy.contains('Das Event wurde nicht gefunden.');
    cy.screenshot();
  });

});

// describe('decline-invite success', () => {
//   it('should show invite_declined', () => {
//     cy.login();
//     cy.intercept(
//       {
//         method: 'POST',
//         url: '/api/event/1/participants/invitation/decline',
//       },
//       {
//         statusCode: 200,
//       }
//     );
//     navigateDeclineInvite();
//     cy.contains('Wir haben deine Absage gespeichert.');
//     cy.screenshot();
//   });
// });

// describe('decline-invite error', () => {
//   // not invited
//   // event not found
//   // server error
// });
