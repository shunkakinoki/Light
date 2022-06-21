export {};

describe("Html", () => {
  it("Html page should render correctly", () => {
    cy.visit("/api/html");
  });
});
