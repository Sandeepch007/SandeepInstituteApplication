import { TestBed } from '@angular/core/testing';

import { WebaiService } from './webai.service';

describe('WebaiService', () => {
  let service: WebaiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebaiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
