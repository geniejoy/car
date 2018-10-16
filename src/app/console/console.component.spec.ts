import { SharedModule } from '@shared/shared.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { ConsoleComponent } from '@console/console.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationService } from '@auth/login-services/authentication.service';
import { HeaderComponent } from '@console/header/header.component';
import { SidenavComponent } from '@console/sidenav/sidenav.component';
import { SidenavTranslateComponent } from '@console/sidenav/sidenav-translate/sidenav-translate.component';
import { LogoutIconComponent } from '@console/header/logout-icon/logout-icon.component';
import { SidenavService } from '@console/sidenav/sidenav.service';

describe('ConsoleComponent', () => {
  let component: ConsoleComponent;
  let fixture: ComponentFixture<ConsoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConsoleComponent,
        HeaderComponent,
        SidenavComponent,
        LogoutIconComponent,
        SidenavTranslateComponent
      ],
      imports: [HttpClientModule, RouterTestingModule, BrowserAnimationsModule, SharedModule],
      providers: [AuthenticationService, SidenavService]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ConsoleComponent);
        component = fixture.debugElement.componentInstance;
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
