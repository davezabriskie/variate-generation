import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BernoulliComponent } from './bernoulli.component';

describe('BernoulliComponent', () => {
  let component: BernoulliComponent;
  let fixture: ComponentFixture<BernoulliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BernoulliComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BernoulliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
