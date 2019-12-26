import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-music-picker',
  templateUrl: './music-picker.component.html',
  styleUrls: ['./music-picker.component.scss']
})
export class MusicPickerComponent implements OnInit {

  @Output()
  selectors: any = [
    {
      text: 'Library',
      link: '/editor/music/library'
    },
    {
      text: 'Uploads',
      link: '/editor/music/uploads'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
