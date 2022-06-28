export {};

describe("Auth", () => {
  it("Auth page should render correctly", () => {
    cy.visit("/auth");
  });
});
