import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarAgencyComponent } from './sidebar-agency.component';

describe('SidebarAgencyComponent', () => {
  let component: SidebarAgencyComponent;
  let fixture: ComponentFixture<SidebarAgencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarAgencyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
