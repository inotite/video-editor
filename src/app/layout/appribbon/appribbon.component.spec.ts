import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppribbonComponent } from './appribbon.component';

describe('AppribbonComponent', () => {
  let component: AppribbonComponent;
  let fixture: ComponentFixture<AppribbonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppribbonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppribbonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
