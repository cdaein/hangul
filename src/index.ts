import {
  disassembleCompleteCharacter,
  assemble as eshAssemble,
  disassemble as eshDisassemble,
} from "es-hangul";
import {
  HANGUL_COMPAT_CONSONANT_END_CHARCODE,
  HANGUL_COMPAT_CONSONANT_START_CHARCODE,
  HANGUL_COMPAT_VOWEL_END_CHARCODE,
  HANGUL_COMPAT_VOWEL_START_CHARCODE,
  HANGUL_JAMO_FINAL_CONSONANT_START_CHARCODE,
  HANGUL_JAMO_INITIAL_CONSONANT_START_CHARCODE,
  HANGUL_JAMO_OLD_FINAL_CONSONANT_END_CHARCODE,
  HANGUL_JAMO_OLD_INITIAL_CONSONANT_END_CHARCODE,
  HANGUL_JAMO_OLD_VOWEL_END_CHARCODE,
  HANGUL_JAMO_VOWEL_START_CHARCODE,
} from "./consonants";
import {
  isHangul,
  isHangulCompatJamo,
  isHangulJamo,
  isHangulSyllable,
} from "./isHangul/isHangul";

export interface DisassembledCharacter {
  choseong: string;
  jungseong: string;
  jongseong: string;
}

/**
 * Disassemble Hangul syllable(s) into inital(choseong), medial(jungseong), and final(jongseong).
 * If input string is not a full Hangul syllable, it will be returned as either choseong(consonant) or jungseong(vowel).
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
      // FIX: disassemble complex ja(ㅅ타벇) or mo(ㅟ)
      if (jamo === "ja") {
        // if jaum, consider it as choseong
        return {
          choseong: ch,
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

/**
 * Given a Hangul character, check if it is a consonant(`"ja"`) or vowel(`"mo"`).
 * A full Hangul syllable returns `"syllable"`. If non-Hanul, returns `"other"`
 *
 * @param ch - a character to test
 */
export const isJaOrMo = (ch: string) => {
  if (ch.length > 1) {
    console.warn(`Only the first character ("${ch[0]}") will be processed.`);
    ch = ch[0];
  }

  const code = ch.charCodeAt(0);

  if (isHangulJamo(ch)) {
    if (
      (code >= HANGUL_JAMO_INITIAL_CONSONANT_START_CHARCODE &&
        code <= HANGUL_JAMO_OLD_INITIAL_CONSONANT_END_CHARCODE) ||
      (code >= HANGUL_JAMO_FINAL_CONSONANT_START_CHARCODE &&
        code <= HANGUL_JAMO_OLD_FINAL_CONSONANT_END_CHARCODE)
    ) {
      return "ja";
    }
    if (
      code >= HANGUL_JAMO_VOWEL_START_CHARCODE &&
      code <= HANGUL_JAMO_OLD_VOWEL_END_CHARCODE
    ) {
      return "mo";
    }
  }

  if (isHangulCompatJamo(ch)) {
    if (
      code >= HANGUL_COMPAT_CONSONANT_START_CHARCODE &&
      code <= HANGUL_COMPAT_CONSONANT_END_CHARCODE
    ) {
      return "ja";
    }
    if (
      code >= HANGUL_COMPAT_VOWEL_START_CHARCODE &&
      code <= HANGUL_COMPAT_VOWEL_END_CHARCODE
    ) {
      return "mo";
    }
  }

  if (isHangulSyllable(ch)) {
    return "syllable";
  }

  // Not a Hangul Jamo consonant or vowel
  return "other";
};
