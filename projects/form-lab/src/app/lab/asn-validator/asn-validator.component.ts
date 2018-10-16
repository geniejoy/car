import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GnaValidatorsService } from 'gna-validators';

@Component({
  selector: 'gna-asn-validator',
  templateUrl: './asn-validator.component.html',
  styleUrls: ['./asn-validator.component.scss']
})
export class AsnValidatorComponent implements OnInit, AfterViewInit {
  formGroup: FormGroup;
  formControl: FormControl;
  title = 'asn-validator';
  errorMessage = [];
  constructor(private fb: FormBuilder, private gnaValidatorsService: GnaValidatorsService) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      subnetworkAsn: ['', [this.gnaValidatorsService.subnetworkAsnValidator]]
    });
  }

  ngAfterViewInit() {
    // TODO should only validate the input when user is done editing current line
    this.formGroup.get('subnetworkAsn').valueChanges.subscribe(() => {
      const errorCode = 'invalidValue';
      this.errorMessage.length = 0;
      if (this.formGroup.get('subnetworkAsn').hasError(errorCode)) {
        this.errorMessage = this.formGroup.get('subnetworkAsn').errors[errorCode];
      }
    });
  }
}
