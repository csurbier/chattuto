import { TestBed } from '@angular/core/testing';

import { AutoGuard } from './auto.guard';

describe('AutoGuard', () => {
  let guard: AutoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AutoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
