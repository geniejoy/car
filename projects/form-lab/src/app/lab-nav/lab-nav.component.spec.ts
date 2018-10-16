import { APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { IpValidatorComponent } from '../lab/ip-validator/ip-validator.component';
import { LabNavComponent } from './lab-nav.component';
import { LabRoutingModule } from '../lab/lab-routing.module';
import { MaterialModule } from '../shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
describe('LabNavComponent', () => {
  let component: LabNavComponent;
  let fixture: ComponentFixture<LabNavComponent>;

  beforeEach(
    fakeAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LabNavComponent, IpValidatorComponent],
        imports: [MaterialModule, BrowserAnimationsModule, ReactiveFormsModule, LabRoutingModule],
        providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
      }).compileComponents();

      fixture = TestBed.createComponent(LabNavComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
