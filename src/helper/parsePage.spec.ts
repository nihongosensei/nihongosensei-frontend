import { describe, expect, it } from "vitest";
import { parsePage } from "./parsePage";

describe("parsePage", () => {
  it.each([
    [null, 1],
    [undefined, 1],
    ["", 1],
    ["abc", 1],
    ["0", 1],
    ["-5", 1],
    ["1", 1],
    ["7", 7],
    ["3.9", 3],
    ["99999999999999999999", 1],
  ])("parses %j as %i", (input, expected) => {
    expect(parsePage(input)).toBe(expected);
  });
});
