import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialSlideComponent } from './social-slide.component';

describe('SocialSlideComponent', () => {
  let component: SocialSlideComponent;
  let fixture: ComponentFixture<SocialSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
