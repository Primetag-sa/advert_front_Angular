import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenaralChartComponent } from './genaral-chart.component';

describe('GenaralChartComponent', () => {
  let component: GenaralChartComponent;
  let fixture: ComponentFixture<GenaralChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenaralChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenaralChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
