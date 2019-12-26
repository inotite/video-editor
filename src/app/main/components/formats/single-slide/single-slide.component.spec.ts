import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSlideComponent } from './single-slide.component';

describe('SingleSlideComponent', () => {
  let component: SingleSlideComponent;
  let fixture: ComponentFixture<SingleSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
