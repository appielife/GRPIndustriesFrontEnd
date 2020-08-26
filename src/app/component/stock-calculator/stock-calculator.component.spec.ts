import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockCalculatorComponent } from './stock-calculator.component';

describe('StockCalculatorComponent', () => {
  let component: StockCalculatorComponent;
  let fixture: ComponentFixture<StockCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
