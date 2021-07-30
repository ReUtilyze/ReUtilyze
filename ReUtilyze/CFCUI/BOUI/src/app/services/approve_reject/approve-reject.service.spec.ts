import { TestBed } from '@angular/core/testing';

import { ApproveRejectService } from './approve-reject.service';

describe('ApproveRejectService', () => {
  let service: ApproveRejectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApproveRejectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
