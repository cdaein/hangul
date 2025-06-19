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
  return (
    (code >= 0xac00 && code <= 0xd7af) || // Hangul Syllables
    (code >= 0x1100 && code <= 0x11ff) || // Hangul Jamo
    (code >= 0x3130 && code <= 0x318f) || // Hangul Compatibility Jamo
    (code >= 0xa960 && code <= 0xa97f) || // Hangul Jamo Extended-A
    (code >= 0xd7b0 && code <= 0xd7ff) // Hangul Jamo Extended-B
  );
};
