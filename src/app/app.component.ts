import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor(private router: Router) {}
  title = 'app';
  logout() {}

  openMenu(link) {
    // this.trigger.openMenu();
    this.router.navigate([`/${link}`]);
  }
}
