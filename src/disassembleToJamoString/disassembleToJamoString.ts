import { disassemble } from "../disassemble";

/**
 * Returns a plain disassembled string
 * 
 * @example
  disassembleToJamoString("가나") // "ㄱㅏㄴㅏ"
  disassembleToJamoString("밟아") // "ㅂㅏㄹㅂㅇㅏ"
  disassembleToJamoString("외워") // "ㅇㅗㅣㅇㅜㅓ"
  disassembleToJamoString("ㅘㅇ") // "ㅗㅏㅇ"
  disassembleToJamoString("밟abc아") // "ㅂㅏㄹㅂabcㅇㅏ"
 *
 * @param phrase - A string to disassemble. May or may not include non-Hangul characters
 */
export const disassembleToJamoString = (phrase: string) => {
  return disassemble(phrase)
    .map((v) =>
      typeof v === "object" ? `${v.choseong}${v.jungseong}${v.jongseong}` : v,
    )
    .join("");
};
