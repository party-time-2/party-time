import {
    user_pw_required,
    short_string,
    navigateDelete,
  } from '../support/app.po';
  
  it('should show password_required', () => {
    cy.login();
    navigateDelete();
    cy.get('#current-password').type(short_string());
    cy.get('#current-password').clear();
    cy.contains(user_pw_required());
    cy.screenshot();
  });
  