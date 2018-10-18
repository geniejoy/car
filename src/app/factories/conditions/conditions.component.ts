import { Component, OnInit , Input, Output, OnChanges} from '@angular/core';

@Component({
  selector: 'app-factories-conditions',
  templateUrl: './conditions.component.html',
  styleUrls: ['./conditions.component.scss']
})
export class ConditionsComponent implements OnInit, OnChanges {
  @Input() customer;
  @Input() carNo;
  @Output() customerChange;
  @Output() carNoChange;

  constructor() {}

  ngOnInit() {
    console.log('conditions ngOnInit:'); }

  ngOnChanges(changes) {
    console.log ('conditions:', changes);
    if (changes['customer']) {
      // this.customerChange.emit(this.customer);
    }
  }
}
