import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyNotificationComponent } from './agency-notification.component';

describe('AgencyNotificationComponent', () => {
  let component: AgencyNotificationComponent;
  let fixture: ComponentFixture<AgencyNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgencyNotificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgencyNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
