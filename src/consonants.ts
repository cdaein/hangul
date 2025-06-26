/**
 * A list of Hangul consonants that can be used as choseongs.
 *
 * @example
 * ["ㄱ", "ㄲ", .. , "ㅎ"]
 */
export const CHOSEONGS = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
] as const;

/**
 * A list of Hangul vowels that can be used as jungseongs.
 *
 * @example
 * ["ㅏ", .. , "ㅑ", .. , "ㅜㅓ", .. , "ㅣ"]
 */
export const JUNGSEONGS = [
  "ㅏ",
  "ㅐ",
  "ㅑ",
  "ㅒ",
  "ㅓ",
  "ㅔ",
  "ㅕ",
  "ㅖ",
  "ㅗ",
  "ㅗㅏ",
  "ㅗㅐ",
  "ㅗㅣ",
  "ㅛ",
  "ㅜ",
  "ㅜㅓ",
  "ㅜㅔ",
  "ㅜㅣ",
  "ㅠ",
  "ㅡ",
  "ㅡㅣ",
  "ㅣ",
] as const;

/**
 * A list of Hangul consonants that can be used as jongseongs.
 * The list is not exhaustive of all the consonants as it only contains what can be used as jongseong which is found in Hangul Syllables
 * and the charcodes are from the Unicode Hangul Compatibility Jamo table.
 *
 * @example
 * ["ㄱ", "ㄲ", .. , "ㄱㅅ", .. , "ㅎ"]
 */
export const JONGSEONGS_DISASSEMBLED = [
  "",
  "ㄱ",
  "ㄲ",
  "ㄱㅅ",
  "ㄴ",
  "ㄴㅈ",
  "ㄴㅎ",
  "ㄷ",
  "ㄹ",
  "ㄹㄱ",
  "ㄹㅁ",
  "ㄹㅂ",
  "ㄹㅅ",
  "ㄹㅌ",
  "ㄹㅍ",
  "ㄹㅎ",
  "ㅁ",
  "ㅂ",
  "ㅂㅅ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
] as const;

export const VOWELS_VERTICAL = [
  "ㅏ",
  "ㅐ",
  "ㅑ",
  "ㅒ",
  "ㅓ",
  "ㅔ",
  "ㅕ",
  "ㅖ",
  "ㅣ",
] as const;

export const VOWELS_HORIZONTAL = ["ㅗ", "ㅛ", "ㅜ", "ㅠ", "ㅡ"] as const;

export const VOWELS_COMPOUND = [
  "ㅘ",
  "ㅙ",
  "ㅚ",
  "ㅝ",
  "ㅞ",
  "ㅟ",
  "ㅢ",
] as const;

//========== Hangul Syllables
/** the first code in Unicode Hangul Syllables table */
export const HANGUL_SYLLABLES_START_CHARCODE = 0xac00;

/** the last code in Unicode Hangul Syllables table */
export const HANGUL_SYLLABLES_END_CHARCODE = 0xd7af;

//========== Hangul Compatibility Jamo
/** the first code in Unicode Hangul Compatibility Jamo table */
export const HANGUL_COMPAT_JAMO_START_CHARCODE = 0x3130;

/* the last code in Unicode Hangul Compatibility Jamo table */
export const HANGUL_COMPAT_JAMO_END_CHARCODE = 0x318f;

/** 'ㄱ', the first consonant in Unicode Hangul Compatibility Jamo table */
export const HANGUL_COMPAT_CONSONANT_START_CHARCODE = 0x3131;

/** 'ㅎ', the last consonant in Unicode Hangul Compatibility Jamo table */
export const HANGUL_COMPAT_CONSONANT_END_CHARCODE = 0x314e;

/** 'ㅏ', the first vowel in Unicode Hangul Compatibility Jamo table */
export const HANGUL_COMPAT_VOWEL_START_CHARCODE = 0x314f;

/** 'ㅣ', the first vowel in Unicode Hangul Compatibility Jamo table */
export const HANGUL_COMPAT_VOWEL_END_CHARCODE = 0x3163;

/** 'ㅥ', the first old consonant in Unicode Hangul Compatibility Jamo table */
export const HANGUL_COMPAT_OLD_CONSONANT_START_CHARCODE = 0x3165;

/** 'ㆆ', the last old consonant in Unicode Hangul Compatibility Jamo table */
export const HANGUL_COMPAT_OLD_CONSONANT_END_CHARCODE = 0x3186;

/** 'ㆇ', the first vowel in Unicode Hangul Compatibility Jamo table */
export const HANGUL_COMPAT_OLD_VOWEL_START_CHARCODE = 0x3187;

/** 'ㆎ', the first vowel in Unicode Hangul Compatibility Jamo table */
export const HANGUL_COMPAT_OLD_VOWEL_END_CHARCODE = 0x318e;

//========== Hangul Jamo
/** the first code in Unicode Hangul Jamo table */
export const HANGUL_JAMO_START_CHARCODE = 0x1100;

/** the last code in Unicode Hangul Jamo table */
export const HANGUL_JAMO_END_CHARCODE = 0x11ff;

/** 'ᄀ', the first initial consonant (choseong) in Unicode Hangul Jamo table */
export const HANGUL_JAMO_INITIAL_CONSONANT_START_CHARCODE = 0x1100;

/** 'ᄒ', the last initial consonant (choseong) in Unicode Hangul Jamo table */
export const HANGUL_JAMO_INITIAL_CONSONANT_END_CHARCODE = 0x1112;

/** NIEUN-KIYEOK, the first old initial consonant (choseong) in Unicode Hangul Jamo table */
export const HANGUL_JAMO_OLD_INITIAL_CONSONANT_START_CHARCODE = 0x1113;

/** TIKEUT-RIEUL, the last old initial consonant (choseong) in Unicode Hangul Jamo table */
export const HANGUL_JAMO_OLD_INITIAL_CONSONANT_END_CHARCODE = 0x115e;

/** A, the first medial vowel (jungseong) in Unicode Hangul Jamo table */
export const HANGUL_JAMO_VOWEL_START_CHARCODE = 0x1161;

/** I, the last medial vowel (jungseong) in Unicode Hangul Jamo table */
export const HANGUL_JAMO_VOWEL_END_CHARCODE = 0x1175;

/** A-O, the first old medial vowel (jungseong) in Unicode Hangul Jamo table */
export const HANGUL_JAMO_OLD_VOWEL_START_CHARCODE = 0x1176;

/** O-YAE, the last old medial vowel (jungseong) in Unicode Hangul Jamo table */
export const HANGUL_JAMO_OLD_VOWEL_END_CHARCODE = 0x11a7;

/** KIYEOK, the first final consonant (jongseong) in Unicode Hangul Jamo table */
export const HANGUL_JAMO_FINAL_CONSONANT_START_CHARCODE = 0x11a8;

/** HIEUH, the last final consonant (jongseong) in Unicode Hangul Jamo table */
export const HANGUL_JAMO_FINAL_CONSONANT_END_CHARCODE = 0x11c2;

/** KIYEOK-RIEUL, the first old final consonant (jongseong) in Unicode Hangul Jamo table */
export const HANGUL_JAMO_OLD_FINAL_CONSONANT_START_CHARCODE = 0x11c3;

/** SSANGNIEUN, the last old final consonant (jongseong) in Unicode Hangul Jamo table */
export const HANGUL_JAMO_OLD_FINAL_CONSONANT_END_CHARCODE = 0x11ff;

//========== Hangul Jamo Extended A
/**
 * the first code in Unicode Hangul Jamo Extended A table
 * It contains the old initial consonants (choseong)
 */
export const HANGUL_JAMO_EXTENDED_A_START_CHARCODE = 0xa960;

/**
 * the last code in Unicode Hangul Jamo Extended A table
 * It contains the old initial consonants (choseong)
 */
export const HANGUL_JAMO_EXTENDED_A_END_CHARCODE = 0xa97f;

//========== Hangul Jamo Extended B
/**
 * the first code in Unicode Hangul Jamo Extended B table
 * It contains the old medial vowels (jungseong) and old final consonants (jongseong).
 */
export const HANGUL_JAMO_EXTENDED_B_START_CHARCODE = 0xd7b0;

/**
 * the last code in Unicode Hangul Jamo Extended B table
 * It contains the old medial vowels (jungseong) and old final consonants (jongseong).
 */
export const HANGUL_JAMO_EXTENDED_B_END_CHARCODE = 0xd7ff;

/** O-YEO, the first old medial vowel (jungseong) in Unicode Hangul Jamo Extended B table */
export const HANGUL_JAMO_EXTENDED_B_VOWEL_START_CHARCODE = 0xd7b0;

/** ARAEA-E, the last old medial vowel (jungseong) in Unicode Hangul Jamo Extended B table */
export const HANGUL_JAMO_EXTENDED_B_VOWEL_END_CHARCODE = 0xd7c6;

/** NIEUN-RIEUL, the first old final consonant (jongseong) in Unicode Hangul Jamo Extended B table */
export const HANGUL_JAMO_EXTENDED_B_CONSONANT_START_CHARCODE = 0xd7cb;

/** PHIEUPH-THIEUTH, the last old final consonant (jongseong) in Unicode Hangul Jamo Extended B table */
export const HANGUL_JAMO_EXTENDED_B_CONSONANT_END_CHARCODE = 0xd7fb;
