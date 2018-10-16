import * as asnValidator from './as-number-validator.func';
import * as mocks from './mocks/asn.mock';

describe('asnValidator', () => {
  it('invalid asn should fail', () => {
    mocks.inCorrectData.forEach(item => {
      let flag = true;
      try {
        asnValidator.checkAsnInput([item]);
      } catch (e) {
        flag = false;
      }
      expect(flag).toBeFalsy(`${item} is invalid, but function says valid.`);
    });
  });

  it('valid asn should pass', () => {
    mocks.correctData.forEach(item => {
      let flag = true;
      try {
        asnValidator.checkAsnInput([item]);
      } catch (e) {
        flag = false;
      }
      expect(flag).toBeTruthy(`${item} is valid, but function says invalid.`);
    });
  });

  it('asn should duplidate', () => {
    mocks.duplicatedData.forEach(item => {
      let flag = true;
      try {
        asnValidator.checkAsnDuplicates(item.split('\n'));
      } catch (e) {
        flag = false;
      }
      expect(flag).toBeFalsy(`${item} is duplicated, but function says unique.`);
    });
  });

  it('asn should be unique', () => {
    mocks.uniqueData.forEach(item => {
      let flag = true;
      try {
        asnValidator.checkAsnDuplicates(item.split('\n'));
      } catch (e) {
        flag = false;
      }
      expect(flag).toBeTruthy(`${item} is unique, but function says duplicate.`);
    });
  });
});
