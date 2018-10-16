import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsnValidatorComponent } from './asn-validator.component';

describe('AsnValidatorComponent', () => {
  let component: AsnValidatorComponent;
  let fixture: ComponentFixture<AsnValidatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AsnValidatorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsnValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
