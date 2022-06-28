export {};

describe("Member", () => {
  it("Membership page should render correctly", () => {
    cy.visit("/member", {
      auth: {
        username: Cypress.env("username"),
        password: Cypress.env("password"),
      },
      timeout: 30000,
    });
  });
});
