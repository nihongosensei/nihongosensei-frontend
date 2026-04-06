import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Invisible } from "./Invisible";

describe("Invisible", () => {
  it("should contain the passed children and the `invisible` class", async () => {
    const screen = await render(<Invisible>foo</Invisible>);

    expect(screen.getByTestId("invisible")).not.toBeNull();
    expect(screen.getByTestId("invisible")).toHaveTextContent("foo");
  });
});
