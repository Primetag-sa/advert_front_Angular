import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyRapportComponent } from './agency-rapport.component';

describe('AgencyRapportComponent', () => {
  let component: AgencyRapportComponent;
  let fixture: ComponentFixture<AgencyRapportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgencyRapportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgencyRapportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
