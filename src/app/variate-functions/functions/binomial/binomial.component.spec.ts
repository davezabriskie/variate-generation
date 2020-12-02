import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinomialComponent } from './binomial.component';

describe('BinomialComponent', () => {
  let component: BinomialComponent;
  let fixture: ComponentFixture<BinomialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BinomialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinomialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
