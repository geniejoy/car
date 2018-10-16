import { checkNumber, checkNumberLessOrEqual, checkNumberRange, isNumberRange } from './number-validator.func';
/**
 * Validator for Bgp Community
 */

/**
 * Checks whether the input is a valid bgp community length.
 * Input Sample: (min: 0, max: 255)
 *    *
 *    123
 *    *-123
 *    123-*
 *    123-234
 * @throws Error if the input is not a valid bgp community string
 * @return void
 */
export function checkBgpCommunityLength(value: string) {
  if (value !== '*') {
    try {
      if (value.indexOf('-') === -1) {
        checkNumber(value);
        checkNumberRange(Number(value), 0, 255);
      } else {
        const data = value.split('-');
        if (data[0] === '*') {
          checkNumber(data[1]);
          checkNumberRange(Number(data[1]), 0, 255);
        } else if (data[1] === '*') {
          checkNumberRange(Number(data[0]), 0, 255);
        } else {
          data.forEach(val => {
            checkNumber(val);
          });
          checkNumberRange(Number(data[1]), 0, 255);
          checkNumberRange(Number(data[0]), 0, 255);
          checkNumberLessOrEqual(Number(data[0]), Number(data[1]));
        }
      }
    } catch (e) {
      throw new Error(`Bgp community length :${e.message()} for the given value : ${value}`);
    }
  }
}

/**
 * Checks whether the input is a valid bgp community string.
 * @throws Error if the input is not a valid bgp community string
 * @return void
 */
export function checkBgpCommunityString(value: string) {
  if (value.indexOf(':') === -1) {
    throw new Error(`':' should be contained in bgp community string.`);
  }
  const data = value.split(':');
  checkBgpCommunityEntry(data[0]);
  checkBgpCommunityEntry(data[1]);
}

/**
 * Checks whether the input is a valid bgp community entry.
 * @throws Error if the input is not a valid bgp community entry
 * @return void
 */
export function checkBgpCommunityEntry(value: string) {
  if (value === '*') {
    return;
  }
  if (value.length === 0) {
    throw new Error(`Bgp community entry can't be empty.`);
  }
  // pattern = '/^[0-9\?]{0,4}(\[[0-9\ ]*\])*[0-9\?]{0,4}/';
  const pattern = /^[0-9\?]{1,5}/;
  if (!value.match(pattern)) {
    throw new Error(`The bgp community entry (${value}) is invalid.`);
  }
  if (value.indexOf('?') === -1) {
    if (!isNumberRange(Number(value), 0, 65535)) {
      throw new Error(`The number of bgp community (${value}) should be a number between 0 and 65535.`);
    }
  }
}

/**
 * Get the length of bgp community.
 * @return number
 */
export function getBgpCommunityLength(value: string): number {
  let digit_no = 0;
  let count_flag = 1;
  let inx = 0;
  const count = value.length;
  for (inx = 0; inx < count; inx++) {
    const cc = value.charCodeAt(inx);
    if (cc === 91) {
      // "["
      digit_no++;
      count_flag = 0;
    } else if (cc === 93) {
      // "]"
      count_flag = 1;
    } else {
      if (count_flag > 0) {
        digit_no++;
      }
    }
  }
  return digit_no;
}
