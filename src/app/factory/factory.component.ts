import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.scss']
})
export class FactoryComponent implements OnInit {
  @Input() customer;
  @Input() carNo;
  @Output() customerChange;
  @Output() carNoChange;

  constructor() {}

  ngOnInit() {}
}
