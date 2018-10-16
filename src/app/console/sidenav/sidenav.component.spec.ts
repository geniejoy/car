import { SharedModule } from '@shared/shared.module';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SidenavService } from '@console/sidenav/sidenav.service';
import { SidenavTranslateComponent } from './sidenav-translate/sidenav-translate.component';
import { SidenavComponent } from './sidenav.component';

describe('SidenavComponent', () => {
  let fixture: ComponentFixture<SidenavComponent>;
  let app: SidenavComponent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidenavComponent, SidenavTranslateComponent],
      imports: [SharedModule, RouterTestingModule.withRoutes([])],
      providers: [SidenavService]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SidenavComponent);
        app = fixture.debugElement.componentInstance;
      });
  }));
  it('should create SidenavComponent', async(() => {
    expect(app).toBeTruthy();
  }));
  describe('func:compareUrl', () => {
    it('should func will return true if params is equal', () => {
      const originVal = 'dashboard';
      const compareVal = ['dashboard'];
      expect(app.compareUrl(originVal, compareVal)).toBeTruthy();
    });
    it('should func will return false if params is not equal', () => {
      const originVal = 'summary';
      const compareVal = ['dashboard'];
      expect(app.compareUrl(originVal, compareVal)).toBeFalsy();
    });
  });
  describe('func:filterSearchData', () => {
    it('should func return not empty array if params is like searchData', () => {
      app.searchData = [{ name: 'Hello', sub: 'World!' }];
      expect(app.filterSearchData('Hel').length).not.toBe(0);
    });

    it('should func return empty array if params is unlike searchData', () => {
      app.searchData = [{ name: 'Hello', sub: 'World!' }];
      expect(app.filterSearchData('hey').length).toBe(0);
    });
  });

  describe('func:resetFocusColor', () => {
    it('should all active change to false if call func', () => {
      app.menuItems = [{ name: 'Hello', active: true, routes: [] }];
      app.resetFocusColor();
      expect(app.menuItems[0].active).toBeFalsy();
    });
  });
});
