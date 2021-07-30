import { TestBed } from '@angular/core/testing';

import { GetBrandsService } from './get-brands.service';

describe('GetBrandsService', () => {
  let service: GetBrandsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetBrandsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
