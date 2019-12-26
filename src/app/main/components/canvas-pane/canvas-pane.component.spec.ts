import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasPaneComponent } from './canvas-pane.component';

describe('CanvasPaneComponent', () => {
  let component: CanvasPaneComponent;
  let fixture: ComponentFixture<CanvasPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
