import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionParametersComponent } from './function-parameters.component';

describe('FunctionParametersComponent', () => {
  let component: FunctionParametersComponent;
  let fixture: ComponentFixture<FunctionParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunctionParametersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
