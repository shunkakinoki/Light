import { expect } from "@jest/globals";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { LoadingText } from "./LoadingText";

it("Renders LoadingText", () => {
  const { asFragment } = render(<LoadingText />);
  expect(asFragment()).toMatchSnapshot();
});
