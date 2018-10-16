import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {
  changeSidenav: boolean;
  constructor() {
    this.changeSidenav = false;
  }

  ngOnInit() {}

  pendingSideNav() {
    this.changeSidenav = !this.changeSidenav;
  }
}
