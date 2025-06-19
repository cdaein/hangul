import {
  describe,
  expect,
  test,
  vi,
  beforeEach,
  afterEach,
  MockInstance,
} from "vitest";
import { assemble, isHangul } from "../src";

describe("assemble()", () => {
  test("assembles multiple Hangul jaso combinations", () => {
    expect(assemble(["ㅁ", "ㅗ", "ㅏ", "ㄹ", "ㄱ"])).toBe("뫍");
    expect(assemble(["ㄱ", "ㅗ", "ㅏ"])).toBe("과");
  });

  test("returns individual jaso if they cannot be assembled", () => {
    expect(assemble(["ㅁ", "ㅁ", "ㅏ"])).toBe("ㅁ마");
    expect(assemble(["ㅁ", "ㅜ", "ㄹ", "ㄷ"])).toBe("물ㄷ");
    expect(assemble(["ㅂ", "ㅂ", "ㅏ"])).toBe("ㅂ바");
  });

  test("returns non-Hangul as is", () => {
    expect(assemble(["a", "모", "ㅁ"])).toBe("a몸");
    expect(assemble(["ㅁ", "ㅣ", "ㅋ", "ㅣ", "17"])).toBe("미키17");
  });

  test("returns space, empty string and punctuations as is", () => {
    expect(assemble(["ㅎ", "ㅏ", " ", "하"])).toBe("하 하");
    expect(assemble(["ㅁ", "ㅏ", "!", "?"])).toBe("마!?");
    expect(assemble(["ㅁ", "ㅏ", "", "?"])).toBe("마?");
  });

  test("handles multiple characters in an array element", () => {
    expect(assemble(["학교", " ", "가자", "!"])).toBe("학교 가자!");
    expect(assemble(["java", " ", "script", "좋아 "])).toBe("java script좋아 ");
    expect(assemble(["ㅁ", "ㅏ", "   ", "?"])).toBe("마   ?");
  });
});

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
