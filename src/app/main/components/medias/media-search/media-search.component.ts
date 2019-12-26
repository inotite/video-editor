import { Component, OnInit } from '@angular/core';
import { MediaItemService } from 'src/app/services/media-item.service';

@Component({
  selector: 'app-media-search',
  templateUrl: './media-search.component.html',
  styleUrls: ['./media-search.component.scss']
})
export class MediaSearchComponent implements OnInit {

  types: any = [
    {
      link: '/',
      text: 'Grass'
    },
    {
      link: '/',
      text: 'Shoes'
    },
    {
      link: '/',
      text: 'Summer'
    },
    {
      link: '/',
      text: 'Beach'
    },
    {
      link: '/',
      text: 'Flip flops'
    },
    {
      link: '/',
      text: 'Sandals'
    },
  ];

  items: any = [];

  constructor(private mediaItemService: MediaItemService) { }

  ngOnInit() {
    this.mediaItemService.getAll('beach').subscribe(response => {
      this.items = [...response.data.images.photos, ...response.data.videos.videos];
      console.log(this.items);
    })
  }

  playVideo(event) {
    event.srcElement.play();
    event.srcElement.muted = true;
  }

  stopVideo(event) {
    event.srcElement.pause();
    event.srcElement.currentTime = 0;
  }

  onSearch(event) {
    this.mediaItemService.getAll(event.srcElement.value).subscribe(response => {
      this.items = [...response.data.images.photos, ...response.data.videos.videos];
    });
  }

}
