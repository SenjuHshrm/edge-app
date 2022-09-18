import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PurchaseOrderService } from './purchase-order.service';

describe('PurchaseOrderService', () => {
  let service: PurchaseOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PurchaseOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
