import { TestBed } from '@angular/core/testing';

import { UserworkspaceService } from './userworkspace.service';

describe('UserworkspaceService', () => {
  let service: UserworkspaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserworkspaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
