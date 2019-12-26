import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicUploadsComponent } from './music-uploads.component';

describe('MusicUploadsComponent', () => {
  let component: MusicUploadsComponent;
  let fixture: ComponentFixture<MusicUploadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicUploadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicUploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
