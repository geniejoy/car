import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-factories',
  templateUrl: './factories.component.html',
  styleUrls: ['./factories.component.scss']
})
export class FactoriesComponent implements OnInit, OnChanges {
  @Input() customer;
  @Input() carNo;
  @Input()
  sDate = new Date(Date.now() - 7 * 24 * 3600 * 1000)
    .toLocaleDateString('zh', { year: 'numeric', month: '2-digit', day: '2-digit' })
    .replace(/\//g, '-');
  @Input()
  eDate = new Date(Date.now())
    .toLocaleDateString('zh', { year: 'numeric', month: '2-digit', day: '2-digit' })
    .replace(/\//g, '-');
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
