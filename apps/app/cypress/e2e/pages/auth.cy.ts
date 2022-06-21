export {};

describe("Auth", () => {
  it("Auth page should render correctly", () => {
    cy.visit("/auth", {
      auth: {
        username: Cypress.env("username"),
        password: Cypress.env("password"),
      },
    });
  });
});
