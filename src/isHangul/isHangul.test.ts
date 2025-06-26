import {
  describe,
  expect,
  test,
  vi,
  beforeEach,
  afterEach,
  MockInstance,
} from "vitest";
import { isConsonant, isHangul, isVowel } from ".";

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

  test("returns false for Jamo and ExtendedA & B range if opts is not set", () => {
    const jamo1 = "ᄀ"; // copied from Jamo range; 1100
    const jamo2 = "ᄌ"; // copied from Jamo range; 0x110c
    const jamoExtA = "ꥤ"; // copied from ExtendedA; rieul-kiyeok
    const jamoExtB = "ퟐ"; // copied from ExtendedB; TIKEUT-SIOS
    expect(isHangul(jamo1)).toBe(false);
    expect(isHangul(jamo2)).toBe(false);
    expect(isHangul(jamoExtA)).toBe(false);
    expect(isHangul(jamoExtB)).toBe(false);
  });

  test("returns true if opts.[table] is true", () => {
    const jamo1 = "ᄀ"; // copied from Jamo range; 1100
    const jamo2 = "ᄌ"; // copied from Jamo range; 0x110c
    const jamoExtA = "ꥤ"; // copied from ExtendedA; rieul-kiyeok
    const jamoExtB = "ퟐ"; // copied from ExtendedB; TIKEUT-SIOS
    expect(
      isHangul(jamo1, {
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

describe("isConsonant", () => {
  test("returns true if input is Hangul consonant", () => {
    expect(isConsonant("ㄱ")).toBe(true);
    expect(isConsonant("ㄹ")).toBe(true);
    expect(isConsonant("ㅎ")).toBe(true);
    expect(isConsonant("ㄲ")).toBe(true);
    expect(isConsonant("ㅃ")).toBe(true);
    expect(isConsonant("ㄳ")).toBe(true);
    expect(isConsonant("ㄼ")).toBe(true);
    expect(isConsonant("ㄿ")).toBe(true);
  });

  test("returns false if input is old Hangul consonant", () => {
    expect(isConsonant("ㅥ")).toBe(false);
    expect(isConsonant("ㅪ")).toBe(false);
  });

  test("returns false if input is Hangul vowel", () => {
    expect(isConsonant("ㅏ")).toBe(false);
    expect(isConsonant("ㅣ")).toBe(false);
    expect(isConsonant("ㅘ")).toBe(false);
    expect(isConsonant("ㅠ")).toBe(false);
    expect(isConsonant("ㆇ")).toBe(false);
  });

  test("returns false if input is non-Hangul", () => {
    expect(isConsonant("a")).toBe(false);
    expect(isConsonant("3")).toBe(false);
    expect(isConsonant("-")).toBe(false);
    expect(isConsonant("&")).toBe(false);
  });
});

describe("isVowel", () => {
  test("returns true if input is Hangul vowel", () => {
    expect(isVowel("ㅏ")).toBe(true);
    expect(isVowel("ㅣ")).toBe(true);
    expect(isVowel("ㅘ")).toBe(true);
    expect(isVowel("ㅠ")).toBe(true);
  });

  test("returns false if input is old Hangul vowel", () => {
    expect(isVowel("ㆇ")).toBe(false);
    expect(isVowel("ㆉ")).toBe(false);
  });

  test("returns false if input is Hangul consonant", () => {
    expect(isVowel("ㄱ")).toBe(false);
    expect(isVowel("ㄹ")).toBe(false);
    expect(isVowel("ㅎ")).toBe(false);
    expect(isVowel("ㄲ")).toBe(false);
    expect(isVowel("ㅃ")).toBe(false);
    expect(isVowel("ㄳ")).toBe(false);
    expect(isVowel("ㄼ")).toBe(false);
    expect(isVowel("ㄿ")).toBe(false);
  });

  test("returns false if input is non-Hangul", () => {
    expect(isVowel("a")).toBe(false);
    expect(isVowel("3")).toBe(false);
    expect(isVowel("-")).toBe(false);
    expect(isVowel("&")).toBe(false);
  });

  test("tests only for types specified in `opts`", () => {
    const vers = ["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅣ"];
    const hors = ["ㅗ", "ㅛ", "ㅜ", "ㅠ", "ㅡ"];
    const comps = ["ㅘ", "ㅙ", "ㅚ", "ㅝ", "ㅞ", "ㅟ", "ㅢ"];

    // true
    expect(
      isVowel(vers[0], { vertical: true, horizontal: false, compound: false }),
    ).toBe(true);
    expect(
      isVowel(vers[1], { vertical: true, horizontal: false, compound: false }),
    ).toBe(true);
    expect(
      isVowel(hors[0], { vertical: false, horizontal: true, compound: false }),
    ).toBe(true);
    expect(
      isVowel(hors[1], { vertical: false, horizontal: true, compound: false }),
    ).toBe(true);
    expect(
      isVowel(comps[0], { vertical: false, horizontal: false, compound: true }),
    ).toBe(true);
    expect(
      isVowel(comps[1], { vertical: false, horizontal: false, compound: true }),
    ).toBe(true);

    // false
    expect(isVowel(vers[2], { vertical: false })).toBe(false);
    expect(isVowel(vers[3], { vertical: false })).toBe(false);
    expect(isVowel(hors[2], { horizontal: false })).toBe(false);
    expect(isVowel(hors[3], { horizontal: false })).toBe(false);
    expect(isVowel(comps[2], { compound: false })).toBe(false);
    expect(isVowel(comps[3], { compound: false })).toBe(false);

    // false for syllable
    expect(isVowel("한")).toBe(false);
    expect(isVowel("글")).toBe(false);

    // false for non-Hangul
    expect(isVowel("a")).toBe(false);
    expect(isVowel("b")).toBe(false);
    expect(isVowel("1")).toBe(false);
    expect(isVowel("")).toBe(false);
    expect(isVowel(" ")).toBe(false);
  });
});
