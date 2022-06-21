/// <reference types="cypress" />

import "@testing-library/cypress/add-commands";

declare global {
  namespace Cypress {
    interface Chainable {
      login(): void;
    }
  }
}

Cypress.Commands.add("login", () => {
  return cy.request({
    method: "POST",
    form: true,
    url: Cypress.config().baseUrl,
    body: {
      username: Cypress.env("username"),
      password: Cypress.env("password"),
      grant_type: "password",
    },
  });
});
