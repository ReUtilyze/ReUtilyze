import { TestBed } from '@angular/core/testing';

import { GetDashboardDataService } from './get-dashboard-data.service';

describe('GetDashboardDataService', () => {
  let service: GetDashboardDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetDashboardDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
