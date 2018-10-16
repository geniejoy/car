import * as ipValidator from './ip-validator.func';
import * as mocks from './mocks/ip.mock';

describe('ipValidator', () => {
  it('isIPV4:', () => {
    mocks.ipv6Ip.correct.forEach(data => {
      expect(ipValidator.isIPV4(data)).toBe(false, `ip:[${data}]`);
    });
    mocks.ipv4Ip.inCorrect.forEach(data => {
      expect(ipValidator.isIPV4(data)).toBe(false, `ip:[${data}]`);
    });
    mocks.ipv4Ip.correct.forEach(data => {
      expect(ipValidator.isIPV4(data)).toBe(true, `ip:[${data}]`);
    });
  });

  it('isIPV4Cidr:', () => {
    mocks.ipv6Cidr.correct.forEach(data => {
      expect(ipValidator.isIPV4CIDR(data)).toBe(false, `ip:[${data}]`);
    });
    mocks.ipv4Cidr.inCorrect.forEach(data => {
      expect(ipValidator.isIPV4CIDR(data)).toBe(false, `ip:[${data}]`);
    });
    mocks.ipv4Cidr.correct.forEach(data => {
      expect(ipValidator.isIPV4CIDR(data)).toBeTruthy(data);
    });
  });

  it('isIPV4Range:', () => {
    mocks.ipv6Range.correct.forEach(data => {
      expect(ipValidator.isIPRangeIPv4(data)).toBe(false, `ip:[${data}]`);
    });
    mocks.ipv4Range.inCorrect.forEach(data => {
      expect(ipValidator.isIPRangeIPv4(data)).toBe(false, `ip:[${data}]`);
    });
    mocks.ipv4Range.correct.forEach(data => {
      expect(ipValidator.isIPRangeIPv4(data)).toBe(true, `ip:[${data}]`);
    });
  });

  it('isIPAddressIPv4:', () => {
    mocks.ipv4.inCorrect.forEach(data => {
      expect(ipValidator.isIPAddressIPv4(data)).toBe(false, `ip:[${data}]`);
    });
    mocks.ipv4.correct.forEach(data => {
      expect(ipValidator.isIPAddressIPv4(data)).toBe(true, `ip:[${data}]`);
    });
  });

  it('isIPV6:', () => {
    mocks.ipv4Ip.correct.forEach(data => {
      expect(ipValidator.isIPV6(data)).toBe(false, `ip:[${data}]`);
    });
    mocks.ipv6Ip.inCorrect.forEach(data => {
      expect(ipValidator.isIPV6(data)).toBe(false, `ip:[${data}]`);
    });
    mocks.ipv6Ip.correct.forEach(data => {
      expect(ipValidator.isIPV6(data)).toBe(true, `ip:[${data}]`);
    });
  });

  it('isIPV6Cidr:', () => {
    mocks.ipv4Cidr.correct.forEach(data => {
      expect(ipValidator.isIPV6CIDR(data)).toBe(false, `ip:[${data}]`);
    });
    mocks.ipv6Cidr.inCorrect.forEach(data => {
      expect(ipValidator.isIPV6CIDR(data)).toBe(false, `ip:[${data}]`);
    });
    mocks.ipv6Cidr.correct.forEach(data => {
      expect(ipValidator.isIPV6CIDR(data)).toBe(true, `ip:[${data}]`);
    });
  });

  it('isIPAddressIPv6:', () => {
    mocks.ipv6.inCorrect.forEach(data => {
      expect(ipValidator.isIPAddressIPv6(data)).toBe(false, `ip:[${data}]`);
    });
    mocks.ipv6.correct.forEach(data => {
      expect(ipValidator.isIPAddressIPv6(data)).toBe(true, `ip:[${data}]`);
    });
  });

  it('isIPV6Range:', () => {
    mocks.ipv4Range.correct.forEach(data => {
      expect(ipValidator.isIPRangeIPv6(data)).toBe(false, `ip:[${data}]`);
    });
    mocks.ipv6Range.inCorrect.forEach(data => {
      expect(ipValidator.isIPRangeIPv6(data)).toBe(false, `ip:[${data}]`);
    });
    mocks.ipv6Range.correct.forEach(data => {
      expect(ipValidator.isIPRangeIPv6(data)).toBe(true, `ip:[${data}]`);
    });
  });

  it('isIPAddress:', () => {
    const datas = {
      correct: [...mocks.ipv4.correct, ...mocks.ipv6.correct],
      inCorrect: [...mocks.ipv4.inCorrect, ...mocks.ipv6.inCorrect]
    };
    datas.inCorrect.forEach(data => {
      expect(ipValidator.isIPAddress(data)).toBe(false, `ip:[${data}]`);
    });
    datas.correct.forEach(data => {
      expect(ipValidator.isIPAddress(data)).toBe(true, `ip:[${data}]`);
    });
  });

  it('isIPRange:', () => {
    const datas = {
      correct: [...mocks.ipv4Range.correct, ...mocks.ipv6Range.correct],
      inCorrect: [...mocks.ipv4Range.inCorrect, ...mocks.ipv6Range.inCorrect]
    };
    datas.inCorrect.forEach(data => {
      expect(ipValidator.isIPRange(data)).toBe(false, `ip:[${data}]`);
    });
    datas.correct.forEach(data => {
      expect(ipValidator.isIPRange(data)).toBe(true, `ip:[${data}]`);
    });
  });
});
