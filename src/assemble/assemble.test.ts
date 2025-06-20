import { assemble } from "./assemble";
import { describe, test, expect } from "vitest";

describe("assemble()", () => {
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
