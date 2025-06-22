import { disassemble } from ".";
import { describe, expect, test } from "vitest";

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

  test("disassembles complex jongseong(final consonant)", () => {
    expect(disassemble("ㄼ")).toEqual([
      { choseong: "ㄹㅂ", jungseong: "", jongseong: "" },
    ]);
    expect(disassemble("ㄶ")).toEqual([
      { choseong: "ㄴㅎ", jungseong: "", jongseong: "" },
    ]);
  });

  // NOTE: disassemble() uses es-hangul which cannot disassemble Jamo range.
  test("returns Jamo range characters as is. It does not know how to disassemble", () => {
    expect(disassemble("ᄚ")).toEqual(["ᄚ"]); // 0x111A; RIEUL-HIEUH
  });
});
