import {
  disassemble as eshDisassemble,
  disassembleCompleteCharacter,
} from "es-hangul";
import { isHangul } from "../isHangul";
import { isJaOrMo } from "../isJaOrMo";

export interface DisassembledCharacter {
  choseong: string;
  jungseong: string;
  jongseong: string;
}

/**
 * Disassemble Hangul syllable(s) into inital(choseong), medial(jungseong), and final(jongseong).
 * If input string is not a full Hangul syllable, it will be returned as either choseong(consonant) or jungseong(vowel).
 * It cannot disassemble Hangul characters from Jamo, Jamo Extended A & B ranges. They will be returned as is.
 * This is due to the current reliance on `es-hangul`, which does not disassemble Jamo range.
 * Non-Hangul characters will be returned as is.
 *
 * @param str - string to disassemble
 *
 * @example
 * ```ts
 * disassemble("ㅁ") // [{ choseong: "ㅁ", jungseong: "", jongseong: "" }]
 * disassemble("ㅗ")) // [{ choseong: "", jungseong: "ㅗ", jongseong: "" }]
 * disassemble("몫") // [{ choseong: "ㅁ", jungseong: "ㅗ", jongseong: "ㄱㅅ" }]
 * disassemble("꽈") // [{ choseong: "ㄲ", jungseong: "ㅗㅏ", jongseong: "" }]
 * disassemble("와yo") // [{ choseong: "ㅇ", jungseong: "ㅗㅏ", jongseong: "" }, "y", "o"]
 * ```
 */
export const disassemble = (
  str: string,
  // opts = {
  //   completeOnly: false,
  // },
): (string | DisassembledCharacter)[] => {
  return Array.from(str).map((ch) => {
    // 1. non-Hangul - return as is
    if (!isHangul(ch)) {
      return ch;
    }

    const disassembled = disassembleCompleteCharacter(ch) as
      | DisassembledCharacter
      | undefined;

    if (disassembled) {
      // 2. complete Hangul syllable - break into cho-, jung-, jongseong
      return disassembled;
    } else {
      // 3. Hangul jaso
      const jamo = isJaOrMo(ch);
      if (jamo === "ja") {
        // All ja is treated as choseong, not jongseong
        return {
          // disassemble for consonants such as "ㄳ"
          choseong: eshDisassemble(ch),
          jungseong: "",
          jongseong: "",
        };
      } else if (jamo === "mo") {
        return {
          choseong: "",
          jungseong: eshDisassemble(ch),
          jongseong: "",
        };
      }
    }

    return ch;
  });
};
