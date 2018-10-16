import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GnaValidatorsService } from 'gna-validators';

@Component({
  selector: 'gna-as-path-validator',
  templateUrl: './as-path-validator.component.html',
  styleUrls: ['./as-path-validator.component.scss']
})
export class AsPathValidatorComponent implements OnInit, AfterViewInit {
  formGroup: FormGroup;
  formControl: FormControl;
  title = 'as-path-validator';
  errorMessage = [];
  prependErrorMessage = [];
  constructor(private fb: FormBuilder, private gnaValidatorsService: GnaValidatorsService) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      subnetworkAsPath: ['', [this.gnaValidatorsService.subnetworkAsPathValidator]],
      asPathPrepend: ['', [this.gnaValidatorsService.asPathPrependValidator]]
    });
  }

  ngAfterViewInit() {
    // TODO should only validate the input when user is done editing current line
    this.formGroup.get('subnetworkAsPath').valueChanges.subscribe(() => {
      const errorCode = 'invalidValue';
      this.errorMessage.length = 0;
      if (this.formGroup.get('subnetworkAsPath').hasError(errorCode)) {
        this.errorMessage = this.formGroup.get('subnetworkAsPath').errors[errorCode];
      }
    });
    this.formGroup.get('asPathPrepend').valueChanges.subscribe(() => {
      const errorCodes = ['invalidValue', 'duplicatedValue'];
      this.prependErrorMessage.length = 0;
      errorCodes.forEach(errorCode => {
        if (this.formGroup.get('asPathPrepend').hasError(errorCode)) {
          this.prependErrorMessage.push(this.formGroup.get('asPathPrepend').errors[errorCode]);
        }
      });
    });
  }
}
