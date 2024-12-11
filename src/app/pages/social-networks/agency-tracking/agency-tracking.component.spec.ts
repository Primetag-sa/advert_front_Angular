import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyTrackingComponent } from './agency-tracking.component';

describe('AgencyTrackingComponent', () => {
  let component: AgencyTrackingComponent;
  let fixture: ComponentFixture<AgencyTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgencyTrackingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgencyTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
