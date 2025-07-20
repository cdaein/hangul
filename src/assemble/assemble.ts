import { assemble as eshAssemble } from "es-hangul";
import { isHangul } from "../isHangul";

/**
 * Assemble input string array.
 * Hangul characters will be assembled into complete syllables.
 * For non-existing combinations, they will be returned as individual jaso elements. Non-Hangul characters are returned as is.
 *
 * @param strArr - string (in array) to assemble
 *
 * @example
 * ```ts
 * assemble(["ㅁ", "ㅗ", "ㅏ", "ㄹ", "ㄱ"]) // "뫍"
 * assemble(["ㅂ", "ㅂ", "ㅏ"]) // "ㅂ바"
 * assemble(["ㅁ", "ㅣ", "ㅋ", "ㅣ", "17"]) // "미키17"
 * assemble(["미키", "17"]) // "미키17"
 * ```
 */
export const assemble = (strArr: string[]): string => {
  const str = strArr.join("");
  const result = [];
  let i = 0;

  while (i < str.length) {
    const ch = str[i];
    if (isHangul(ch)) {
      // collect consecutive Hangul characters
      const hangulChars = [ch];
      let j = i + 1;

      while (j < str.length && isHangul(str[j])) {
        hangulChars.push(str[j]);
        j++;
      }

      // NOTE: backtrack in case of eshAssemble error (ex. "ㅜㅣㅇ" error. expected "ㅟㅇ")
      let numAccChars = hangulChars.length;

      while (numAccChars > 0) {
        const charsToTry = hangulChars.slice(0, numAccChars);

        try {
          const assembledEsh = eshAssemble(charsToTry);
          // assemble the consecutive Hangul characters
          // if it fails, it jumps to catch block to backtrack
          result.push(assembledEsh);

          // if any left, continue from failing char
          if (numAccChars < hangulChars.length) {
            const remaining = hangulChars.slice(numAccChars);
            // recursively process remaining characters
            const assembledRemaining = assemble(remaining);
            result.push(assembledRemaining);
          }

          break;
        } catch (err) {
          // if eshAssemble() fails, try with one less character
          numAccChars--;
        }
      }

      i = j; // move index to after the Hangul sequence
    } else {
      // Pass non-Hangul characters as is
      result.push(ch);
      i++;
    }
  }

  return result.join("");
};

/**
 * Assemble input string array.
 * Hangul characters will be assembled into complete syllables.
 * For non-existing combinations, they will be returned as individual jaso elements. Non-Hangul characters are returned as is.
 *
 * @param strArr - string (in array) to assemble
 *
 * @example
 * ```ts
 * assemble(["ㅁ", "ㅗ", "ㅏ", "ㄹ", "ㄱ"]) // "뫍"
 * assemble(["ㅂ", "ㅂ", "ㅏ"]) // "ㅂ바"
 * assemble(["ㅁ", "ㅣ", "ㅋ", "ㅣ", "17"]) // "미키17"
 * assemble(["미키", "17"]) // "미키17"
 * ```
 */
export const _assemble = (strArr: string[]) => {
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
