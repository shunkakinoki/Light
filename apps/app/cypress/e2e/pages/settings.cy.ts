export {};

describe("Settings", () => {
  it("Settings page should render correctly", () => {
    cy.visit("/settings", {
      auth: {
        username: Cypress.env("username"),
        password: Cypress.env("password"),
      },
      timeout: 30000,
    });
  });
});
