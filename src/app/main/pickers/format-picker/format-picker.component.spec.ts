import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatPickerComponent } from './format-picker.component';

describe('FormatPickerComponent', () => {
  let component: FormatPickerComponent;
  let fixture: ComponentFixture<FormatPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormatPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
