import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChildren,
  QueryList,
  ElementRef,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { SideNavMenuItem } from '@console/sidenav/sidenav.model';
@Component({
  selector: 'app-sidenav-translate',
  templateUrl: './sidenav-translate.component.html',
  styleUrls: ['./sidenav-translate.component.scss']
})
export class SidenavTranslateComponent implements AfterViewInit {
  @Input() i18nMenuItems: Array<SideNavMenuItem>; // sidenav origin report
  @Input() i18nDashboard: string; // sidenav origin dashboard
  @Output() translateDashboard: EventEmitter<string>; // translate dashboard emitter
  @ViewChildren('translatePanel') translatePanel: QueryList<ElementRef>; // get menu item translate element
  @ViewChild('dashboardRef') dashboardRef: ElementRef; // get dashboard translate element

  constructor() {
    // init
    this.translateDashboard = new EventEmitter();
  }

  ngAfterViewInit() {
    this.translateForDashboard();
    this.translateForMenuItem();
  }
  translateForDashboard() {
    const _dashboard = this.dashboardRef.nativeElement.textContent;
    this.translateDashboard.emit(_dashboard);
  }
  translateForMenuItem() {
    this.translatePanel
      .map((element, index) => {
        // return menuItem
        const children = element.nativeElement.children;
        return children;
      })
      .map((menuItem, menuItemIndex: number) => {
        const _menuItem = this.i18nMenuItems[menuItemIndex];
        let h2TagLength = 0; // sub menu item length;
        Array.prototype.map.call(menuItem, (content: HTMLElement, contentIndex: number) => {
          /*content is category or menuItem if html tag is h1 */
          if ('H1' === content.tagName) {
            _menuItem.name = content.textContent.trim();
          } else {
            /* sub menuItem */
            _menuItem.routes[h2TagLength].name = content.textContent.trim();
            h2TagLength++;
          }
        });
      });
  }
}
