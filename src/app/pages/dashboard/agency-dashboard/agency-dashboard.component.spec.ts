import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyDashboardComponent } from './agency-dashboard.component';

describe('AgencydashboardComponent', () => {
  let component: AgencyDashboardComponent;
  let fixture: ComponentFixture<AgencyDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgencyDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
