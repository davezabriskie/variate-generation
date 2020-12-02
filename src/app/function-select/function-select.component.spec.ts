import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionSelectComponent } from './function-select.component';

describe('FunctionSelectComponent', () => {
  let component: FunctionSelectComponent;
  let fixture: ComponentFixture<FunctionSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunctionSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
