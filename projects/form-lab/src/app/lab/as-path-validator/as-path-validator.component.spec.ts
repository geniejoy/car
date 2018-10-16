import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsPathValidatorComponent } from './as-path-validator.component';

describe('AsPathValidatorComponent', () => {
  let component: AsPathValidatorComponent;
  let fixture: ComponentFixture<AsPathValidatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AsPathValidatorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsPathValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
