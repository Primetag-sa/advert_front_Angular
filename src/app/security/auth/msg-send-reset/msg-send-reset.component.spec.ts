import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgSendResetComponent } from './msg-send-reset.component';

describe('MsgSendResetComponent', () => {
  let component: MsgSendResetComponent;
  let fixture: ComponentFixture<MsgSendResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MsgSendResetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MsgSendResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
