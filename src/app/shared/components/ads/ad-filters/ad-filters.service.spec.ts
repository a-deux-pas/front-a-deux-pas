import { TestBed } from '@angular/core/testing';

import { AdFiltersService } from './ad-filters.service';

describe('AdFilterService', () => {
  let service: AdFiltersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdFiltersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
