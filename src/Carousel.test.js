import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./photos.js";

it("works when you click on the right arrow", function () {
  const { queryByAltText, queryByLabelText } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  // expect the first image to show, but not the second
  expect(queryByAltText(TEST_IMAGES[0].caption)).toBeInTheDocument();

  expect(queryByAltText(TEST_IMAGES[1].caption)).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByLabelText("Right Arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText(TEST_IMAGES[1].caption)).toBeInTheDocument();

  expect(queryByAltText(TEST_IMAGES[0].caption)).not.toBeInTheDocument();
});



it("works when you click on the left arrow", function () {
  const { queryByAltText, queryByLabelText } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );

  // move forward in the carousel
  const rightArrow =  queryByLabelText("Right Arrow");
  fireEvent.click(rightArrow);

  //move backwards in the carousel
  const leftArrow = queryByLabelText("Left Arrow");
  fireEvent.click(leftArrow);

  // expect the first image to show when moving backwards from second image
  expect(queryByAltText(TEST_IMAGES[0].caption)).toBeInTheDocument();

  

  //expect second image to no longer show
  expect(queryByAltText(TEST_IMAGES[1].caption)).not.toBeInTheDocument();
});

/**Testing left arrow functionality */
test("left arrow is hidden on first image", function () {
  const { queryByLabelText } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );

  expect(queryByLabelText("Left Arrow")).not.toBeInTheDocument();
});

/**Testing right arrow functionality */
test("right arrow is hidden on last image", function () {
  const { queryByLabelText } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );

  //Click to last image
  fireEvent.click(queryByLabelText("Right Arrow"));
  fireEvent.click(queryByLabelText("Right Arrow"));

  expect(queryByLabelText("Right Arrow")).not.toBeInTheDocument();
});
