import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IpValidatorComponent } from './ip-validator.component';
import { MaterialModule } from '../../shared/material.module';

describe('IpValidatorComponent', () => {
  let component: IpValidatorComponent;
  let fixture: ComponentFixture<IpValidatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IpValidatorComponent],
      imports: [FormsModule, ReactiveFormsModule, MaterialModule, BrowserAnimationsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
