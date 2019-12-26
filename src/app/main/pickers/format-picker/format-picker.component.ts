import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-format-picker',
  templateUrl: './format-picker.component.html',
  styleUrls: ['./format-picker.component.scss']
})
export class FormatPickerComponent implements OnInit {

  facebook: any = [
    {
      image: 'assets/graphics/format-landscape.svg',
      text: 'News Feed (16:9)',
      id: 1,
      ratio: '56.25%',
      width: '480px'
    },
    {
      image: 'assets/graphics/format-tall.svg',
      text: 'Story (9:16)',
      id: 2,
      ratio: '177.78%',
      width: '270px'
    },
    {
      image: 'assets/graphics/format-square.svg',
      text: 'Carousel Ad (1:1)',
      id: 3,
      ratio: '100%',
      width: '270px'
    },
  ];

  facebookTitle: any = {
    icon: 'assets/icons/ic-facebook-format.svg',
    text: 'Facebook'
  };

  instagram: any = [
    {
      image: 'assets/graphics/format-landscape.svg',
      text: 'News Feed (16:9)',
      id: 4,
      ratio: '56.25%',
      width: '480px'
    },
    {
      image: 'assets/graphics/format-tall.svg',
      text: 'Story (9:16)',
      id: 5,
      ratio: '177.78%',
      width: '270px'
    },
    {
      image: 'assets/graphics/format-square.svg',
      text: 'Carousel Ad (1:1)',
      id: 6,
      ratio: '100%',
      width: '270px'
    },
  ];

  instagramTitle: any = {
    icon: 'assets/icons/ic-instagram.svg',
    text: 'Instagram'
  };

  youtube: any = [
    {
      image: 'assets/graphics/format-landscape.svg',
      text: 'News Feed (16:9)',
      id: 7,
      ratio: '56.25%',
      width: '480px'
    },
    {
      image: 'assets/graphics/format-tall.svg',
      text: 'Story (9:16)',
      id: 8,
      ratio: '177.78%',
      width: '270px'
    },
    {
      image: 'assets/graphics/format-square.svg',
      text: 'Carousel Ad (1:1)',
      id: 9,
      ratio: '100%',
      width: '270px'
    },
  ];

  youtubeTitle: any = {
    icon: 'assets/icons/ic-youtube.svg',
    text: 'Youtube'
  };

  selectedId = 0;

  constructor() { }

  ngOnInit() {
  }

  onItemSelectEvent(id) {
    this.selectedId = id;
  }

}
