import { TestBed } from '@angular/core/testing';

import { RoleComponentService } from './role.component.service';

describe('RoleComponentService', () => {
  let service: RoleComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
