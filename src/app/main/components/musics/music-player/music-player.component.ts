import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MusicService } from 'src/app/services/music.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent implements OnInit {

  @Input()
  item: any;

  paused: boolean;

  currentPlaying: Observable<any>;
  playingId: string;
  playingType: string;

  constructor(
    private musicService: MusicService
  ) {
    this.paused = true;
    this.currentPlaying = this.musicService.getCurrent();
    this.currentPlaying.subscribe(itm => {
      this.playingId = itm._id;
      this.playingType = itm.type;
      if (!this.item) {
        return;
      }
      if (this.playingId === this.item._id) {
        this.paused = false;
      } else {
        this.paused = true;
      }
    });
  }

  ngOnInit() {
  }

  async handleMusic(url) {
    if (this.paused) {
      await this.musicService.play(url);
      this.musicService.setCurrent(this.item);
      setTimeout(() => {
        this.musicService.stop();
        this.paused = true;
      }, 5000);
    } else {
      this.musicService.stop();
      this.musicService.setCurrent({});
    }
  }

  applyMusic() {
    this.musicService.applyMusic(this.item);
  }

  removeMusic() {
    this.musicService.applyMusic({});
  }

}
