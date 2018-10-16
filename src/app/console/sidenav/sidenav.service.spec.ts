import { SidenavService } from '@console/sidenav/sidenav.service';
import { async, TestBed } from '@angular/core/testing';
describe('SidenavService', () => {
  let service: SidenavService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [SidenavService]
    })
      .compileComponents()
      .then(() => {
        service = TestBed.get(SidenavService);
      });
  }));

  it('should SideNavIsOpen init value is false', () => {
    expect(service.sideNavIsOpen).toBeFalsy();
  });

  it('should SideNavIsOpen is equal getSideNavIsOpen()', () => {
    expect(service.sideNavIsOpen).toEqual(service.getSideNavIsOpen());
  });

  it('should SideNavIsOpen will change if Call changeSideNavStatus() ', () => {
    service.sideNavIsOpen = false;
    service.changeSideNavStatus();
    expect(service.getSideNavIsOpen).toBeTruthy();
  });
});
