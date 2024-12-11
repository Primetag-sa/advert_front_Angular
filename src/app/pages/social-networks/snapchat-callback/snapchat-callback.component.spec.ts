import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapchatCallbackComponent } from './snapchat-callback.component';

describe('SnapchatCallbackComponent', () => {
  let component: SnapchatCallbackComponent;
  let fixture: ComponentFixture<SnapchatCallbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SnapchatCallbackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SnapchatCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
