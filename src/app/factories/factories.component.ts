import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-factories',
  templateUrl: './factories.component.html',
  styleUrls: ['./factories.component.scss']
})
export class FactoriesComponent implements OnInit, OnChanges {
  @Input() customer = 0;
  @Input() carNo = 0;
  @Input() sDate = '';
  @Input() eDate = '';
  @Output() customerChange = new EventEmitter();
  @Output() carNoChange = new EventEmitter();
  @Output() sDateChange = new EventEmitter();
  @Output() eDateChange = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes) {
    console.log('cc changes:', changes);
    if (changes['customer'] && this.customer) {
      // this.customerChange.emit(this.customer);
    }
  }
}
