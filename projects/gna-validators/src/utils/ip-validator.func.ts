// library:: https://github.com/beaugunderson/ip-address
// jsbn:: https://www.npmjs.com/package/jsbn
import { Address4, Address6 } from 'ip-address/ip-address';
/**
 * Checks whether the input is a valid IP in IPv4 format.
 * @return boolean
 */
export function isIPV4(ip: string): boolean {
  /*
    {
        "valid":true,
        "address":"1.0.0.127",
        "groups":4,
        "v4":true,
        "subnet":"/32",
        "subnetMask":32,
        "addressMinusSuffix":"1.0.0.127",
        "parsedAddress":["1","0","0","127"]
    }
    */
  const pattern = new RegExp(
    // tslint:disable-next-line:max-line-length
    /^((?:(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))(?!\/([0-9]|[1-2][0-9]|3[0-2]))$/,
    'i'
  );
  if (pattern.test(ip)) {
    try {
      const ipAddr = new Address4(ip);
      return ipAddr.valid;
    } catch (e) {
      return false;
    }
  }
  return false;
}

/**
 * Checks whether the input is a valid IP in CIDR IPv4 format.
 * @return boolean
 */
export function isIPV4CIDR(cidr: string): boolean {
  // tslint:disable-next-line:max-line-length
  const pattern = new RegExp(
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/([0-9]|[1-2][0-9]|3[0-2]))/,
    'i'
  );
  if (pattern.test(cidr)) {
    try {
      const ipAddr = new Address4(cidr);
      return ipAddr.valid;
    } catch (e) {
      return false;
    }
  }
  return false;
}

/**
 * Checks whether the input is a valid IP in IPv6 format.
 * @param string ip ip
 * @return boolean
 */
export function isIPV6(ip: string): boolean {
  const pattern = new RegExp(
    // tslint:disable-next-line:max-line-length
    /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])){3}))|:)))(%.+)?\s*/,
    'i'
  );
  if (pattern.test(ip)) {
    try {
      const ipAddr = new Address6(ip);
      return ipAddr.valid;
    } catch (e) {
      return false;
    }
  }
  return false;
}

/**
 * Checks whether the input is a valid IP in CIDR IPv6 format.
 * @param string cidr cidr
 * @return boolean
 */
export function isIPV6CIDR(cidr: string): boolean {
  const pattern = new RegExp(
    // tslint:disable-next-line:max-line-length
    /^s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:)))(%.+)?s*(\/(1[01][0-9]|12[0-8]|[0-9]{1,2}))/,
    'i'
  );
  if (pattern.test(cidr)) {
    try {
      const ipAddr = new Address6(cidr);
      return ipAddr.valid;
    } catch (e) {
      return false;
    }
  }
  return false;
}

/**
 * Checks whether the input is a valid IP address.
 * @return boolean
 */
export function isIPAddress(ip: string): boolean {
  return isIPV4CIDR(ip) || isIPV4(ip) || isIPV6CIDR(ip) || isIPV6(ip);
}

/**
 * Checks whether the input is a valid IPv4 address.
 * @return boolean
 */
export function isIPAddressIPv4(ip: string): boolean {
  return isIPV4CIDR(ip) || isIPV4(ip);
}

/**
 * Checks whether the input is a valid IPv6 address.
 * @return boolean
 */
export function isIPAddressIPv6(ip: string): boolean {
  return isIPV6CIDR(ip) || isIPV6(ip);
}

/**
 * Checks whether the input is a IP range.
 * @return boolean
 */
export function isIPRange(ip: string): boolean {
  return isIPRangeIPv4(ip) || isIPRangeIPv6(ip);
}

/**
 * Checks whether the input is a IPv4 range.
 * @return boolean
 */
export function isIPRangeIPv4(ip: string): boolean {
  const range = ip.split('-');
  if (range.length > 2) {
    return false;
  }
  const ip1 = range[0];
  const ip2 = range[1];
  if (isIPV4(ip1) && isIPV4(ip2)) {
    const ip1addr = new Address4(ip1);
    const ip2addr = new Address4(ip2);
    return ip2addr.bigInteger().compareTo(ip1addr.bigInteger()) > 0;
  }
  return false;
}

/**
 * Checks whether the input is a IPv6 range.
 * @return boolean
 */
export function isIPRangeIPv6(ip: string): boolean {
  const range = ip.split('-');
  if (range.length > 2) {
    return false;
  }
  const ip1 = range[0];
  const ip2 = range[1];
  if (isIPV6(ip1) && isIPV6(ip2)) {
    const ip1addr = new Address6(ip1);
    const ip2addr = new Address6(ip2);
    return ip2addr.bigInteger().compareTo(ip1addr.bigInteger()) > 0;
  }
  return false;
}

/**
 * Checks whether the input is in IPV4 format
 * @throws Error if the input is not in IPV4 format
 * @return void
 */
export function checkIPV4WithException(ip: string) {
  if (!isIPV4(ip)) {
    throw new Error(`${ip} is not a valid IPV4.`);
  }
}

/**
 * Checks whether the input is in IPV6 format
 * @throws Error if the input is not in IPV6 format
 * @return void
 */
export function checkIPV6WithException(ip: string) {
  if (!isIPV6(ip)) {
    throw new Error(`${ip} is not a valid IPV6.`);
  }
}

/**
 * Checks whether the input is in IPV4CIDR format
 * @throws Error if the input is not in IPV4CIDR format
 * @return void
 */
export function checkIPV4CIDRWithException(ip: string) {
  if (!isIPV4CIDR(ip)) {
    throw new Error(`${ip} is an invalid IP or subnet.`);
  }
}

/**
 * Checks whether the input is in IPV6CIDR format
 * @throws Error if the input is not in IPV6CIDR format
 * @return void
 */
export function checkIPV6CIDRWithException(ip: string) {
  if (!isIPV6CIDR(ip)) {
    throw new Error(`${ip} is an invalid IP or subnet.`);
  }
}

/**
 * Checks whether the input is in IP CIDR format
 * @throws Error if the input is not in IPV6CIDR format
 * @return void
 */
export function checkCIDRWithException(ip: string) {
  if (!isIPV6CIDR(ip) && !isIPV4CIDR(ip)) {
    throw new Error(`${ip} is an invalid IP or subnet.`);
  }
}

/**
 * Checks whether the input is a valid IP adress
 * @throws Error if the input is not a valid IP address
 * @return void
 */
export function checkIPAddressWithException(ip: string) {
  if (!isIPAddress(ip)) {
    throw new Error(`${ip} is not a valid IP address.`);
  }
}

/**
 * Checks whether the input is a valid IPv4 adress
 * @throws Error if the input is not a valid IPv4 address
 * @return void
 */
export function checkIPAddressWithExceptionIPv4(ip: string) {
  if (!isIPAddressIPv4(ip)) {
    throw new Error(`${ip} is not a valid IPv4 address.`);
  }
}

/**
 * Checks whether the input is a valid IPv6 adress
 * @throws Error if the input is not a valid IPv6 address
 * @return void
 */
export function checkIPAddressWithExceptionIPv6(ip: string) {
  if (!isIPAddressIPv6(ip)) {
    throw new Error(`${ip} is not a valid IPv6 address.`);
  }
}

/**
 * Checks whether the input is a valid IP range
 * @throws Error if the input is not a valid IP range
 * @return void
 */
export function checkIPRangeWithException(ip: string) {
  if (!isIPRange(ip)) {
    throw new Error(`${ip} is not a valid IP range.`);
  }
}

/**
 * Checks whether the input is a valid IPv4 range
 * @throws Error if the input is not a valid IP range
 * @return void
 */
export function checkIPRangeWithExceptionIPv4(ip: string) {
  if (!isIPRangeIPv4(ip)) {
    throw new Error(`${ip} is not a valid IP range.`);
  }
}

/**
 * Checks whether the input is a valid IPv6 range
 * @throws Error if the input is not a valid IP range
 * @return void
 */
export function checkIPRangeWithExceptionIPv6(ip: string) {
  if (!isIPRangeIPv6(ip)) {
    throw new Error(`${ip} is not a valid IP range.`);
  }
}

/**
 * Checks whether the input is a valid IP which contains all format
 * @throws Error if the input is not a valid IP which contains all format
 * @return void
 */
export function checkIPAllFormat(ip: string) {
  const ip_arr = ip.split('-');
  const count = ip_arr.length;
  switch (count) {
    case 1:
      checkIPAddressWithException(ip);
      break;
    case 2:
      checkIPRangeWithException(ip);
      break;
    default:
      throw new Error(`${ip} is not in valid IP format.`);
  }
}

/**
 * Checks whether the input is a valid IPv4 which contains all format
 * @throws Error if the input is not a valid IP which contains all format
 * @return void
 */
export function checkIPAllFormatIPv4(ip: string) {
  const ip_arr = ip.split('-');
  const count = ip_arr.length;
  switch (count) {
    case 1:
      checkIPAddressWithExceptionIPv4(ip);
      break;
    case 2:
      checkIPRangeWithExceptionIPv4(ip);
      break;
    default:
      throw new Error(`${ip} is not in valid IP format.`);
  }
}

/**
 * Checks whether the input is a valid IPv6 which contains all format
 * @throws Error if the input is not a valid IP which contains all format
 * @return void
 */
export function checkIPAllFormatIPv6(ip: string) {
  const ip_arr = ip.split('-');
  const count = ip_arr.length;
  switch (count) {
    case 1:
      checkIPAddressWithExceptionIPv6(ip);
      break;
    case 2:
      checkIPRangeWithExceptionIPv6(ip);
      break;
    default:
      throw new Error(`${ip} is not in valid IP format.`);
  }
}

/**
 * Checks whether the input is a valid IP which contains all format or *
 * @throws Error if the input is not a valid IP which contains all format or *
 * @return void
 */
export function checkIPAllFormatWithAny(ip: string) {
  if (ip !== '*') {
    checkIPAllFormat(ip);
  }
}
