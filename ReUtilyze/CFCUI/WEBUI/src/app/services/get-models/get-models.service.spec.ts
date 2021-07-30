import { TestBed } from '@angular/core/testing';

import { GetModelsService } from './get-models.service';

describe('GetModelsService', () => {
  let service: GetModelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetModelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
