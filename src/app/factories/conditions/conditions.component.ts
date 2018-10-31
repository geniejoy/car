import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-factories-conditions',
  templateUrl: './conditions.component.html',
  styleUrls: ['./conditions.component.scss']
})
export class ConditionsComponent implements OnInit, OnChanges {
  @Input() customer = 0;
  @Input() carNo = 0;
  @Input() sDate = '2018-10-1';
  @Input() eDate = '2018-10-31';
  @Output() customerChange = new EventEmitter();
  @Output() carNoChange;
  @Output() sDateChange;
  @Output() eDateChange;

  constructor() {}

  ngOnInit() {
    console.log('conditions ngOnInit:');
  }

  ngOnChanges(changes) {
    console.log('conditions:', changes);
    if (changes['customer']) {
      // this.customerChange.emit(this.customer);
    }
  }
}
