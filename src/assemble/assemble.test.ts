import { assemble } from ".";
import { describe, test, expect } from "vitest";

describe("assemble()", () => {
  test("returns an empty string if empty string is given", () => {
    expect(assemble(Array.from(""))).toEqual("");
  });

  test("returns an empty string filled with spaces if that is what's given", () => {
    expect(assemble(Array.from("    "))).toEqual("    ");
  });

  test("assembles multiple Hangul jaso combinations", () => {
    expect(assemble(["ㅁ", "ㅗ", "ㅏ", "ㄹ", "ㄱ"])).toBe("뫍");
    expect(assemble(["ㄱ", "ㅗ", "ㅏ"])).toBe("과");
    expect(assemble(["목", "ㅅ", "ㅗ", "ㄹ", "ㅣ"])).toBe("목소리");
  });

  test("returns individual jaso if they cannot be assembled", () => {
    expect(assemble(["ㅁ", "ㅁ", "ㅏ"])).toBe("ㅁ마");
    expect(assemble(["ㅁ", "ㅜ", "ㄹ", "ㄷ"])).toBe("물ㄷ");
    expect(assemble(["ㅂ", "ㅂ", "ㅏ"])).toBe("ㅂ바");
  });

  test("returns non-Hangul as is", () => {
    expect(assemble(["a", "b", "c"])).toBe("abc");
    expect(assemble(["a", ":", "b", "ㅈ", "c"])).toBe("a:bㅈc");
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

  test("handles a case with no choseong", () => {
    expect(assemble(["ㅗ", "ㅏ"])).toBe("ㅘ");
    expect(assemble(["ㅜ", "ㅔ"])).toBe("ㅞ");
    expect(assemble(["ㅛ", "ㅇ"])).toBe("ㅛㅇ");
    expect(assemble(["ㅣ", "ㅂ"])).toBe("ㅣㅂ");
    expect(assemble(["ㅏ", "ㅗ", "ㅂ"])).toBe("ㅏㅗㅂ");
    // edge cases:
    expect(assemble(["ㅎ", "a", "ㅜ", "ㅣ", "ㅂ"])).toBe("ㅎaㅟㅂ");
    expect(assemble(["ㅜ", "ㅣ", "ㅂ"])).toBe("ㅟㅂ");
    expect(assemble(["ㅜ", "ㅣ", " ", "ㅂ"])).toBe("ㅟ ㅂ");
    expect(assemble(["ㅜ", "ㅣ", "ㅜ", "ㅣ"])).toBe("ㅟㅟ");
    expect(assemble(["ㅜ", "ㅣ", " ", "ㅜ", "ㅣ"])).toBe("ㅟ ㅟ");
    expect(assemble(["ㅜ", "ㅣ", "ㅇ", "ㅗ"])).toBe("ㅟ오");
    expect(assemble(["ㅜ", "ㅣ", "ㅇ", "ㅗ", "ㅅ"])).toBe("ㅟ옷");
    expect(assemble(["ㅜ", "ㅣ", "ㅇ", "ㅗ", "ㅅ", "ㅅ"])).toBe("ㅟ옷ㅅ");
    expect(assemble(["ㅜ", "ㅣ", "ㅇ", "ㅗ", "ㅅ", "ㅓ"])).toBe("ㅟ오서");
    expect(assemble(["ㅜ", "ㅜ", "ㅣ", "ㅇ", "ㅗ"])).toBe("ㅜㅟ오");
    expect(assemble(["ㅜ", "ㄴ", "ㅜ", "ㅒ", "ㅇ", "ㅗ"])).toBe("ㅜ누ㅒ오");
    expect(assemble(["ㅈ", "ㅕ", "ㅛ", "ㅇ"])).toBe("져ㅛㅇ");
    expect(assemble(["ㅟㅂ"])).toBe("ㅟㅂ");
  });
});
