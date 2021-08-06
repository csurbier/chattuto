import { TestBed } from '@angular/core/testing';

import { UserManagerServiceService } from './user-manager-service.service';

describe('UserManagerServiceService', () => {
  let service: UserManagerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserManagerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
