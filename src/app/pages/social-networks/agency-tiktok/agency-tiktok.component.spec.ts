import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyTiktokComponent } from './agency-tiktok.component';

describe('AgencyTiktokComponent', () => {
  let component: AgencyTiktokComponent;
  let fixture: ComponentFixture<AgencyTiktokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgencyTiktokComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgencyTiktokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
