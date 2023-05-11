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
      'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJlZDBhM2NjZS01NjRlLTQzNmMtYmI5Yi1lYTkwNWM3ZGMzYjAiLCJpYXQiOjE2ODMyMjg3NTYsImlzcyI6Imh0dHBzOi8vcGFydHl0aW1lLmRlL2F1dGgiLCJzdWIiOiJiZWViOTczZS1jZDhjLTRjY2EtOTNlNy1hZTdjMjE3ODA2ZjciLCJlbWFpbCI6InBhcnR5MTIzMTIzQGRlIiwibmFtZSI6InBhcnR5MTIzMTIzIiwiZW1haWxfdmVyaWZpZWQiOnRydWV9.mG9D5rJtGc9lECsKgEUG6p1rrAx-W_1rEG4GygiKYAQ'
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
