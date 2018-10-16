import { AbstractControl, ValidationErrors } from '@angular/forms';
import { checkBgpCommunityString } from '../utils/bgp-community-validator.func';
import { checkCIDRWithException, checkIPRangeWithException } from '../utils/ip-validator.func';
import { Injectable } from '@angular/core';
import { asPathPrependValidator, subnetworkAsPathValidator } from '../utils/as-path-validator.func';
import { subnetworkAsnValidator } from '../utils/as-number-validator.func';
@Injectable({
  providedIn: 'root'
})
export class GnaValidatorsService {
  constructor() {}
  subnetworkIpValidator(control: AbstractControl): ValidationErrors | null {
    // only IP prefix, IP range with permit, deny
    const data = control.value;
    const removalIpAccess = function(entryIp: string): string {
      const permitDeny = ['p ', 'permit ', 'd ', 'deny '];
      permitDeny.forEach(removalKey => {
        entryIp = entryIp.toLowerCase().replace(removalKey, '');
      });
      return entryIp;
    };
    if (typeof data === 'undefined' || data.length === 0) {
      return null;
    }
    const entryArr = data.split('\n');
    let isValid = true;
    const msg = [];
    entryArr.forEach((entry, inx) => {
      const newEntry = removalIpAccess(entry);
      try {
        checkCIDRWithException(newEntry);
      } catch (e) {
        try {
          checkIPRangeWithException(newEntry);
        } catch (e) {
          if (msg.indexOf(e.message) === -1) {
            msg.push(`[Line ${inx + 1}] ${e.message}`);
          }
          isValid = false;
        }
      }
    });
    if (isValid) {
      return null;
    } else {
      // @TODO i18n error message and better design.
      return { invalidValue: msg.slice() };
    }
  }

  subnetworkBgpCsValidator(control: AbstractControl): ValidationErrors | null {
    const data: string = control.value;
    if (typeof data === 'undefined' || data.length === 0) {
      return null;
    }
    const bgpCsEntryArr = data.split('\n');
    let flag = true;
    const msg = [];
    bgpCsEntryArr.forEach((bgpCsEntry, inx) => {
      try {
        checkBgpCommunityString(bgpCsEntry);
      } catch (e) {
        if (msg.indexOf(e.message) === -1) {
          msg.push(`[Line ${inx + 1}] ${e.message}`);
        }
        flag = false;
      }
    });
    if (flag) {
      return null;
    } else {
      return { invalidValue: msg.slice() };
    }
  }

  subnetworkAsnValidator(control: AbstractControl): ValidationErrors | null {
    return subnetworkAsnValidator(control);
  }

  /**
   * Validates as-path format
   */
  subnetworkAsPathValidator(control: AbstractControl): ValidationErrors | null {
    return subnetworkAsPathValidator(control);
  }

  /**
   * Validates prepend as-path format
   */
  asPathPrependValidator(control: AbstractControl): ValidationErrors | null {
    return asPathPrependValidator(control);
  }
}
