import { TestBed } from '@angular/core/testing';

import { FrameService } from './frame.service';

describe('FrameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FrameService = TestBed.get(FrameService);
    expect(service).toBeTruthy();
  });
});
