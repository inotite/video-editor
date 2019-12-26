import { Component, OnInit } from '@angular/core';
import { MusicService } from 'src/app/services/music.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-music-library',
  templateUrl: './music-library.component.html',
  styleUrls: ['./music-library.component.scss']
})
export class MusicLibraryComponent implements OnInit {

  types: any = [
    {
      link: '/',
      text: 'Angry'
    },
    {
      link: '/',
      text: 'Bright'
    },
    {
      link: '/',
      text: 'Calm'
    },
    {
      link: '/',
      text: 'Dark'
    },
    {
      link: '/',
      text: 'Dramatic'
    },
    {
      link: '/',
      text: 'Funky'
    },
    {
      link: '/',
      text: 'Happy'
    },
    {
      link: '/',
      text: 'Inspirational'
    },
    {
      link: '/',
      text: 'Romantic'
    },
    {
      link: '/',
      text: 'Sad'
    },
  ];

  musics: any = [
  ];

  appliedMusic: any;

  musicAllSubscription: Subscription;

  constructor(
    private musicService: MusicService
  ) { }

  ngOnInit() {
    this.musicAllSubscription = this.musicService.getAll('happy').subscribe(response => {
      this.musics = response.data.map(el => {
        let o = Object.assign({}, el);
        o.type = 0;
        return o;
      });
    });

    this.musicService.getSelected().subscribe(response => {
      if (Object.entries(response).length === 0) {
        this.appliedMusic = undefined;
        return;
      }

      this.appliedMusic = Object.assign({}, response);
      this.appliedMusic.type = 1;
    })
  }

  OnDestroy() {
    this.musicAllSubscription.unsubscribe();
  }

}
