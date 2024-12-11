import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencySnapshatComponent } from './agency-snapshat.component';

describe('AgencySnapshatComponent', () => {
  let component: AgencySnapshatComponent;
  let fixture: ComponentFixture<AgencySnapshatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgencySnapshatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgencySnapshatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
