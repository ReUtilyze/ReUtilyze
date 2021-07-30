import { TestBed } from '@angular/core/testing';

import { GetVarientDetailsService } from './get-varient-details.service';

describe('GetVarientDetailsService', () => {
  let service: GetVarientDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetVarientDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
