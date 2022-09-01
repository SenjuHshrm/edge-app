import { TestBed } from '@angular/core/testing';

import { SuAuthGuard } from './su-auth.guard';

describe('SuAuthGuard', () => {
  let guard: SuAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SuAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
