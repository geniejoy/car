import { APP_BASE_HREF } from '@angular/common';
import { AppComponent } from './app.component';
import { async, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IpValidatorComponent } from './lab/ip-validator/ip-validator.component';
import { LabNavComponent } from './lab-nav/lab-nav.component';
import { LabRoutingModule } from './lab/lab-routing.module';
import { MaterialModule } from '@shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, LabNavComponent, IpValidatorComponent],
      imports: [BrowserAnimationsModule, MaterialModule, ReactiveFormsModule, LabRoutingModule],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
