import {
  describe,
  MockInstance,
  beforeEach,
  vi,
  afterEach,
  test,
  expect,
} from "vitest";
import { isJaOrMo } from "./isJaOrMo";

describe("isJaOrMo()", () => {
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

  test('returns "ja" for consonant', () => {
    expect(isJaOrMo("ㅂ")).toBe("ja");
    expect(isJaOrMo("ㄲ")).toBe("ja");
    expect(isJaOrMo("ㄳ")).toBe("ja");
  });

  test('returns "ja" after warning if first character is consonant', () => {
    const input = "ㅎhello";
    expect(isJaOrMo(input)).toBe("ja");
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledWith(warnMsg(input[0]));
  });

  test('returns "mo" for vowel', () => {
    expect(isJaOrMo("ㅗ")).toBe("mo");
    expect(isJaOrMo("ㅞ")).toBe("mo");
  });

  test('returns "mo" after warning if first character is vowel', () => {
    const input = "ㅟhello";
    expect(isJaOrMo(input)).toBe("mo");
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledWith(warnMsg(input[0]));
  });

  test('returns "syllable" for full Hangul syllable', () => {
    expect(isJaOrMo("한")).toBe("syllable");
    expect(isJaOrMo("뷃")).toBe("syllable");
  });

  test('returns "other" for non-Hangul', () => {
    expect(isJaOrMo("a")).toBe("other");
    expect(isJaOrMo(" ")).toBe("other");
    expect(isJaOrMo("$")).toBe("other");
  });
});
