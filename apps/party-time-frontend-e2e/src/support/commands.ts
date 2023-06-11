// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // add token to window.localStorage
  interface Chainable {
    login(): void;
  }
}

Cypress.Commands.add('login', () => {
  cy.window().then((window) => {
    window.localStorage.setItem(
      'auth_token',
      'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJjY2EyZmU3Mi1kODA1LTRiZmYtODQwNy04NzU5Zjc3MzE5OTciLCJpYXQiOjE2ODYzNzcxMjEsImlzcyI6Imh0dHBzOi8vcGFydHl0aW1lLmRlL2F1dGgiLCJzdWIiOiJmNDY3MDRkMi04ZTI5LTRhYzUtYWRjNi01YzE5OTA1NWM2MmMiLCJlbWFpbCI6InZlcmlmaWVkMUBwYXJ0eXRpbWUuZGUiLCJuYW1lIjoiVmVyaWZpZWQgVXNlciAxIiwiZW1haWxfdmVyaWZpZWQiOnRydWV9.y54PV0tS2SH61d9e5n2OnraeeRhTByr0T3twiK4Q9bc'
    );
  });
});
//

//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
