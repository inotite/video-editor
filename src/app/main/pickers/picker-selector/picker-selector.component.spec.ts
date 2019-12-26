import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickerSelectorComponent } from './picker-selector.component';

describe('PickerSelectorComponent', () => {
  let component: PickerSelectorComponent;
  let fixture: ComponentFixture<PickerSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickerSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickerSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
