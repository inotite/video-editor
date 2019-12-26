import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-media-picker',
  templateUrl: './media-picker.component.html',
  styleUrls: ['./media-picker.component.scss']
})
export class MediaPickerComponent implements OnInit {

  @Output()
  selectors: any = [
    {
      text: 'Used',
      link: '/editor/media/used'
    },
    {
      text: 'Search',
      link: '/editor/media/search'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
