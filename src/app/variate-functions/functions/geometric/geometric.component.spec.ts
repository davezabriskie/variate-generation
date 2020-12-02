import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeometricComponent } from './geometric.component';

describe('GeometricComponent', () => {
  let component: GeometricComponent;
  let fixture: ComponentFixture<GeometricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeometricComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeometricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
