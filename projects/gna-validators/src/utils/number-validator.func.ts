export function isNumberLessOrEqual(value: number, min: number): boolean {
  return value <= min;
}

export function isNumberGreaterOrEqual(value: number, min: number): boolean {
  return value >= min;
}

export function isNumberRange(value: number, min: number, max: number): boolean {
  return isNumberGreaterOrEqual(value, min) && isNumberLessOrEqual(value, max);
}

export function checkNumber(value: string) {
  if (value.length === 0 || value.match(/\s/) || isNaN(Number(value))) {
    throw new Error(`'${value}' should be a number.`);
  }
}

export function checkNumberLessOrEqual(value: number, compareValue: number) {
  if (!isNumberLessOrEqual(value, compareValue)) {
    throw new Error(`${value} should be less than ${compareValue}(included)`);
  }
}

export function checkNumberGreaterOrEqual(value: number, compareValue: number) {
  if (!isNumberGreaterOrEqual(value, compareValue)) {
    throw new Error(`${value} should be greater than ${compareValue}(included)`);
  }
}

export function checkNumberRange(value: number, min: number, max: number) {
  if (!isNumberRange(value, min, max)) {
    throw new Error(`${value} value is not between ${min} and ${max}(included)`);
  }
}
