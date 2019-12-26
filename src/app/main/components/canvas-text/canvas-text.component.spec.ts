import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasTextComponent } from './canvas-text.component';

describe('CanvasTextComponent', () => {
  let component: CanvasTextComponent;
  let fixture: ComponentFixture<CanvasTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
