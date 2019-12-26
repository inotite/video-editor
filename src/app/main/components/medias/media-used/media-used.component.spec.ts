import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaUsedComponent } from './media-used.component';

describe('MediaUsedComponent', () => {
  let component: MediaUsedComponent;
  let fixture: ComponentFixture<MediaUsedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaUsedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaUsedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
