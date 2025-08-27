// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import "cypress-plugin-tab";
Cypress.Commands.add("loginAs", (username, password) => {
  cy.get('[name="username"]').type(username);
  cy.get('[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add("shouldBeLoggedIn", () => {
  cy.url().should("include", "dashboard");
});

Cypress.Commands.add("shouldSeeLoginError", () => {
  cy.get(".oxd-alert").should("be.visible");
});

Cypress.Commands.add("shouldSeeUserRequired", () => {
  cy.get(":nth-child(2) > .oxd-input-group > .oxd-text").should("be.visible");
});

Cypress.Commands.add("shouldSeePassRequired", () => {
  cy.get(":nth-child(3) > .oxd-input-group > .oxd-text").should("be.visible");
});
