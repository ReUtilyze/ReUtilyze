import { TestBed } from '@angular/core/testing';

import { GetMastersDataService } from './get-masters-data.service';

describe('GetMastersDataService', () => {
  let service: GetMastersDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetMastersDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
