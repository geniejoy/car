import { AfterViewInit, Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { GnaValidatorsService } from 'gna-validators';

@Component({
  selector: 'gna-ip-validator',
  templateUrl: './ip-validator.component.html',
  styleUrls: ['./ip-validator.component.scss']
})
export class IpValidatorComponent implements OnInit, AfterViewInit {
  formGroup: FormGroup;
  formControl: FormControl;
  title = 'ip-validator';
  errorMessage = [];
  constructor(private fb: FormBuilder, private gnaValidatorsService: GnaValidatorsService) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      subnetworkIp: ['', [this.gnaValidatorsService.subnetworkIpValidator]]
    });
  }

  ngAfterViewInit() {
    // TODO should only validate the input when user is done editing current line
    this.formGroup.get('subnetworkIp').valueChanges.subscribe(() => {
      const errorCode = 'invalidValue';
      this.errorMessage.length = 0;
      if (this.formGroup.get('subnetworkIp').hasError(errorCode)) {
        this.errorMessage = this.formGroup.get('subnetworkIp').errors[errorCode];
      }
    });
  }
}
