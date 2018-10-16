import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GnaValidatorsService } from 'gna-validators';

@Component({
  selector: 'gna-bgp-cs-validator',
  templateUrl: './bgp-cs-validator.component.html',
  styleUrls: ['./bgp-cs-validator.component.scss']
})
export class BgpCsValidatorComponent implements OnInit, AfterViewInit {
  formGroup: FormGroup;
  formControl: FormControl;
  title = 'bgp-cs-validator';
  errorMessage = [];
  constructor(private fb: FormBuilder, private gnaValidatorsService: GnaValidatorsService) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      subnetworkBgpCs: ['', [this.gnaValidatorsService.subnetworkBgpCsValidator]]
    });
  }

  ngAfterViewInit() {
    // TODO should only validate the input when user is done editing current line
    this.formGroup.get('subnetworkBgpCs').valueChanges.subscribe(() => {
      const errorCode = 'invalidValue';
      this.errorMessage.length = 0;
      if (this.formGroup.get('subnetworkBgpCs').hasError(errorCode)) {
        this.errorMessage = this.formGroup.get('subnetworkBgpCs').errors[errorCode];
      }
    });
  }
}
