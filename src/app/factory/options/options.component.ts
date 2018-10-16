import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {
  @Input() customer;
  @Input() carNo;
  @Output() customerChange;
  // @Output() carNoChange;

  constructor() {}

  ngOnInit() {}
}
