import { TestBed } from '@angular/core/testing';

import { ReportselectionService } from './reportselection.service';

describe('ReportselectionService', () => {
  let service: ReportselectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportselectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
