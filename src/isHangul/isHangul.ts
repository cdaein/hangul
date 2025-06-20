import {
  HANGUL_SYLLABLES_START_CHARCODE,
  HANGUL_SYLLABLES_END_CHARCODE,
  HANGUL_JAMO_START_CHARCODE,
  HANGUL_JAMO_END_CHARCODE,
  HANGUL_COMPAT_JAMO_START_CHARCODE,
  HANGUL_COMPAT_JAMO_END_CHARCODE,
  HANGUL_JAMO_EXTENDED_A_START_CHARCODE,
  HANGUL_JAMO_EXTENDED_A_END_CHARCODE,
  HANGUL_JAMO_EXTENDED_B_START_CHARCODE,
  HANGUL_JAMO_EXTENDED_B_END_CHARCODE,
} from "../consonants";

/**
 * Takes in a single character and determine if it's hangul or not
 * It compares with Hangul [Unicode chart](https://www.unicode.org/charts/).
 * Hangul Syllables, Jamo, Jamo Extended-A and Jamo Extended-B ranges are checked.
 * Halfwidth jamo range is not checked.
 *
 * @param ch - a single character to check
 */
export const isHangul = (ch: string) => {
  if (ch.length > 1) {
    console.warn(`Only the first character ("${ch[0]}") will be processed.`);
    ch = ch[0];
  }

  return (
    isHangulSyllable(ch) ||
    isHangulJamo(ch) ||
    isHangulCompatJamo(ch) ||
    isHangulJamoExtendedA(ch) ||
    isHangulJamoExtendedB(ch)
  );
};

export const isHangulSyllable = (ch: string) => {
  const code = ch.charCodeAt(0);
  return (
    code >= HANGUL_SYLLABLES_START_CHARCODE &&
    code <= HANGUL_SYLLABLES_END_CHARCODE
  );
};

export const isHangulJamo = (ch: string) => {
  const code = ch.charCodeAt(0);
  return code >= HANGUL_JAMO_START_CHARCODE && code <= HANGUL_JAMO_END_CHARCODE;
};

export const isHangulCompatJamo = (ch: string) => {
  const code = ch.charCodeAt(0);
  return (
    code >= HANGUL_COMPAT_JAMO_START_CHARCODE &&
    code <= HANGUL_COMPAT_JAMO_END_CHARCODE
  );
};

export const isHangulJamoExtendedA = (ch: string) => {
  const code = ch.charCodeAt(0);
  return (
    code >= HANGUL_JAMO_EXTENDED_A_START_CHARCODE &&
    code <= HANGUL_JAMO_EXTENDED_A_END_CHARCODE
  );
};

export const isHangulJamoExtendedB = (ch: string) => {
  const code = ch.charCodeAt(0);
  return (
    code >= HANGUL_JAMO_EXTENDED_B_START_CHARCODE &&
    code <= HANGUL_JAMO_EXTENDED_B_END_CHARCODE
  );
};
