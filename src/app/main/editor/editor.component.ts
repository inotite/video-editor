import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  toolbar: any = [
    {
      icon: 'assets/icons/ic-story.svg',
      text: 'Story',
      link: ['/editor/theme/storyboard']
    },
    {
      icon: 'assets/icons/ic-theme.svg',
      text: 'Style',
      link: ['/editor/theme/brand']
    },
    {
      icon: 'assets/icons/ic-text-v2.svg',
      text: 'Text',
      link: ['/editor/text']
    },
    {
      icon: 'assets/icons/ic-media.svg',
      text: 'Media',
      link: ['/editor/media']
    },
    {
      icon: 'assets/icons/ic-music.svg',
      text: 'Music',
      link: ['/editor/music']
    },
    {
      icon: 'assets/icons/ic-format.svg',
      text: 'Format',
      link: ['/editor/format']
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
