import { describe, it, expect, vi } from "vitest";
import { HangulSyllable } from "./hangul-syllable";

describe("HangulSyllable", () => {
  it("disassembles into correct Hangul components", () => {
    {
      const syllable = new HangulSyllable("ㅃ");
      expect(syllable.getDisassembled()).toEqual({
        choseong: "ㅃ",
        jungseong: "",
        jongseong: "",
      });
    }
    {
      const syllable = new HangulSyllable("ㅞ");
      expect(syllable.getDisassembled()).toEqual({
        choseong: "",
        jungseong: "ㅜㅔ",
        jongseong: "",
      });
    }
    {
      const syllable = new HangulSyllable("가");
      expect(syllable.getDisassembled()).toEqual({
        choseong: "ㄱ",
        jungseong: "ㅏ",
        jongseong: "",
      });
    }
    {
      const syllable = new HangulSyllable("꼬");
      expect(syllable.getDisassembled()).toEqual({
        choseong: "ㄲ",
        jungseong: "ㅗ",
        jongseong: "",
      });
    }
    {
      const syllable = new HangulSyllable("괘");
      expect(syllable.getDisassembled()).toEqual({
        choseong: "ㄱ",
        jungseong: "ㅗㅐ",
        jongseong: "",
      });
    }
    {
      const syllable = new HangulSyllable("밝");
      expect(syllable.getDisassembled()).toEqual({
        choseong: "ㅂ",
        jungseong: "ㅏ",
        jongseong: "ㄹㄱ",
      });
    }
    {
      const syllable = new HangulSyllable("쐴");
      expect(syllable.getDisassembled()).toEqual({
        choseong: "ㅆ",
        jungseong: "ㅗㅣ",
        jongseong: "ㄹ",
      });
    }
    {
      const syllable = new HangulSyllable("쐱");
      expect(syllable.getDisassembled()).toEqual({
        choseong: "ㅆ",
        jungseong: "ㅗㅣ",
        jongseong: "ㄴㅈ",
      });
    }
  });

  it("warns if non-Hangul character is passed", () => {
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const char = "A";
    new HangulSyllable(char);
    expect(spy).toHaveBeenCalledWith(
      `It may be a mistake to store "${char}" in HangulSyllable object`,
    );
    spy.mockRestore();
  });

  it("setId()) sets the ID correctly", () => {
    const syllable = new HangulSyllable("가");
    syllable.setId(42);
    expect(syllable.id).toBe(42);
  });

  it("clone() returns a new identical object", () => {
    const s = new HangulSyllable("깖");
    const clone = s.clone();
    expect(clone).not.toBe(s);
    expect(clone.char).toBe(s.char);
    expect(clone.getDisassembled()).toEqual(s.getDisassembled());
  });

  it("isEmpty() returns true for empty components with warning", () => {
    const s = new HangulSyllable("");
    expect(s.isEmpty()).toBe(true);
  });

  it("hasComponent() returns true if any component exists", () => {
    {
      const s = new HangulSyllable("깖");
      expect(s.hasComponent()).toBe(true);
    }
    {
      const s = new HangulSyllable("ㅚ");
      expect(s.hasComponent()).toBe(true);
    }
    {
      const s = new HangulSyllable("ㅁ");
      expect(s.hasComponent()).toBe(true);
    }
  });

  it("hasChoseong(), Jungseong(), Jongseong() return correct values", () => {
    {
      const s = new HangulSyllable("깖");
      expect(s.hasChoseong()).toBe(true);
      expect(s.hasJungseong()).toBe(true);
      expect(s.hasJongseong()).toBe(true);
    }
    {
      const s = new HangulSyllable("꽈");
      expect(s.hasChoseong()).toBe(true);
      expect(s.hasJungseong()).toBe(true);
      expect(s.hasJongseong()).toBe(false);
    }
    {
      const s = new HangulSyllable("ㅟ");
      expect(s.hasChoseong()).toBe(false);
      expect(s.hasJungseong()).toBe(true);
      expect(s.hasJongseong()).toBe(false);
    }
  });

  it("removeSingleComponent() removes jongseong, then jungseong, then choseong", () => {
    {
      const s = new HangulSyllable("깖");
      s.removeSingleComponent();
      expect(s.char).toBe("깔");
      s.removeSingleComponent();
      expect(s.char).toBe("까");
      s.removeSingleComponent();
      expect(s.char).toBe("ㄲ");
      s.removeSingleComponent();
      expect(s.char).toBe("");
    }
    {
      const s = new HangulSyllable("뽥");
      s.removeSingleComponent();
      expect(s.char).toBe("뽤");
      s.removeSingleComponent();
      expect(s.char).toBe("뽜");
      s.removeSingleComponent();
      expect(s.char).toBe("뽀");
      s.removeSingleComponent();
      expect(s.char).toBe("ㅃ");
      s.removeSingleComponent();
      expect(s.char).toBe("");
    }
  });

  it("removeSingleJongseong() removes only jongseong", () => {
    const s = new HangulSyllable("깖");
    s.removeSingleJongseong();
    expect(s.char).toBe("깔");
    s.removeSingleJongseong();
    expect(s.char).toBe("까");
    s.removeSingleJongseong();
    expect(s.char).toBe("까");
  });

  it("updateSyllable() updates the internal state correctly", () => {
    const s = new HangulSyllable("가");
    expect(s.char).toBe("가");
    s.updateSyllable("깖");
    expect(s.char).toBe("깖");
    expect(s.getDisassembled()).toEqual({
      choseong: "ㄲ",
      jungseong: "ㅏ",
      jongseong: "ㄹㅁ",
    });
  });

  it("getDisassembled() returns the correct components as an object", () => {
    const s = new HangulSyllable("깖");
    expect(s.getDisassembled()).toEqual({
      choseong: "ㄲ",
      jungseong: "ㅏ",
      jongseong: "ㄹㅁ",
    });
  });

  it("getDisassembledStringArray() returns components as array", () => {
    const s = new HangulSyllable("깖");
    expect(s.getDisassembledStringArray()).toEqual(["ㄲ", "ㅏ", "ㄹㅁ"]);
  });

  it("getDisassembledString() returns components as flattened string", () => {
    {
      const s = new HangulSyllable("깖");
      expect(s.getDisassembledString()).toEqual("ㄲㅏㄹㅁ");
    }
    {
      const s = new HangulSyllable("밟");
      expect(s.getDisassembledString()).toEqual("ㅂㅏㄹㅂ");
    }
    {
      const s = new HangulSyllable("솹");
      expect(s.getDisassembledString()).toEqual("ㅅㅗㅏㅂ");
    }
  });
});
