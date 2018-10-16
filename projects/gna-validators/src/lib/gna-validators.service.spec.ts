import * as asnMocks from '../utils/mocks/asn.mock';
import * as asPathMocks from '../utils/mocks/as-path.mock';
import * as bgpCsMocks from '../utils/mocks/bgp-cs.mock';
import { FormControl } from '@angular/forms';
import { GnaValidatorsService } from './gna-validators.service';
import { TestBed } from '@angular/core/testing';

describe('GnaValidatorsService', () => {
  let formControl: FormControl;
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GnaValidatorsService]
    });
    service = TestBed.get(GnaValidatorsService);
  });

  it('should be created', () => {
    expect(GnaValidatorsService).toBeTruthy();
  });

  it('test subnetworkIpValidator-IP Prefix', () => {
    formControl = new FormControl('', [service.subnetworkIpValidator]);

    formControl.setValue('1.2.3.0/24');
    expect(formControl.errors).toBeNull();
    formControl.setValue('p 1.2.3.0/24');
    expect(formControl.errors).toBeNull();
    formControl.setValue('permit 1.2.3.0/24');
    expect(formControl.errors).toBeNull();
    formControl.setValue('d 1.2.3.0/24');
    expect(formControl.errors).toBeNull();
    formControl.setValue('deny 1.2.3.0/24');
    expect(formControl.errors).toBeNull();
    formControl.setValue('1.2.3.4');
    expect(formControl.errors.invalidValue[0]).toBe('[Line 1] 1.2.3.4 is not a valid IP range.');

    formControl.setValue('1.2.3.0/33');
    expect(formControl.invalid).toBeTruthy();
  });

  it('test subnetworkIpValidator-IP Range', () => {
    formControl = new FormControl('', [service.subnetworkIpValidator]);
    formControl.setValue('1.2.3.4-1.2.3.253');
    expect(formControl.errors).toBeNull();
    formControl.setValue('1.2.3.4-1.2.3.256');
    expect(formControl.invalid).toBeTruthy();
  });

  it('test subnetworkBgpCsValidator-BgpCs', () => {
    formControl = new FormControl('', [service.subnetworkBgpCsValidator]);
    bgpCsMocks.correctData.forEach(data => {
      formControl.setValue(data);
      expect(formControl.errors).toBeNull();
    });
    bgpCsMocks.inCorrectData.forEach(data => {
      formControl.setValue(data);
      expect(formControl.invalid).toBeTruthy();
    });
  });

  it('valid asn should pass', () => {
    asnMocks.correctData.forEach(data => {
      expect(service.subnetworkAsnValidator({ value: data })).toBeNull(`${data} is valid, but function says invalid.`);
    });
  });

  it('invalid asn should fail', () => {
    asnMocks.inCorrectData.forEach(data => {
      expect(
        service.subnetworkAsnValidator({
          value: data
        })
      ).not.toBeNull(`${data} is invalid, but function says valid.`);
    });
  });

  it('asn should duplidate', () => {
    asnMocks.duplicatedData.forEach(data => {
      expect(
        service.subnetworkAsnValidator({
          value: data
        })
      ).not.toBeNull(`${data} is duplicated, but function says unique.`);
    });
  });

  it('asn should be unique', () => {
    asnMocks.uniqueData.forEach(data => {
      expect(
        service.subnetworkAsnValidator({
          value: data
        })
      ).toBeNull(`${data} is unique, but function says duplicate.`);
    });
  });

  it('valid asPath should pass', () => {
    formControl = new FormControl('', [service.subnetworkAsPathValidator]);
    asPathMocks.correctData.forEach(data => {
      formControl.setValue(data);
      expect(formControl.errors).toBeNull(`${data} is valid, but function says invalid.`);
    });
  });

  it('invalid asPath should fail', () => {
    formControl = new FormControl('', [service.subnetworkAsPathValidator]);
    asPathMocks.inCorrectData.forEach(data => {
      formControl.setValue(data);
      expect(formControl.invalid).toBeTruthy(`${data} is invalid, but function says valid.`);
    });
  });

  it('invalid no-prepend asPath should fail', () => {
    formControl = new FormControl('', [service.subnetworkAsPathValidator]);
    asPathMocks.prependData.forEach(data => {
      formControl.setValue(data);
      expect(formControl.invalid).toBeTruthy(`${data} is prepending, but function says no-prepend.`);
    });
  });

  it('valid no-prepend asPath should pass', () => {
    formControl = new FormControl('', [service.subnetworkAsPathValidator]);
    asPathMocks.correctData.forEach(data => {
      formControl.setValue(data);
      expect(formControl.errors).toBeNull(`${data} is no-prepend, but function says prepend.`);
    });
  });

  it('valid prepend asPath should pass', () => {
    formControl = new FormControl('', [service.asPathPrependValidator]);
    asPathMocks.prependData.forEach(data => {
      formControl.setValue(data);
      expect(formControl.errors).toBeNull(`${data} is valid prepending data, but function says invalid.`);
    });
  });
});
