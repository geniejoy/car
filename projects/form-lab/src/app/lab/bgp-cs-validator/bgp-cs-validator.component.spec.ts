import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BgpCsValidatorComponent } from './bgp-cs-validator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@shared/material.module';

describe('BgpCsValidatorComponent', () => {
  let component: BgpCsValidatorComponent;
  let fixture: ComponentFixture<BgpCsValidatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BgpCsValidatorComponent],
      imports: [FormsModule, ReactiveFormsModule, MaterialModule, BrowserAnimationsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BgpCsValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
