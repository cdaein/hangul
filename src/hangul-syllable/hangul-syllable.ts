import { assemble, disassemble, isHangul } from "../index";

export interface IHangulSyllable {
  choseong: string;
  jungseong: string;
  jongseong: string;
}

/**
 * Syllable class holds Hangul syllable data `{ choseong, jungseong, jongseong }`.
 * There are a few useful methods for processing the Hangul syllable.
 * It is most likely a mistake trying to store non-Hangul characters.
 */
export class HangulSyllable {
  char: string;
  disassembled: IHangulSyllable;
  id: number;

  constructor(char: string) {
    if (!isHangul(char)) {
      console.warn(
        `It may be a mistake to store "${char}" in HangulSyllable object`,
      );
    }

    this.id = -1; // temporary value

    this.char = char;
    if (char) {
      this.disassembled = disassemble(char)[0] as IHangulSyllable;
    } else {
      this.disassembled = {
        choseong: "",
        jungseong: "",
        jongseong: "",
      };
    }
  }

  setId(id: number) {
    this.id = id;
  }

  clone() {
    return new HangulSyllable(this.char);
  }

  isEmpty() {
    return !this.hasComponent();
  }

  hasComponent() {
    return this.hasChoseong() || this.hasJungseong() || this.hasJongseong();
  }

  hasChoseong() {
    return this.disassembled.choseong.length > 0;
  }

  hasJungseong() {
    return this.disassembled.jungseong.length > 0;
  }

  hasJongseong() {
    return this.disassembled.jongseong.length > 0;
  }

  /**
   * Removes a single component starting from jongseong, jungseong to choseong.
   * If it has a double jongseong or jungseong, it will remove a single one each time.
   *
   * @example
   * const syl = new HangulSyllable("깖");
   * syl.removeSingleComponent() // syl.char == "깔"
   * syl.removeSingleComponent() // "까"
   * syl.removeSingleComponent() // "ㄲ"
   * syl.removeSingleComponent() // ""
   */
  removeSingleComponent() {
    if (this.disassembled.jongseong) {
      this.disassembled.jongseong = this.disassembled.jongseong.slice(0, -1);
    } else if (this.disassembled.jungseong) {
      this.disassembled.jungseong = this.disassembled.jungseong.slice(0, -1);
    } else {
      this.disassembled.choseong = this.disassembled.choseong.slice(0, -1);
    }
    this.char = assemble(this.getDisassembledStringArray());
  }

  /**
   * @example
   *  const syl = new HangulSyllable("깖");
   *  syl.removeSingleJongseong() // syl.char == "깔"
   *
   * @example
   *  const syl = new HangulSyllable("깔");
   *  syl.removeSingleJongseong() // syl.char == "까"
   */
  removeSingleJongseong() {
    this.disassembled.jongseong = this.disassembled.jongseong.slice(0, -1);
    this.char = assemble(this.getDisassembledStringArray());
  }

  /**
   * Updates `this.char` and `this.disassembled` according to the input `char`
   *
   * @param char -
   */
  updateSyllable(char: string) {
    this.char = char;
    if (char) {
      this.disassembled = disassemble(char)[0] as IHangulSyllable;
    } else {
      this.disassembled = {
        choseong: "",
        jungseong: "",
        jongseong: "",
      };
    }
  }

  /**
   * Returns an object with Hangul components
   *
   * @example
   * const syl = new HangulSyllable("깖");
   * syl.getDisassembled() // {choseong: "ㄲ", jungseong: "ㅏ", jongseong: "ㄹㅁ"}
   */
  getDisassembled() {
    return this.disassembled;
  }

  /**
   * Returns an array of each Hangul component. Note that a double Jongseong is broken down.
   *
   * @example
   * const syl = new HangulSyllable("깖");
   * syl.getDisassembledStringArray() // ["ㄲ", "ㅏ", "ㄹㅁ"]
   */
  getDisassembledStringArray(): string[] {
    return Object.values(this.disassembled).map((v) => v);
  }

  /**
   * Returns a flattened string each Hangul component. Note that a double Jongseong is broken down.
   *
   * @example
   * const syl = new HangulSyllable("깖");
   * syl.getDisassembledString() // "ㄲㅏㄹㅁ"
   */
  getDisassembledString(): string {
    return Object.values(this.disassembled).join("");
  }
}
