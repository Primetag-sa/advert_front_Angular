import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyInstagramComponent } from './agency-instagram.component';

describe('AgencyInstagramComponent', () => {
  let component: AgencyInstagramComponent;
  let fixture: ComponentFixture<AgencyInstagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgencyInstagramComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgencyInstagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
