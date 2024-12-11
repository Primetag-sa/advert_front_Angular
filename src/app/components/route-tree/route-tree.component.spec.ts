import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteTreeComponent } from './route-tree.component';

describe('RouteTreeComponent', () => {
  let component: RouteTreeComponent;
  let fixture: ComponentFixture<RouteTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RouteTreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RouteTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
