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
 * It compares with Hangul [Unicode charts](https://www.unicode.org/charts/).
 * By default, Hangul Compatibility Jamo and Syllables ranges are checked as these are the most common user inputs.
 * To include other ranges such as Jamo, JamoExtendedA or JamoExtendedB, use the `opts` object to set the flags.
 * Halfwidth jamo range is not included.
 *
 * @param ch - a single character to check
 * @param opts - Optional object to set which Unicode ranges to check.
 * @param opts.jamo - default: false
 * @param opts.jamoExtendedA - default: false
 * @param opts.jamoExtendedB - default: false
 * @param opts.compatJamo - default: true
 * @param opts.syllable - default: true
 *
 * @example
 * ```
 * const compatJamo1 = "ㄱ" // 0x3131
 * isHangul(compatJamo1); // true
 *
 * const jamo1 = "ᄀ"; // 0x1100; KIYEOK looks the same but from a different table range.
 * isHangul(jamo1); // false
 * isHangul(jamo1, { jamo: true }); // true
 *
 * const jamoExtA = "ꥤ"; // 0xA964
 * isHangul(jamoExtA, { jamoExtendedA: true }); // true
 *
 * ```
 */
export const isHangul = (
  ch: string,
  opts?: {
    jamo?: boolean;
    jamoExtendedA?: boolean;
    jamoExtendedB?: boolean;
    compatJamo?: boolean;
    syllable?: boolean;
  },
) => {
  if (ch.length > 1) {
    console.warn(`Only the first character ("${ch[0]}") will be processed.`);
    ch = ch[0];
  }

  const options = {
    jamo: false,
    jamoExtendedA: false,
    jamoExtendedB: false,
    compatJamo: true,
    syllable: true,
    ...opts,
  };

  return (
    (options.syllable && isHangulSyllable(ch)) ||
    (options.jamo && isHangulJamo(ch)) ||
    (options.compatJamo && isHangulCompatJamo(ch)) ||
    (options.jamoExtendedA && isHangulJamoExtendedA(ch)) ||
    (options.jamoExtendedB && isHangulJamoExtendedB(ch))
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
