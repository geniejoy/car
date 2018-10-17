import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MatExpansionPanel, MatOptionSelectionChange } from '@angular/material';
import { Observable } from 'rxjs';
import { SideNavMenuItem, SideNavMenuItemRoutes } from './sidenav.model';
import { SidenavService } from './sidenav.service';
import { Subscription } from 'apollo-client/util/Observable';

interface SideNavSearchItem {
  name: string;
  sub?: string;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren(MatExpansionPanel) expansionPanel: QueryList<MatExpansionPanel>;
  menuItems: Array<SideNavMenuItem>;
  subscription: Subscription;

  /* items is summary, just fix display name */
  itemsActive: boolean;
  customersActive: boolean;
  factoriesActive: boolean;
  @Input() changeSidenav: boolean;
  @Output() firePending: EventEmitter<boolean>;
  searchData: Array<SideNavSearchItem>;
  searchBox: FormControl;
  searchFilterData: Observable<any[]>;
  items = '零件';
  customers = '客戶';
  factories = '維修記錄';

  constructor(private sidenavService: SidenavService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.firePending = new EventEmitter();
    this.routerSubscribe();
  }
  ngOnInit() {
    this.searchBox = new FormControl();
  }

  ngAfterViewInit() {
    this.initSearchData();
    this.subscribeSearchBoxValueChange();
  }
  getSideNavStatus() {
    return this.sidenavService.getSideNavIsOpen();
  }

  changeSideNavStatus(isMenuItem?: boolean) {
    this.sidenavService.changeSideNavStatus();
    /* if click menuItem just material component nature action */
    if (!isMenuItem) {
      // if sidenav not open then close mat-accordion children items;
      if (!this.getSideNavStatus()) {
        this.expansionPanel.map(item => {
          item.close();
        });
      } else {
        this.openActiveItem();
      }
    }
  }

  ifSideNavIsCloseThenOpen(isMenuItem?: boolean) {
    /* if side bar is close then open the side bar */
    if (!this.getSideNavStatus()) {
      this.changeSideNavStatus(isMenuItem);
    }
  }

  /* reset menu item and sub item color */
  resetFocusColor() {
    if (!this.menuItems) {
      return;
    }
    this.menuItems.filter((menuItem: SideNavMenuItem) => !menuItem.category).map((menuItem: SideNavMenuItem) => {
      menuItem.active = false;
      menuItem.routes.map(subMenuItem => {
        subMenuItem.active = false;
      });
    });
  }

  /*
    this function is init Report data
    if you want to add some data or category with data
    just follow below sample
    describe: Has category Reports, has data Detail and router is report.
    {
      name: 'Reports',
      category: true
    },
    {
      name: 'Report',
      icon: 'assignment',
      routes: [{ name: 'Details', route: 'report' }]
    }
  */

  initMenuItemData() {
    this.menuItems = [];
    // this.menuItems = [
    //   {
    //     name: 'System',
    //     category: true
    //   },
    //   {
    //     name: 'System',
    //     icon: 'build',
    //     routes: [{ name: 'Configure', route: '/system' }]
    //   }
    // ];
    /* add index */
    this.menuItems = this.menuItems.map((menuItem, index) => ({ ...menuItem, index: index }));
  }

  /* for subscribe router to color for menu item */
  routerSubscribe() {
    this.subscription = this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        const splitUrl = event.url.split('/');
        const lastUrl = splitUrl[splitUrl.length - 1];
        this.resetFocusColor();
        /* check items */
        this.itemsActive = false;
        this.customersActive = false;
        if (lastUrl === 'items') {
          this.itemsActive = true;
        } else if (lastUrl === 'customers') {
          this.customersActive = true;
        } else if (lastUrl === 'factories') {
          this.factoriesActive = true;
        } else {
          /* check report data */
          this.menuItems.filter((menuItem: SideNavMenuItem) => !menuItem.category).map((menuItem: SideNavMenuItem) => {
            menuItem.routes.map(subMenuItem => {
              /* router path is equal then color it */
              if (this.compareUrl(subMenuItem.route, splitUrl)) {
                this.menuItems[menuItem.index].active = true;
                subMenuItem.active = true;
              }
            });
          });
        }
        /* router must in constructor but item need to pending and get dom, so here delay 50s */
        setTimeout(() => {
          this.detectActiveAndOpenPanel();
          this.fireSidenavPending();
        }, 50);
      }
    });
  }

  /* compare url is equal */
  compareUrl(originUrl: string, compareUrl: Array<string>): boolean {
    const compareUrlLength = compareUrl.length;
    const lastCompareUrl = compareUrl[compareUrlLength - 1];
    const originSplitUrl = originUrl.split('/');
    const originUrlLength = originSplitUrl.length;
    if (originUrlLength === 1) {
      return lastCompareUrl === originUrl;
    } else {
      let count = 0;
      for (let i = 0; i < originUrlLength; i++) {
        /* compare order by last item */
        const origin = originSplitUrl[originUrlLength - i - 1];
        const compare = compareUrl[compareUrlLength - i - 1];
        count = origin === compare ? count + 1 : count;
      }
      return count === originUrlLength;
    }
  }

  /* call this function will expand item if it is active */
  openActiveItem() {
    this.expansionPanel.map((item, index) => {
      if (this.menuItems[index].active) {
        item.open();
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /* for search */
  initSearchData() {
    const refactorData = [];
    refactorData.push({ name: this.items });
    refactorData.push({ name: this.customers });
    refactorData.push({ name: this.factories });
    if (this.menuItems) {
      this.menuItems.filter(menuItem => !menuItem.category).map(menuItem => {
        menuItem.routes.map(subMenuItem => {
          refactorData.push({ name: menuItem.name, sub: subMenuItem.name });
        });
      });
    }
    this.searchData = refactorData;
  }

  /* detect search input value change */
  subscribeSearchBoxValueChange() {
    this.searchFilterData = this.searchBox.valueChanges.pipe(
      startWith(''),
      map(val => (val ? this.filterSearchData(val) : this.searchData.slice()))
    );
  }

  /* filter data by input value */
  filterSearchData(val: string) {
    const lowCaseVal = val.toLowerCase();
    return this.searchData.filter(data => {
      const name = data.name.toLowerCase();
      const sub = data.sub ? data.sub.toLowerCase() : '';
      const hasNameVal = name.indexOf(lowCaseVal) !== -1;
      const hasSubVal = sub.indexOf(lowCaseVal) !== -1;
      return hasNameVal || hasSubVal;
    });
  }

  /* click option and go location */
  goSelectItemRoute(event: MatOptionSelectionChange, val: SideNavSearchItem, search: HTMLElement) {
    // detect is user input then go location
    if (event.isUserInput) {
      let route;
      if (val.sub) {
        // filter not group > compare name is equal because we need to find route > find route and go
        this.menuItems
          .filter(menuItem => !menuItem.category)
          .filter(menuItem => this.stringIsEqual(menuItem.name, val.name))
          .map(menuItem => {
            menuItem.routes.map(subMenuItem => {
              if (this.stringIsEqual(subMenuItem.name, val.sub)) {
                route = subMenuItem.route.split('/');
              }
            });
          });
      } else {
        route = ['summary'];
      }
      this.router.navigate([...route], { relativeTo: this.activatedRoute });
      search.blur();
    }
  }

  /* compare string */
  stringIsEqual(val1: string, val2: string) {
    return val1.toLowerCase() === val2.toLowerCase();
  }

  /* close all expand menu item */
  closeAllExpandPanel() {
    this.expansionPanel.map(item => {
      item.close();
    });
  }

  /* hightLight search value */
  highLightWord(value: string) {
    const replaceVal = this.searchBox.value || '';
    const lowerCaseVal = replaceVal.toLowerCase();
    const start = value.toLowerCase().indexOf(lowerCaseVal);
    // input value is null or not the same word return origin value.
    if (!replaceVal || start === -1) {
      return value;
    }
    // get highlight word position and replace it to bold style
    const hightLightLength = lowerCaseVal.length;
    const hightLightVal = value.substr(start, hightLightLength);
    const regex = new RegExp(hightLightVal, 'g');
    return value.replace(regex, `<span class="highlight">${hightLightVal}</span>`);
  }

  /* detect active and expand menu item if sidebar is open */
  detectActiveAndOpenPanel() {
    if (this.getSideNavStatus()) {
      this.openActiveItem();
    }
  }

  onTranslateDashboard(dashboardTranslate: string) {
    this.items = dashboardTranslate;
  }

  /* because we use change detection on push, so if we in lazy loading we need to pending self */
  fireSidenavPending() {
    this.firePending.emit(!this.changeSidenav);
  }
}
