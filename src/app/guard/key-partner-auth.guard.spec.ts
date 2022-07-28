import { TestBed } from '@angular/core/testing';

import { KeyPartnerAuthGuard } from './key-partner-auth.guard';

describe('KeyPartnerAuthGuard', () => {
  let guard: KeyPartnerAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(KeyPartnerAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
