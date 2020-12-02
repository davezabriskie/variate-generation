import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeibullComponent } from './weibull.component';

describe('WeibullComponent', () => {
  let component: WeibullComponent;
  let fixture: ComponentFixture<WeibullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeibullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeibullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
