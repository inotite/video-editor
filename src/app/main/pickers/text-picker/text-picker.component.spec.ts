import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextPickerComponent } from './text-picker.component';

describe('TextPickerComponent', () => {
  let component: TextPickerComponent;
  let fixture: ComponentFixture<TextPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
