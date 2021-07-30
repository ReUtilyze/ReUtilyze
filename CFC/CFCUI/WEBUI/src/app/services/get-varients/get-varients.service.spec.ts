import { TestBed } from '@angular/core/testing';

import { GetVarientsService } from './get-varients.service';

describe('GetVarientsService', () => {
  let service: GetVarientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetVarientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
