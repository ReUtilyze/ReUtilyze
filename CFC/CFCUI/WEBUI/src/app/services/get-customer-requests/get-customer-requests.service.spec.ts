import { TestBed } from '@angular/core/testing';

import { GetCustomerRequestsService } from './get-customer-requests.service';

describe('GetCustomerRequestsService', () => {
  let service: GetCustomerRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCustomerRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
