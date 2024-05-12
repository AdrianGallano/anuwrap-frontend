import { TestBed } from '@angular/core/testing';

import { AnnualreportService } from './annualreport.service';

describe('AnnualreportService', () => {
  let service: AnnualreportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnualreportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
