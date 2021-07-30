import { TestBed } from '@angular/core/testing';

import { CheckCustomerProfileService } from './check-customer-profile.service';

describe('CheckCustomerProfileService', () => {
  let service: CheckCustomerProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckCustomerProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
