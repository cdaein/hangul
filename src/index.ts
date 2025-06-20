import { assemble as eshAssemble } from "es-hangul";
import {
import {
  HANGUL_COMPAT_CONSONANT_END_CHARCODE,
  HANGUL_COMPAT_CONSONANT_START_CHARCODE,
  HANGUL_COMPAT_JAMO_END_CHARCODE,
  HANGUL_COMPAT_JAMO_START_CHARCODE,
  HANGUL_COMPAT_VOWEL_END_CHARCODE,
  HANGUL_COMPAT_VOWEL_START_CHARCODE,
  HANGUL_JAMO_END_CHARCODE,
  HANGUL_JAMO_EXTENDED_A_END_CHARCODE,
  HANGUL_JAMO_EXTENDED_A_START_CHARCODE,
  HANGUL_JAMO_EXTENDED_B_END_CHARCODE,
  HANGUL_JAMO_EXTENDED_B_START_CHARCODE,
  HANGUL_JAMO_START_CHARCODE,
  HANGUL_SYLLABLES_END_CHARCODE,
  HANGUL_SYLLABLES_START_CHARCODE,
} from "./consonants";

/**
 * Assemble input string (in array form).
 * Hangul characters will be assembled into complete syllables. For non-existing combinations, they will be returned as individual jaso elements. Non-Hangul characters are returned as is.
 *
 * @param strArr - string (in array form) to assemble
 *
 * @example
 * ```ts
 * assemble(["ㅁ", "ㅗ", "ㅏ", "ㄹ", "ㄱ"]) // "뫍"
 * assemble(["ㅂ", "ㅂ", "ㅏ"]) // "ㅂ바"
 * assemble(["ㅁ", "ㅣ", "ㅋ", "ㅣ", "17"]) // "미키17"
 * assemble(["미키", "17"]) // "미키17"
 * ```
 */
export const assemble = (strArr: string[]) => {
  const str = strArr.join("");
  const result = [];
  let i = 0;

  // collect consecutive Hangul chars until it sees non-Hangul char
  while (i < str.length) {
    const ch = str[i];
    if (isHangul(ch)) {
      // Collect consecutive Hangul characters
      const hangulChars = [ch];
      let j = i + 1;

      while (j < str.length && isHangul(str[j])) {
        hangulChars.push(str[j]);
        j++;
      }
      // Assemble the consecutive Hangul characters
      result.push(eshAssemble(hangulChars));
      i = j; // Move index to after the Hangul sequence
    } else {
      // Pass non-Hangul characters as is
      result.push(ch);
      i++;
    }
  }

  return result.join("");
};

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

const isHangulSyllable = (ch: string) => {
  const code = ch.charCodeAt(0);
  return (
    code >= HANGUL_SYLLABLES_START_CHARCODE &&
    code <= HANGUL_SYLLABLES_END_CHARCODE
  );
};

const isHangulJamo = (ch: string) => {
  const code = ch.charCodeAt(0);
  return code >= HANGUL_JAMO_START_CHARCODE && code <= HANGUL_JAMO_END_CHARCODE;
};

const isHangulCompatJamo = (ch: string) => {
  const code = ch.charCodeAt(0);
  return (
    code >= HANGUL_COMPAT_JAMO_START_CHARCODE &&
    code <= HANGUL_COMPAT_JAMO_END_CHARCODE
  );
};

const isHangulJamoExtendedA = (ch: string) => {
  const code = ch.charCodeAt(0);
  return (
    code >= HANGUL_JAMO_EXTENDED_A_START_CHARCODE &&
    code <= HANGUL_JAMO_EXTENDED_A_END_CHARCODE
  );
};

const isHangulJamoExtendedB = (ch: string) => {
  const code = ch.charCodeAt(0);
  return (
    code >= HANGUL_JAMO_EXTENDED_B_START_CHARCODE &&
    code <= HANGUL_JAMO_EXTENDED_B_END_CHARCODE
  );
};

  if (ch.length > 1) {
    console.warn(`Only the first character ("${ch[0]}") will be processed.`);
    ch = ch[0];
  }
  return /[\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uAC00-\uD7AF\uD7B0-\uD7FF]/.test(
    ch,
  );
};
