import { TestBed } from '@angular/core/testing';

import { QuotepriceService } from './quoteprice.service';

describe('QuotepriceService', () => {
  let service: QuotepriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuotepriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
