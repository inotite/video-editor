import { Component, OnInit } from '@angular/core';
import { MediaItemService } from 'src/app/services/media-item.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-media-used',
  templateUrl: './media-used.component.html',
  styleUrls: ['./media-used.component.scss']
})
export class MediaUsedComponent implements OnInit {

  usedOb: Observable<any>;

  items: any;

  constructor(
    private mediaItemService: MediaItemService
  ) { }

  ngOnInit() {
    this.usedOb = this.mediaItemService.getUsedItems();
    this.usedOb.subscribe(response => {
      this.items = response;
    })
  }

  playVideo(event) {
    event.srcElement.play();
  }

  stopVideo(event) {
    event.srcElement.pause();
    event.srcElement.currentTime = 0;
  }

}
