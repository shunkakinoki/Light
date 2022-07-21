import { expect } from "@jest/globals";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Logo } from "./Logo";

it("Renders Logo", () => {
  const { asFragment } = render(<Logo />);
  expect(asFragment()).toMatchSnapshot();
});
