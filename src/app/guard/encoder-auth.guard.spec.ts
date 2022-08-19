import { TestBed } from '@angular/core/testing';

import { EncoderAuthGuard } from './encoder-auth.guard';

describe('EncoderAuthGuard', () => {
  let guard: EncoderAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EncoderAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
