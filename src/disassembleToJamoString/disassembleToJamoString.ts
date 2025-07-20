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
 * @param phrase -
 */
export const disassembleToJamoString = (phrase: string) => {
  return disassemble(phrase)
    .map((v) =>
      typeof v === "object" ? `${v.choseong}${v.jungseong}${v.jongseong}` : v,
    )
    .join("");
};
