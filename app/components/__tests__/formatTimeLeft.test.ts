import { describe, expect, it } from "vitest";
import { formatTimeLeft } from "../../lib/formatTimeLeft";

describe("formatTimeLeft", () => {
  it("formats exact hour-minute-second values", () => {
    expect(formatTimeLeft(5 * 60 * 60 * 1000 + 42 * 60 * 1000 + 7 * 1000)).toBe("05h 42m 07s");
  });

  it("pads leading zeros", () => {
    expect(formatTimeLeft(61 * 1000)).toBe("00h 01m 01s");
  });

  it("floors to whole seconds", () => {
    expect(formatTimeLeft(90.9 * 1000)).toBe("00h 01m 30s");
  });

  it("never returns negative values", () => {
    expect(formatTimeLeft(-5000)).toBe("00h 00m 00s");
  });
});
