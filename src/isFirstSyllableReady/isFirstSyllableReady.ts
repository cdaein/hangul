import { disassemble } from "../disassemble";
import { isHangul } from "../isHangul";

// REVIEW: it doesn what it's supposed to, but i made many changes where this function was used. the current logic may not be necessary. review later.

/**
 * Check if `first` syllable is ready with no chance of further transformation.
 * A syllable may be considered ready even if it is not a complete syllable. The function uses the inputs as they are and does not combine/assemble them to form a new syllable.
 * This function only checks for the `first` readiness in this specific sequence of two syllables where the readiness means it won't change upon adding new jamo(s).
 * The main use case is in real-time keydown events.
 *
 * @param first - First syllable to check
 * @param second - Second syllable being added (ie. keypress)
 */
export const isFirstSyllableReady = (first: string, second?: string) => {
  // we don't know when there is only one syllable
  if (!second) return false;

  // warn if char.length > 1
  if (first.length > 1 || second.length > 1) {
    console.warn(
      `the input string to "isFirstSyllableReady()" is greater than 1`,
    );
  }

  // only use single character
  first = first[0];
  second = second[0];

  // if non-Hangul (ie. latin, punctuations) appears, then syllable is ready
  if (!isHangul(first) || !isHangul(second)) return true;

  const firstDisass = disassemble(first)[0];
  const secondDisass = disassemble(second)[0];

  if (typeof firstDisass === "object" && typeof secondDisass === "object") {
    // rule is simple.
    // if 2 has either choseong or jungseong, 1 is ready
    // it basically relies on es-hangul assemble(). if it returns cho/jungseong of 2, then 1 is ready
    if (secondDisass.choseong.length > 0 || secondDisass.jungseong.length > 0) {
      return true;
    }
  }

  return false;
};
