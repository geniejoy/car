import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GnaValidatorsService } from 'gna-validators';

@Component({
  selector: 'gna-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  formControl: FormControl;
  title = 'gna';
  errorMessage = [];
  constructor(private gnaValidatorsService: GnaValidatorsService) {}

  ngOnInit() {
    this.formControl = new FormControl('', [this.gnaValidatorsService.subnetworkIpValidator]);
  }

  ngAfterViewInit() {
    // TODO should only validate the input when user is done editing current line
    this.formControl.valueChanges.subscribe(() => {
      const errorCode = 'invalidValue';
      this.errorMessage.length = 0;
      if (this.formControl.hasError(errorCode)) {
        this.errorMessage = this.formControl.errors[errorCode];
      }
    });
  }
}
