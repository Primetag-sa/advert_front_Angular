import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgWelcomComponent } from './msg-welcom.component';

describe('MsgWelcomComponent', () => {
  let component: MsgWelcomComponent;
  let fixture: ComponentFixture<MsgWelcomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MsgWelcomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MsgWelcomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
