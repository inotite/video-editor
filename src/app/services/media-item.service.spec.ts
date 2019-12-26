import { TestBed } from '@angular/core/testing';

import { MediaItemService } from './media-item.service';

describe('MediaItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MediaItemService = TestBed.get(MediaItemService);
    expect(service).toBeTruthy();
  });
});
