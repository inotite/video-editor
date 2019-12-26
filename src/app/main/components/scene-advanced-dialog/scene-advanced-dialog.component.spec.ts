import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneAdvancedDialogComponent } from './scene-advanced-dialog.component';

describe('SceneAdvancedDialogComponent', () => {
  let component: SceneAdvancedDialogComponent;
  let fixture: ComponentFixture<SceneAdvancedDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SceneAdvancedDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneAdvancedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
