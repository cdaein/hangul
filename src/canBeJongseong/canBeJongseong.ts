import { canBeJongseong as eshCanBeJongseong } from "es-hangul";

/**
 * Check if the input string is a valid Jongseong. It simply uses `es-hangul` method of the same name.
 *
 * @param str - can be a single or double characters
 */
export const canBeJongseong = (str: string) => {
  return eshCanBeJongseong(str);
};
