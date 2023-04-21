import { getGreeting, navigateRegister } from '../support/app.po';

describe('party-time-frontend', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Plane deine Party');
  });

  it('should show no error on valid input', () => {
    navigateRegister();
    cy.get('#name').type('Test');
    cy.get('#name').clear();
    cy.get('#name').type('Test');
  });

  it('should show error on dirty name field', () => {
    navigateRegister();
    cy.get('#name').type('Test');
    cy.get('#name').clear();
    cy.get(':nth-child(3) > :nth-child(1) > .flex > .text-sm').contains(
      'Bitte gib einen Benutzernamen ein.'
    );
    cy.get('#name').type('Test');
  });

  it('should show error on short username', () => {
    navigateRegister();
    cy.get('#name').type('Te');
    cy.get(':nth-child(3) > :nth-child(1) > .flex > .text-sm').contains(
      'Der Benutzername muss mindestens 5 Zeichen lang sein.'
    );
  });

  it('should show error on long username', () => {
    navigateRegister();
    cy.get('#name').type('Teeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
    cy.get(':nth-child(3) > :nth-child(1) > .flex > .text-sm').contains(
      'Der Benutzernamen darf maximal 20 Zeichen lang sein.'
    );
  });
});
