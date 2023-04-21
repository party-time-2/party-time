import { getGreeting } from '../support/app.po';

describe('party-time-frontend', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Plane deine Party');
  });

  it('should be able to register', () => {
    cy.get(':nth-child(2) > .block').click();
    cy.get('#name').type('Te');
    cy.get(':nth-child(3) > :nth-child(1) > .flex > .text-sm').should(
      'contain',
      'Der Benutzername muss mindestens 5 Zeichen lang sein.'
    );
    cy.get('#name').type('Teeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
    cy.get(':nth-child(3) > :nth-child(1) > .flex > .text-sm').should(
      'contain',
      'Der Benutzernamen darf maximal 20 Zeichen lang sein.'
    );
    cy.get('#name').clear();
    cy.get('#name').type('Test');
  });
});
