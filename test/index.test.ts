import {
  describe,
  expect,
  test,
  vi,
  beforeEach,
  afterEach,
  MockInstance,
} from "vitest";
import { isJaOrMo } from "../src";

/*
describe("disassemble()", () => {
  test("handles a single or multiple Hangul syllable(s)", () => {
    expect(disassemble("꺾")).toEqual([
      {
        choseong: "ㄲ",
        jungseong: "ㅓ",
        jongseong: "ㄲ",
      },
    ]);
    expect(disassemble("봛")).toEqual([
      {
        choseong: "ㅂ",
        jungseong: "ㅗㅏ",
        jongseong: "ㄹㅂ",
      },
    ]);
    expect(disassemble("마요")).toEqual([
      {
        choseong: "ㅁ",
        jungseong: "ㅏ",
        jongseong: "",
      },
      {
        choseong: "ㅇ",
        jungseong: "ㅛ",
        jongseong: "",
      },
    ]);
  });

  test("handles a single or multiple Hangul jaso(s)", () => {
    expect(disassemble("ㅁ")).toEqual([
      { choseong: "ㅁ", jungseong: "", jongseong: "" },
    ]);
    expect(disassemble("ㅗㄱ")).toEqual([
      { choseong: "", jungseong: "ㅗ", jongseong: "" },
      { choseong: "ㄱ", jungseong: "", jongseong: "" },
    ]);
    expect(disassemble("목ㅗㅏㄱ")).toEqual([
      { choseong: "ㅁ", jungseong: "ㅗ", jongseong: "ㄱ" },
      { choseong: "", jungseong: "ㅗ", jongseong: "" },
      { choseong: "", jungseong: "ㅏ", jongseong: "" },
      { choseong: "ㄱ", jungseong: "", jongseong: "" },
    ]);
    expect(disassemble("몫")).toEqual([
      { choseong: "ㅁ", jungseong: "ㅗ", jongseong: "ㄱㅅ" },
    ]);
    expect(disassemble("목ㅅㅗㄹㅣ")).toEqual([
      { choseong: "ㅁ", jungseong: "ㅗ", jongseong: "ㄱ" },
      { choseong: "ㅅ", jungseong: "", jongseong: "" },
      { choseong: "", jungseong: "ㅗ", jongseong: "" },
      { choseong: "ㄹ", jungseong: "", jongseong: "" },
      { choseong: "", jungseong: "ㅣ", jongseong: "" },
    ]);
    expect(disassemble("꽈왤")).toEqual([
      { choseong: "ㄲ", jungseong: "ㅗㅏ", jongseong: "" },
      { choseong: "ㅇ", jungseong: "ㅗㅐ", jongseong: "ㄹ" },
    ]);
  });

  test("handles non-Hangul mixed string", () => {
    expect(disassemble("와yo")).toEqual([
      { choseong: "ㅇ", jungseong: "ㅗㅏ", jongseong: "" },
      "y",
      "o",
    ]);
    expect(disassemble("가-ab 12")).toEqual([
      { choseong: "ㄱ", jungseong: "ㅏ", jongseong: "" },
      "-",
      "a",
      "b",
      " ",
      "1",
      "2",
    ]);
  });

  // FIX: doesn't disassemble (es-hangul)
  test("disassembles complex choseong(initial consonant)", () => {
    expect(disassemble("ㄳ")).toEqual([
      { choseong: "ㄱㅅ", jungseong: "", jongseong: "" },
    ]);
  });

  test("disassembles complex jungseong(median vowel)", () => {
    expect(disassemble("ㅟ")).toEqual([
      { choseong: "", jungseong: "ㅜㅣ", jongseong: "" },
    ]);
    expect(disassemble("ㅞㅘ")).toEqual([
      { choseong: "", jungseong: "ㅜㅔ", jongseong: "" },
      { choseong: "", jungseong: "ㅗㅏ", jongseong: "" },
    ]);
  });

  // FIX: doesn't disassemble (es-hangul), and is not a jongseong
  test("disassembles complex jongseong(final consonant)", () => {
    expect(disassemble("ᆰ")).toEqual([
      { choseong: "ㄹㄱ", jungseong: "", jongseong: "" },
    ]);

    expect(disassemble("ᆹ")).toEqual([
      { choseong: "ㅂㅅ", jungseong: "", jongseong: "" },
    ]);
  });
});
*/

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
    //
  });
  test('returns "ja" after warning if first character is consonant', () => {
    const input = "ㅎhello";
    expect(isJaOrMo(input)).toBe("ja");
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledWith(warnMsg(input[0]));
  });

  test('returns "mo" for vowel', () => {
    //
  });
  test('returns "mo" after warning if first character is vowel', () => {
    const input = "ㅟhello";
    expect(isJaOrMo(input)).toBe("mo");
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledWith(warnMsg(input[0]));
  });

  test('returns "syllable" for full Hangul syllable', () => {
    //
  });

  test('returns "other" for non-Hangul', () => {
    //
  });
});
