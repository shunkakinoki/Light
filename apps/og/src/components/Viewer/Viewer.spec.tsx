import { expect } from "@jest/globals";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Viewer } from "./Viewer";

it("Renders Viewer", () => {
  const { asFragment } = render(<Viewer />);
  expect(asFragment()).toMatchSnapshot();
});
