import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";

//Smoke test
test("renders Card component without crashing", () => {
  render(<Card />);
});

//Snapshot test
test("matches snapshot", () => {
  const { asFragment } = render(<Card />);
  expect(asFragment()).toMatchSnapshot();
});

test("displays content from test props", () => {
  const props = {
    caption: "Test Caption",
    src: "testImg.png",
    currNum: 1,
    totalNum: 3,
  };

  const { getByText, getByRole } = render(<Card {...props} />);

  const cardTitle = getByText(props.caption);
  const imgSrc = getByRole("img");
  expect(cardTitle).toBeInTheDocument();
  expect(imgSrc).toHaveAttribute("src", props.src);
});
