import { TestBed } from '@angular/core/testing';

import { SentanceService } from './sentance.service';

describe('SentanceService', () => {
  let service: SentanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SentanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
