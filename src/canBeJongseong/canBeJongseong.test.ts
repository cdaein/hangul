import { describe, expect, test } from "vitest";
import { canBeJongseong } from ".";

describe("canBeJongseong()", () => {
  // REVIEW: this is from es-hangul.canBeJongseong(). does this behavior work for me?
  test("returns true for an empty string (=no Jongseong)", () => {
    expect(canBeJongseong("")).toBe(true);
  });

  test("returns false for complete syllable", () => {
    expect(canBeJongseong("한")).toBe(false);
    expect(canBeJongseong("글")).toBe(false);
  });

  test("returns false for jungseong (vowels)", () => {
    expect(canBeJongseong("ㅗ")).toBe(false);
    expect(canBeJongseong("ㅟ")).toBe(false);
  });

  test("returns false for combination of jongseong and others", () => {
    expect(canBeJongseong("ㅁㅗ")).toBe(false);
    expect(canBeJongseong("ㄹㄱㅏ")).toBe(false);
    expect(canBeJongseong("ㄹ가")).toBe(false);
  });

  test("returns true for valid single Jongseong", () => {
    expect(canBeJongseong("ㅁ")).toBe(true);
    expect(canBeJongseong("ㅎ")).toBe(true);
    expect(canBeJongseong("ㅆ")).toBe(true);
    expect(canBeJongseong("ㄲ")).toBe(true);
  });

  test("returns true for valid double Jongseong", () => {
    expect(canBeJongseong("ㅂㅅ")).toBe(true);
    expect(canBeJongseong("ㄹㄱ")).toBe(true);
    expect(canBeJongseong("ㄴㅈ")).toBe(true);
  });

  test("returns false for invalid double Jongseong", () => {
    expect(canBeJongseong("ㄱㄱ")).toBe(false);
    expect(canBeJongseong("ㅅㄱ")).toBe(false);
    expect(canBeJongseong("ㅅㅎ")).toBe(false);
  });
});
