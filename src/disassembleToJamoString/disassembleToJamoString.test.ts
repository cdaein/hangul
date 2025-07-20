import { describe, expect, it } from "vitest";
import { disassembleToJamoString } from ".";

describe("disassembleToJamoString()", () => {
  it("works with no jongseong phrase", () => {
    expect(disassembleToJamoString("가나")).toBe("ㄱㅏㄴㅏ");
  });

  it("works with already disassembled phrase", () => {
    expect(disassembleToJamoString("ㅗㅜ아")).toBe("ㅗㅜㅇㅏ");
  });

  it("works with single jongseong phrase", () => {
    expect(disassembleToJamoString("발부")).toBe("ㅂㅏㄹㅂㅜ");
  });

  it("works with multi jongseong phrase", () => {
    expect(disassembleToJamoString("밟아")).toBe("ㅂㅏㄹㅂㅇㅏ");
  });

  it("works with diphthong vowel phrase", () => {
    expect(disassembleToJamoString("외워")).toBe("ㅇㅗㅣㅇㅜㅓ");
  });

  it("works with no choseong phrase", () => {
    expect(disassembleToJamoString("ㅝ")).toBe("ㅜㅓ");
    expect(disassembleToJamoString("ㅘㅇ")).toBe("ㅗㅏㅇ");
  });

  it("returns non-Hanul as is", () => {
    expect(disassembleToJamoString("a")).toBe("a");
    expect(disassembleToJamoString("abc")).toBe("abc");
  });

  it("works when input is mixed hangul and non-Hangul", () => {
    expect(disassembleToJamoString("한a")).toBe("ㅎㅏㄴa");
    expect(disassembleToJamoString("밟abc아")).toBe("ㅂㅏㄹㅂabcㅇㅏ");
    expect(disassembleToJamoString("밟아!!?")).toBe("ㅂㅏㄹㅂㅇㅏ!!?");
  });
});
