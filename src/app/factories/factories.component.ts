import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-factories',
  templateUrl: './factories.component.html',
  styleUrls: ['./factories.component.scss']
})
export class FactoriesComponent implements OnInit, OnChanges {
  @Input() customer;
  @Input() carNo;
  @Input() sDate: string;
  @Input()
  eDate: string = new Date(Date.now())
    .toLocaleDateString('zh', { year: 'numeric', month: '2-digit', day: '2-digit' })
    .replace(/\//g, '-');
  @Output() customerChange = new EventEmitter();
  @Output() carNoChange = new EventEmitter();
  @Output() sDateChange = new EventEmitter();
  @Output() eDateChange = new EventEmitter();

  constructor() {
    this.getStartDate();
  }

  getStartDate() {
    const tmp = new Date(this.eDate);
    let s;
    if (Number(tmp.getDate()) > 10) {
      s = new Date(tmp.getFullYear(), tmp.getMonth(), 1);
    } else {
      s = new Date(tmp.getFullYear(), tmp.getMonth() - 1, 1);
    }
    this.sDate = s.toLocaleDateString('zh', { year: 'numeric', month: '2-digit', day: '2-digit' })
      .replace(/\//g, '-');
  }

  ngOnInit() {}

  ngOnChanges(changes) {
    console.log('cc changes:', changes);
    if (changes['customer'] && this.customer) {
      // this.customerChange.emit(this.customer);
    }
  }
}
