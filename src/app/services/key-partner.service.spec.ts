import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { KeyPartnerService } from './key-partner.service';

describe('KeyPartnerService', () => {
  let service: KeyPartnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(KeyPartnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
