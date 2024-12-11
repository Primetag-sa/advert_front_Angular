import { TestBed } from '@angular/core/testing';

import { SnapchatService } from './snapchat.service';

describe('SnapchatService', () => {
  let service: SnapchatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnapchatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
