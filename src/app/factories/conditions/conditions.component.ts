import { Component, Input, OnChanges, OnInit, Output, EventEmitter, DoCheck } from '@angular/core';
@Component({
  selector: 'app-factories-conditions',
  templateUrl: './conditions.component.html',
  styleUrls: ['./conditions.component.scss']
})
export class ConditionsComponent implements OnInit, OnChanges, DoCheck {
  @Input() customer = 0;
  @Input() carNo = 0;
  @Input() sDate = '2018-10-1';
  @Input() eDate = '2018-10-31';
  @Output() customerChange = new EventEmitter();
  @Output() carNoChange = new EventEmitter();
  @Output() sDateChange = new EventEmitter();
  @Output() eDateChange = new EventEmitter();

  oldCustomer = 0;
  oldCarNo = 0;
  oldSdate = this.sDate;
  oldEdate = this.eDate;

  constructor() {}

  ngOnInit() {
    console.log('conditions ngOnInit:');
    this.customerChange.emit(this.customer);
    this.carNoChange.emit(this.carNo);
    this.sDateChange.emit(this.sDate);
    this.eDateChange.emit(this.eDate);
  }

  ngOnChanges(changes) {
    console.log('conditions:', changes);
    if (changes['customer']) {
      // this.customerChange.emit(this.customer);
    }
  }

  ngDoCheck() {
    console.log('ngDoCheck:', this.customer);
    if (this.oldCustomer !== this.customer) {
      this.customerChange.emit(this.customer);
      this.oldCustomer = this.customer;
    }
    if (this.oldCarNo !== this.carNo) {
      this.carNoChange.emit(this.carNo);
      this.oldCarNo = this.carNo;
    }
    if (this.oldSdate !== this.sDate) {
      this.sDateChange.emit(this.sDate);
      this.oldSdate = this.sDate;
    }
    if (this.oldEdate !== this.eDate) {
      this.eDateChange.emit(this.eDate);
      this.oldEdate = this.eDate;
    }
  }
}
