import { assemble as eshAssemble } from "es-hangul";

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
 * ```
 */
export const assemble = (strArr: string[]) => {
  const result = [];
  let i = 0;

  // collect consecutive Hangul chars until it sees non-Hangul char
  while (i < strArr.length) {
    const ch = strArr[i];
    if (isHangul(ch)) {
      // Collect consecutive Hangul characters
      const hangulChars = [ch];
      let j = i + 1;

      while (j < strArr.length && isHangul(strArr[j])) {
        hangulChars.push(strArr[j]);
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
  const code = ch.charCodeAt(0);

  // Hangul Syllables: AC00–D7AF
  // Hangul Jamo: 1100–11FF
  // Hangul Compatibility Jamo: 3130–318F
  // Hangul Jamo Extended-A: A960–A97F
  // Hangul Jamo Extended-B: D7B0–D7FF
  // return (
  //   (code >= 0xac00 && code <= 0xd7af) || // Hangul Syllables
  //   (code >= 0x1100 && code <= 0x11ff) || // Hangul Jamo
  //   (code >= 0x3130 && code <= 0x318f) || // Hangul Compatibility Jamo
  //   (code >= 0xa960 && code <= 0xa97f) || // Hangul Jamo Extended-A
  //   (code >= 0xd7b0 && code <= 0xd7ff) // Hangul Jamo Extended-B
  // );

  if (ch.length > 1) {
    console.warn(`Only the first character ("${ch[0]}") will be processed.`);
    ch = ch[0];
  }
  return /[\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uAC00-\uD7AF\uD7B0-\uD7FF]/.test(
    ch,
  );
};
