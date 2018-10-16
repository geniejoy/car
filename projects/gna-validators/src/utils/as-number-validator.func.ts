import { AbstractControl, ValidationErrors } from '@angular/forms';
import { checkNumber, checkNumberGreaterOrEqual, checkNumberLessOrEqual } from './number-validator.func';

/**
 * Validator for AS number/Path
 * https://trac.genienrm.com/ATM6/ticket/499
 */

// TODO use angular value providers to do these constants
const MIN_ASN = 0;
const MAX_2BYTES_ASN = 65535;
const MAX_4BYTES_ASN = 4294967295;

export function checkAsnInput(inputValues: string[], supportRange = true, support4Bytes = true) {
  inputValues.forEach(inputValue => {
    try {
      const asnAry = inputValue.split('-');
      if (asnAry.length === 1) {
        checkAsn(asnAry, support4Bytes);
      } else {
        if (!supportRange) {
          throw Error();
        }
        if (asnAry.length !== 2) {
          throw Error();
        }
        checkAsnRange(inputValue, support4Bytes);
      }
    } catch (e) {
      throw Error(`Invalid AS number: ${inputValue}`);
    }
  });
}

// expect asnRange: Y-Z
function checkAsnRange(asnRange: string, support4Bytes = true) {
  const asnRangeAry = asnRange.split('-');
  const asn = checkAsn(asnRangeAry, support4Bytes);
  checkRangeMinMax(asn);
}

function checkRangeMinMax(asnAry: number[]) {
  if (asnAry[0] >= asnAry[1]) {
    throw Error();
  }
}

// expect asnAry: [X, M.N]
function checkAsn(asnAry: string[], support4Bytes = true): number[] {
  const func = support4Bytes ? check4BytesAsn : check2BytesAsn;
  const asn: number[] = [];
  asnAry.forEach(asnValue => {
    try {
      asn.push(func(asnValue));
    } catch (e) {
      throw Error();
    }
  });
  return asn;
}

// input asn: M.N or 0~4294967295
// expect asn: M.N or 0~4294967295
function check4BytesAsn(asn: string): number {
  const asnAry = asn.split('.');
  let value: number;
  switch (asnAry.length) {
    case 1:
      checkNumber(asnAry[0]);
      value = Number(asnAry[0]);
      checkNumberLessOrEqual(value, MAX_4BYTES_ASN);
      checkNumberGreaterOrEqual(value, MIN_ASN);
      break;
    case 2:
      asnAry.forEach(asnValue => {
        check2BytesAsn(asnValue);
      });
      value = Number(asnAry[0]) * 65536 + Number(asnAry[1]);
      break;
    default:
      throw Error();
  }
  return value;
}

// input asn: M.N or 0~4294967295
// expect asn: 0~65535
function check2BytesAsn(asn: string): number {
  if (asn.indexOf('.') >= 0) {
    throw Error();
  }
  checkNumber(asn);
  checkNumberLessOrEqual(Number(asn), MAX_2BYTES_ASN);
  checkNumberGreaterOrEqual(Number(asn), MIN_ASN);
  return Number(asn);
}

export function checkAsnDuplicates(asnArray: Array<string>) {
  // todo
  // only checks duplicate in asnArray
  const exists = [];
  const duplicated = [];
  for (let i = 0; i <= asnArray.length; i++) {
    if (exists[asnArray[i]] === undefined) {
      exists[asnArray[i]] = 1;
    } else {
      if (duplicated.indexOf(asnArray[i]) === -1) {
        duplicated.push(asnArray[i]);
      }
    }
  }
  if (duplicated.length > 0) {
    throw new Error(`Duplicate AS number: ${duplicated.join(', ')}`);
  }
}

function removeArrayLastEmptyElement(arr: Array<any>) {
  if (arr[arr.length - 1].length === 0) {
    arr.splice(arr.length - 1, 1);
  }
  return arr;
}

function validateAsnInput(AsnEntryArr: string[]): string[] {
  const msg = [];
  AsnEntryArr.forEach((AsnEntry, inx) => {
    try {
      checkAsnInput([AsnEntry]);
    } catch (e) {
      if (msg.indexOf(e.message) === -1) {
        msg.push(e.message);
      }
    }
  });
  return msg;
}

function detectAsnDuplicates(AsnEntryArr: string[]): string[] {
  const msg = [];
  try {
    checkAsnDuplicates(AsnEntryArr);
  } catch (e) {
    if (msg.indexOf(e.message) === -1) {
      msg.push(e.message);
    }
  }
  return msg;
}

export function subnetworkAsnValidator(control: AbstractControl): ValidationErrors | null {
  const data: string = control.value;
  const AsnEntryArr = removeArrayLastEmptyElement(data.split('\n'));
  const msg = [...validateAsnInput(AsnEntryArr), ...detectAsnDuplicates(AsnEntryArr)];

  if (msg.length === 0) {
    return null;
  } else {
    return { invalidValue: msg.slice() };
  }
}
