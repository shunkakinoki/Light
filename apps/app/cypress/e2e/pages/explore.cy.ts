export {};

describe("Explore", () => {
  it("Explore page should render correctly", () => {
    cy.visit("/explore", {
      auth: {
        username: Cypress.env("username"),
        password: Cypress.env("password"),
      },
      timeout: 30000,
    });
  });
});
