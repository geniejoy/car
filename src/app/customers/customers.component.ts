import { Component, OnInit, Input, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit, OnChanges {
  @Input() customer;
  @Output() customerChange;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes) {
    console.log('cc changes:', changes);
    if (changes['customer'] && this.customer) {
      this.customerChange.emit(this.customer);
    }
  }
}
