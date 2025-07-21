import { describe, test, expect, vi } from "vitest";
import { disassemble } from "../disassemble";
import { assemble } from "../assemble";
import { isFirstSyllableReady } from "./isFirstSyllableReady";

const generateKeystrokes = (phrase: string) => {
  return disassemble(phrase)
    .map((v) =>
      typeof v === "object" ? `${v.choseong}${v.jungseong}${v.jongseong}` : v,
    )
    .join("")
    .split("");
};

describe("isFirstSyllableReady", () => {
  test("returns false when second is undefined", () => {
    expect(isFirstSyllableReady("ㄱ")).toBe(false);
  });

  test("returns true when non-Hangul characters appear", () => {
    expect(isFirstSyllableReady("a", "ㄱ")).toBe(true);
    expect(isFirstSyllableReady("가", "a")).toBe(true);
  });

  test("'가나' - first syllable without jongseong", () => {
    const keystrokes = generateKeystrokes("가나");
    const buffer: string[] = [];

    const checkPoints = [
      { index: 0, expected: false }, // ㄱ
      { index: 1, expected: false }, // 가
      { index: 2, expected: false }, // 간
      { index: 3, expected: true }, // 가나 - ready
    ];

    checkPoints.forEach(({ index, expected }) => {
      if (buffer.length <= index) {
        buffer.push(keystrokes[index]);
      }
      const syl = assemble(buffer);
      expect(isFirstSyllableReady(syl[0], syl[1])).toBe(expected);
    });
  });

  test("'각국' - first syllable with jongseong", () => {
    const keystrokes = generateKeystrokes("각국");
    const buffer: string[] = [];

    const checkPoints = [
      { index: 0, expected: false }, // ㄱ
      { index: 1, expected: false }, // 가
      { index: 2, expected: false }, // 각
      { index: 3, expected: true }, // 각ㄱ - ready
      { index: 4, expected: true }, // 각구
      { index: 5, expected: true }, // 각국
    ];

    checkPoints.forEach(({ index, expected }) => {
      if (buffer.length <= index) {
        buffer.push(keystrokes[index]);
      }
      const syl = assemble(buffer);
      expect(isFirstSyllableReady(syl[0], syl[1])).toBe(expected);
    });
  });

  test("'밟고' - double jongseong", () => {
    const keystrokes = generateKeystrokes("밟고");
    const buffer: string[] = [];

    const checkPoints = [
      { index: 0, expected: false }, // ㅂ
      { index: 1, expected: false }, // 바
      { index: 2, expected: false }, // 발
      { index: 3, expected: false }, // 밟
      { index: 4, expected: true }, // 밟ㄱ - 밟 ready
      { index: 5, expected: true }, // 밟고
    ];

    checkPoints.forEach(({ index, expected }) => {
      if (buffer.length <= index) {
        buffer.push(keystrokes[index]);
      }
      const syl = assemble(buffer);
      expect(isFirstSyllableReady(syl[0], syl[1])).toBe(expected);
    });
  });

  test("warns for multi-character input", () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    isFirstSyllableReady("가나", "ㄱ");
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
