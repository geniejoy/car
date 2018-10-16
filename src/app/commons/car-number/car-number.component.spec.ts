import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarNumberComponent } from './car-number.component';

describe('CarNumberComponent', () => {
  let component: CarNumberComponent;
  let fixture: ComponentFixture<CarNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
