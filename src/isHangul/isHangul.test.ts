import {
  describe,
  expect,
  test,
  vi,
  beforeEach,
  afterEach,
  MockInstance,
} from "vitest";
import { isHangul } from ".";

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

  test("returns true for a compatibility jamo character", () => {
    const compatJamo = "ㄳ"; // from compat jamo table
    const compatJamo2 = "ㄼ";
    expect(isHangul(compatJamo)).toBe(true);
    expect(isHangul(compatJamo2)).toBe(true);
  });

  test("returns true if opts.[table] is true", () => {
    const jamo1 = "ᄀ"; // copied from Jamo range; 1100
    const jamo2 = "ᄌ"; // copied from Jamo range; 0x110c
    const jamoExtA = "ꥤ"; // copied from ExtendedA; rieul-kiyeok
    const jamoExtB = "ퟐ"; // copied from ExtendedB; TIKEUT-SIOS
    expect(
      isHangul(jamo1, {
        compatJamo: false,
        jamo: true,
      }),
    ).toBe(true);
    expect(
      isHangul(jamo2, {
        compatJamo: false,
        jamo: true,
      }),
    ).toBe(true);
    expect(
      isHangul(jamoExtA, {
        jamoExtendedA: true,
      }),
    ).toBe(true);
    expect(
      isHangul(jamoExtB, {
        jamoExtendedB: true,
      }),
    ).toBe(true);
  });

  test("returns false if opts.[table] is false", () => {
    const compatJamo1 = "ㄳ";
    const compatJamo2 = "ㄼ";
    const syllable1 = "봷";
    const syllable2 = "꿿";
    expect(
      isHangul(compatJamo1, {
        compatJamo: false,
      }),
    ).toBe(false);
    expect(
      isHangul(compatJamo2, {
        compatJamo: false,
      }),
    ).toBe(false);
    expect(
      isHangul(syllable1, {
        syllable: false,
      }),
    ).toBe(false);
    expect(
      isHangul(syllable2, {
        syllable: false,
      }),
    ).toBe(false);
  });
});
