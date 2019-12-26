import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicPickerComponent } from './music-picker.component';

describe('MusicPickerComponent', () => {
  let component: MusicPickerComponent;
  let fixture: ComponentFixture<MusicPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
