import * as bgpCsValidator from './bgp-community-validator.func';
import * as mocks from './mocks/bgp-cs.mock';

describe('bgpCsValidator', () => {
  it('invalid data should fail', () => {
    mocks.inCorrectData.forEach(item => {
      let flag = true;
      try {
        bgpCsValidator.checkBgpCommunityString(item);
      } catch (e) {
        flag = false;
      }
      expect(flag).toBeFalsy(`${item} is invalid, but function say valid.`);
    });
  });

  it('valid data should pass', () => {
    mocks.correctData.forEach(item => {
      let flag = true;
      try {
        bgpCsValidator.checkBgpCommunityString(item);
      } catch (e) {
        flag = false;
      }
      expect(flag).toBeTruthy(`${item} is valid, but function say invalid.`);
    });
  });
});
