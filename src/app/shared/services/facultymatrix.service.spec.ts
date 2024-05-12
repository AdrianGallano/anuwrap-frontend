import { TestBed } from '@angular/core/testing';

import { FacultymatrixService } from './facultymatrix.service';

describe('FacultymatrixService', () => {
  let service: FacultymatrixService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacultymatrixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
