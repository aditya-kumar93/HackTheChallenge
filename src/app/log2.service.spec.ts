import { TestBed } from '@angular/core/testing';

import { Log2Service } from './log2.service';

describe('Log2Service', () => {
  let service: Log2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Log2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
