import { Component, OnInit , Input, Output, OnChanges} from '@angular/core';

@Component({
  selector: 'app-factories-conditions',
  templateUrl: './conditions.component.html',
  styleUrls: ['./conditions.component.scss']
})
export class ConditionsComponent implements OnInit, OnChanges {
  @Input() customer;
  @Input() carNo;
  @Input() sDate;
  @Input() eDate;
  @Output() customerChange;
  @Output() carNoChange;
  @Output() dateChange;
  sLabel = '開始日期:';
  eLabel = '結束日期:';

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
