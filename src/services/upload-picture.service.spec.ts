import { TestBed } from '@angular/core/testing';

import { UploadPictureService } from './upload-picture.service';

describe('UploadPictureService', () => {
  let service: UploadPictureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadPictureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
