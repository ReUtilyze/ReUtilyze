import { TestBed } from '@angular/core/testing';

import { GetCustomerPointsService } from './get-customer-points.service';

describe('GetCustomerPointsService', () => {
  let service: GetCustomerPointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCustomerPointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
