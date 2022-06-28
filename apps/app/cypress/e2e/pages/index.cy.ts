export {};

describe("Index", () => {
  it("Index page should render correctly", () => {
    cy.visit("/", {
      auth: {
        username: Cypress.env("username"),
        password: Cypress.env("password"),
      },
      timeout: 30000,
    });
  });
});
