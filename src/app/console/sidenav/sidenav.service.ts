import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class SidenavService {
  toggleEvent: EventEmitter<boolean> = new EventEmitter();
  sideNavIsOpen: boolean;
  constructor() {
    this.sideNavIsOpen = false;
  }

  getSideNavIsOpen() {
    return this.sideNavIsOpen;
  }

  changeSideNavStatus() {
    this.sideNavIsOpen = !this.sideNavIsOpen;
  }
}
