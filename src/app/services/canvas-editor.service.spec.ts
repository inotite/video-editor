import { TestBed } from '@angular/core/testing';

import { CanvasEditorService } from './canvas-editor.service';

describe('CanvasEditorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CanvasEditorService = TestBed.get(CanvasEditorService);
    expect(service).toBeTruthy();
  });
});
