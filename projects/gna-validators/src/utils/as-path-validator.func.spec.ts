import * as asPathValidator from './as-path-validator.func';
import * as mocks from './mocks/as-path.mock';

describe('asPathValidator', () => {
  it('valid asPath should pass', () => {
    mocks.correctData.forEach(item => {
      let flag = true;
      try {
        asPathValidator.checkAsPathInput([item]);
      } catch (e) {
        flag = false;
      }
      expect(flag).toBeTruthy(`${item} is valid, but function says invalid.`);
    });
  });

  it('invalid asPath should fail', () => {
    mocks.inCorrectData.forEach(item => {
      let flag = true;
      try {
        asPathValidator.checkAsPathInput([item]);
      } catch (e) {
        flag = false;
      }
      expect(flag).toBeFalsy(`${item} is invalid, but function says valid.`);
    });
  });

  it('invalid no-prepend asPath should fail', () => {
    mocks.prependData.forEach(item => {
      let flag = true;
      try {
        asPathValidator.checkAsPathInput([item], true, false);
      } catch (e) {
        flag = false;
      }
      expect(flag).toBeFalsy(`${item} is prepending, but function says no-prepend.`);
    });
  });

  it('valid no-prepend asPath should pass', () => {
    mocks.correctData.forEach(item => {
      let flag = true;
      try {
        asPathValidator.checkAsPathInput([item], true, false);
      } catch (e) {
        flag = false;
      }
      expect(flag).toBeTruthy(`${item} is no-prepend, but function says prepend.`);
    });
  });

  it('valid prepend asPath should pass', () => {
    mocks.prependData.forEach(item => {
      let flag = true;
      try {
        asPathValidator.checkAsPathInput([item], true, true);
      } catch (e) {
        flag = false;
      }
      expect(flag).toBeTruthy(`${item} is valid prepending data, but function says invalid.`);
    });
  });
});
