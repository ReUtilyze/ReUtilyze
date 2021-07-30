import { TestBed } from '@angular/core/testing';

import { ProfileAuthGuard } from './profile-auth-guard.service';

describe('ForceEditService', () => {
  let service: ProfileAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileAuthGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
