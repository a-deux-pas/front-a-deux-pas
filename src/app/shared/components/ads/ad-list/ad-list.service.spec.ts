import { TestBed } from '@angular/core/testing';

import { AdListService } from './ad-list.service';

describe('ListAdsService', () => {
  let service: AdListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
