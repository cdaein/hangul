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
  VOWELS_VERTICAL,
  VOWELS_HORIZONTAL,
  VOWELS_COMPOUND,
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
 * const compatJamo1 = "ㄱ" // 0x3131
 * isHangul(compatJamo1); // true
 *
 * const jamo1 = "ᄀ"; // 0x1100; KIYEOK looks the same but from a different table range.
 * isHangul(jamo1); // false
 * isHangul(jamo1, { jamo: true }); // true
 *
 * const jamoExtA = "ꥤ"; // 0xA964
 * isHangul(jamoExtA, { jamoExtendedA: true }); // true
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

/**
 * It looks at Unicode Hangul Compatibility Jamo range (`ㄱ-ㅎ`) to decide whether input `ch` is Hangul consonant or not.
 * Old consonants are not included.
 */
export const isConsonant = (ch: string) => {
  // const code = ch.charCodeAt(0);
  return /^[ㄱ-ㅎ]$/.test(ch);
};

/**
 * It looks at Unicode Hangul Compatibility Jamo range (`ㅏ-ㅣ`) to decide whether input `ch` is Hangul vowel or not.
 * Old vowels are not included.
 *
 * @param ch - A character to test
 * @param opts -
 * @param opts.vertical - Whether `ch` is in `[ "ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅣ" ]`
 * @param opts.horizontal - Whether `ch` is in `["ㅗ", "ㅛ", "ㅜ", "ㅠ", "ㅡ"]`
 * @param opts.compound - Whether `ch` is in `[ "ㅘ", "ㅙ", "ㅚ", "ㅝ", "ㅞ", "ㅟ", "ㅢ" ]`
 */
export const isVowel = (
  ch: string,
  opts?: {
    vertical?: boolean;
    horizontal?: boolean;
    compound?: boolean;
  },
) => {
  if (!/^[ㅏ-ㅣ]$/.test(ch)) return false;

  const options = {
    vertical: true,
    horizontal: true,
    compound: true,
    ...opts,
  };

  if (VOWELS_VERTICAL.includes(ch as any) && !options.vertical) return false;
  if (VOWELS_HORIZONTAL.includes(ch as any) && !options.horizontal)
    return false;
  if (VOWELS_COMPOUND.includes(ch as any) && !options.compound) return false;

  return true;
};
