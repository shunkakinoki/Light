export {};

describe("Middleware", () => {
  it("Index page should render correctly", () => {
    cy.visit("/", {});
  });

  it("Index page should redirect to explore if cookie present", () => {
    cy.setCookie("next-auth.csrf-token", "foo");
    cy.visit("/", {});
    cy.location("pathname").should("eq", "/");
  });

  it("FAQ page should redirect correctly", () => {
    cy.visit("/faq", {});
    cy.url().should("contain", "lightdotso.notion.site");
  });
});
