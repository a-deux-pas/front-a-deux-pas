import { TestBed } from '@angular/core/testing';

import { AdFilterService } from './ad-filter.service';

describe('AdFilterService', () => {
  let service: AdFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
