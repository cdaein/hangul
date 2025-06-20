import {
  describe,
  expect,
  test,
  vi,
  beforeEach,
  afterEach,
  MockInstance,
} from "vitest";
import { isHangul } from "./isHangul";

describe("isHangul()", () => {
  const warnMsg = (input: string) =>
    `Only the first character ("${input}") will be processed.`;

  let consoleWarnSpy: MockInstance;
  beforeEach(() => {
    consoleWarnSpy = vi.spyOn(console, "warn");
  });
  // prevent test pollution and ensure tests are isolated.
  afterEach(() => {
    consoleWarnSpy.mockRestore();
  });

  test("returns true for a complete Hangul syllable", () => {
    expect(isHangul("가")).toBe(true);
    expect(isHangul("맑")).toBe(true);
  });

  test("returns true for a Hangul jamo", () => {
    expect(isHangul("ㄱ")).toBe(true);
    expect(isHangul("ㅛ")).toBe(true);
    expect(isHangul("ㄲ")).toBe(true);
  });

  test("returns false for a non-Hangul character", () => {
    expect(isHangul("z")).toBe(false);
    expect(isHangul("3")).toBe(false);
    expect(isHangul("?")).toBe(false);
  });

  test("returns true after warning if first character is Hangul", () => {
    const input = "하hello";
    expect(isHangul(input)).toBe(true);
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledWith(warnMsg(input[0]));
  });

  test("returns false after warning if first character is non-Hangul", () => {
    const input = "hey헤이";
    expect(isHangul(input)).toBe(false);
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledWith(warnMsg(input[0]));
  });
});
