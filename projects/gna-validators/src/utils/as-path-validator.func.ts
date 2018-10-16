import { AbstractControl, ValidationErrors } from '@angular/forms';
import { checkAsnDuplicates, checkAsnInput } from './as-number-validator.func';

export function checkAsPathInput(inputValues: string[], support4Bytes = true, supportPrepend = false) {
  inputValues.forEach(inputValue => {
    try {
      checkAsPathContiguousWildcard(inputValue);
      checkBracketsPair(inputValue);
      const trimSpaceValue = inputValue.replace(/^\s*|\s*$/g, '');
      checkInvalidSpaces(trimSpaceValue);
      checkAsPath(trimSpaceValue, support4Bytes);
      checkAsPathPrepend(trimSpaceValue, supportPrepend);
    } catch (e) {
      throw Error(`Invalid AS path: ${inputValue}`);
    }
  });
}

function checkAsPathContiguousWildcard(inputValue: string) {
  if (new RegExp(/\*\s+\*/, 'g').test(inputValue)) {
    throw new Error();
  }
}

function checkBracketsPair(inputValue: string) {
  const regex = new RegExp(/\[\ ?\d+(\.\d+)?(\ \d+(\.\d+)?)+\ ?\]/, 'g');
  let bracketsCnt = 0;
  let leftBracketsCnt = 0;
  let rightBracketsCnt = 0;
  if (regex.test(inputValue)) {
    bracketsCnt = inputValue.match(regex).length;
  }
  if (new RegExp(/\[/, 'g').test(inputValue)) {
    leftBracketsCnt = inputValue.match(new RegExp(/\[/, 'g')).length;
  }
  if (new RegExp(/\]/, 'g').test(inputValue)) {
    rightBracketsCnt = inputValue.match(new RegExp(/\]/, 'g')).length;
  }
  if (bracketsCnt !== leftBracketsCnt || bracketsCnt !== rightBracketsCnt) {
    throw new Error();
  }
}

function checkInvalidSpaces(inputValue: string) {
  if (new RegExp(/\s{2,}/, 'g').test(inputValue)) {
    // 5 [1.3  4.39 3.02] * 1.3
    throw new Error();
  }
  if (inputValue.indexOf('[') >= 0) {
    if (inputValue.indexOf('[') > 0 && !new RegExp(/\s\[/, 'g').test(inputValue)) {
      // 5[1.3 4.39 3.02] * 1.3
      throw new Error();
    }
    if (inputValue.substr(-1, 1) !== ']' && !new RegExp(/\]\s/, 'g').test(inputValue)) {
      // 5 [1.3 4.39 3.02]* 1.3
      throw new Error();
    }
  }
}

function extractAsn(inputValue: string): string[] {
  return inputValue
    .replace(/[\[\]]/g, '')
    .replace(/\s+/g, ' ')
    .split(' ')
    .filter(v => {
      // mock data: 3*3 *3 3*
      return v === '*' ? '' : v;
    })
    .filter(v => v);
}

function checkAsPath(inputValue: string, support4Bytes = true) {
  const asPathvalues: string[] = extractAsn(inputValue);
  checkAsnInput(asPathvalues, false, support4Bytes);
}

function checkAsPathPrepend(inputValue: string, supportPrepend = false) {
  if (supportPrepend) {
    return;
  }
  const asPathvalues: string[] = extractAsn(inputValue);
  checkAsnDuplicates(asPathvalues);
}

function removeArrayLastEmptyElement(arr: Array<any>) {
  if (arr[arr.length - 1].length === 0) {
    arr.splice(arr.length - 1, 1);
  }
  return arr;
}

function validateAsPathInput(
  asPathEntryArr: string[],
  apply4byteFormat: boolean = true,
  supportPrepend: boolean = false
) {
  const msg = [];
  asPathEntryArr.forEach(asPathEntry => {
    try {
      checkAsPathInput([asPathEntry], apply4byteFormat, supportPrepend);
    } catch (e) {
      if (msg.indexOf(e.message) === -1) {
        msg.push(e.message);
      }
    }
  });
  return msg;
}

export function subnetworkAsPathValidator(control: AbstractControl): ValidationErrors | null {
  const data: string = control.value;
  const asPathEntryArr = removeArrayLastEmptyElement(data.split('\n'));
  const msg = validateAsPathInput(asPathEntryArr);

  if (msg.length === 0) {
    return null;
  } else {
    return { invalidValue: msg.slice() };
  }
}

export function asPathPrependValidator(control: AbstractControl): ValidationErrors | null {
  const data: string = control.value;
  const asPathEntryArr = removeArrayLastEmptyElement(data.split('\n'));
  const msg = validateAsPathInput(asPathEntryArr, true, true);

  if (msg.length === 0) {
    return null;
  } else {
    return { invalidValue: msg.slice() };
  }
}
