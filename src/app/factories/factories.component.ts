import { Component, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-factories',
  templateUrl: './factories.component.html',
  styleUrls: ['./factories.component.scss']
})
export class FactoriesComponent implements OnInit, OnChanges {
  @Input() customer;
  @Output() customerChange;
  @Input() carNo;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes) {
    console.log('cc changes:', changes);
    if (changes['customer'] && this.customer) {
      // this.customerChange.emit(this.customer);
    }
  }
}
