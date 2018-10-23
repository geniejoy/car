import { Component, OnInit, Input, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'app-factories-conditions',
  templateUrl: './conditions.component.html',
  styleUrls: ['./conditions.component.scss']
})
export class ConditionsComponent implements OnInit, OnChanges {
  @Input() customer;
  @Input() carNo;
  @Input() options;
  @Output() customerChange;
  @Output() carNoChange;
  @Output() optionsChange;

  constructor() {}

  ngOnInit() {
    console.log('conditions ngOnInit:');
  }

  ngOnChanges(changes) {
    console.log('conditions:', changes);
    this.customerChange.emit(this.customer);
    this.carNoChange.emit(this.carNo);
    this.optionsChange.emit(this.options);
    // if (changes['customer']) {
    // }
  }
}
