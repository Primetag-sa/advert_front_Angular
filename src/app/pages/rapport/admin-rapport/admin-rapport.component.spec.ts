import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRapportComponent } from './admin-rapport.component';

describe('RapportComponent', () => {
  let component: AdminRapportComponent;
  let fixture: ComponentFixture<AdminRapportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminRapportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRapportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
