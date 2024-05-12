import { TestBed } from '@angular/core/testing';

import { AccomplishmentreportService } from './accomplishmentreport.service';

describe('AccomplishmentreportService', () => {
  let service: AccomplishmentreportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccomplishmentreportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
