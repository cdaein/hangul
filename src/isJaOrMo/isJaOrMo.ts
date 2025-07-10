import {
  HANGUL_JAMO_INITIAL_CONSONANT_START_CHARCODE,
  HANGUL_JAMO_OLD_INITIAL_CONSONANT_END_CHARCODE,
  HANGUL_JAMO_FINAL_CONSONANT_START_CHARCODE,
  HANGUL_JAMO_OLD_FINAL_CONSONANT_END_CHARCODE,
  HANGUL_JAMO_VOWEL_START_CHARCODE,
  HANGUL_JAMO_OLD_VOWEL_END_CHARCODE,
  HANGUL_COMPAT_CONSONANT_START_CHARCODE,
  HANGUL_COMPAT_CONSONANT_END_CHARCODE,
  HANGUL_COMPAT_VOWEL_START_CHARCODE,
  HANGUL_COMPAT_VOWEL_END_CHARCODE,
} from "../consonants";
import {
  isHangulJamo,
  isHangulCompatJamo,
  isHangulSyllable,
} from "../isHangul";

// TODO: check for extended jamo ranges

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
