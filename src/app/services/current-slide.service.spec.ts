import { TestBed } from '@angular/core/testing';

import { CurrentSlideService } from './current-slide.service';

describe('CurrentSlideService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrentSlideService = TestBed.get(CurrentSlideService);
    expect(service).toBeTruthy();
  });
});
