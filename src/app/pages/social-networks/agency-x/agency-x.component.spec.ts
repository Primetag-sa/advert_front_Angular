import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyXComponent } from './agency-x.component';

describe('AgencyXComponent', () => {
  let component: AgencyXComponent;
  let fixture: ComponentFixture<AgencyXComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgencyXComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgencyXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
