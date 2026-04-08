import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/preact";
import { describe, expect, it, vi } from "vitest";
import {
  TextSizeContext,
  TextSizeStore,
} from "~components/FuriganaGenerator/textSizeStore";
import { JapaneseTextControls } from "./JapaneseTextControls";

describe("JapaneseTextContainer", () => {
  it("should call the onTextSizeChange callback upon increase correctly", () => {
    const store = new TextSizeStore({
      initialSize: 100,
      step: 10,
      minSize: 70,
      maxSize: 150,
    });

    const handleTextSizeChangeMock = vi
      .spyOn(store, "increaseTextSize")
      .mockImplementation(() => void 0);

    const screen = render(
      <TextSizeContext.Provider value={store}>
        <JapaneseTextControls />
      </TextSizeContext.Provider>,
    );

    fireEvent.click(screen.getByTestId("text-controls-increase-text-size"));

    expect(handleTextSizeChangeMock).toHaveBeenCalledTimes(1);
  });

  it("should call the onTextSizeChange callback upon decrease correctly", () => {
    const store = new TextSizeStore({
      initialSize: 100,
      step: 10,
      minSize: 70,
      maxSize: 150,
    });

    const handleTextSizeChangeMock = vi
      .spyOn(store, "decreaseTextSize")
      .mockImplementation(() => void 0);

    const screen = render(
      <TextSizeContext.Provider value={store}>
        <JapaneseTextControls />,
      </TextSizeContext.Provider>,
    );

    fireEvent.click(screen.getByTestId("text-controls-decrease-text-size"));

    expect(handleTextSizeChangeMock).toHaveBeenCalledTimes(1);
  });

  it("should disable the in- and decrease button if the min and max size is reached", () => {
    const store = new TextSizeStore({
      initialSize: 100,
      step: 10,
      minSize: 100,
      maxSize: 100,
    });

    const screen = render(
      <TextSizeContext.Provider value={store}>
        <JapaneseTextControls />,
      </TextSizeContext.Provider>,
    );

    expect(
      screen.getByTestId("text-controls-increase-text-size"),
    ).toBeDisabled();
    expect(
      screen.getByTestId("text-controls-decrease-text-size"),
    ).toBeDisabled();
  });
});
