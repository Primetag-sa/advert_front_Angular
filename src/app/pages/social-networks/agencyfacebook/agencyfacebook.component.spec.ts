import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyfacebookComponent } from './agencyfacebook.component';

describe('AgencyfacebookComponent', () => {
  let component: AgencyfacebookComponent;
  let fixture: ComponentFixture<AgencyfacebookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgencyfacebookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgencyfacebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
