import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GammaComponent } from './gamma.component';

describe('GammaComponent', () => {
  let component: GammaComponent;
  let fixture: ComponentFixture<GammaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GammaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GammaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
