import {
  navigateChange,
  navigateCreateEvent,
  pt_name_short,
} from '../support/app.po';

describe('create-event-error', () => {
  beforeEach(() => {
    cy.login();
    navigateCreateEvent();
  });

  it('should show party_name_short', () => {
    cy.get('#name').type(pt_name_short());
    cy.get('#name').clear();
    cy.get('#name').type(pt_name_short());
    cy.contains(pt_name_short_error());
    cy.screenshot();
  });
});
