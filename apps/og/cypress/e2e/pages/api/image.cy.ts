export {};

describe("Image", () => {
  it("Image page should render correctly", () => {
    cy.request("/api/image").should(response => {
      expect(response.status).to.eq(200);
      expect(response.headers).to.have.property("content-type");
      expect(response.headers["content-type"]).to.eq("image/png");
    });
  });
});
