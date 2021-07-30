import { TestBed } from '@angular/core/testing';

import { GetClaimRequestDataService } from './get-claim-request-data.service';

describe('GetClaimRequestDataService', () => {
  let service: GetClaimRequestDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetClaimRequestDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
