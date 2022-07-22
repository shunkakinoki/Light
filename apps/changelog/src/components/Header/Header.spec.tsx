import { expect } from "@jest/globals";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Header } from "./Header";

it("Renders Header", () => {
  const { asFragment } = render(<Header />);
  expect(asFragment()).toMatchSnapshot();
});
