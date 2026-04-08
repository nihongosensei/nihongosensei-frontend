import "@testing-library/jest-dom";
import { render } from "@testing-library/preact";
import { describe, expect, it } from "vitest";
import { Furigana } from "./Furigana";

describe("Furigana", () => {
  it("should contain the reading and original text", () => {
    const reading = "にほん";
    const text = "日本語";

    const screen = render(<Furigana reading={reading} text={text} />);

    expect(screen.getByTestId("furigana-reading")).toHaveTextContent(reading);
    expect(screen.getByTestId("furigana-text")).toHaveTextContent(text);
  });
});
