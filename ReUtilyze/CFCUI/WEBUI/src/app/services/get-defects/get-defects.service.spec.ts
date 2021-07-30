import { TestBed } from '@angular/core/testing';

import { GetDefectsService } from './get-defects.service';

describe('GetDefectsService', () => {
  let service: GetDefectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetDefectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
