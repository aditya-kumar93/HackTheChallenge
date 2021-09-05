import { TestBed } from '@angular/core/testing';

import { DataStorageService } from './data-storage.service';

describe('DataStorageServiceService', () => {
  let service: DataStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
