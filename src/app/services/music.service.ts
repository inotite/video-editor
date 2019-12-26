import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { VideoService } from './video.service';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  url = 'musicitems/related';

  audio: any;

  private currentMusic = new BehaviorSubject<any>({});
  private selectedMusic = new BehaviorSubject<any>({});

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private videoService: VideoService
  ) {
    this.audio = new Audio();
    this.audio.onended = (e) => {
      this.setCurrent({});
    };
    this.setCurrent({});
  }

  getAll(searchTerm): Observable<any> {
    return this.http.get(environment.apiUrl + this.url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: this.authService.accessToken
      },
      params: {
        term: searchTerm,
      }
    });
  }

  play(url) {
    this.audio.src = url;
    return this.audio.play();
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  getCurrent(): Observable<any> {
    return this.currentMusic.asObservable();
  }

  setCurrent(itm) {
    this.currentMusic.next(itm);
  }

  applyMusic(item) {
    this.selectedMusic.next(item);
    this.http.put(environment.apiUrl + `videos/${this.videoService.videoId}`,
      {
        soundtrack_url: item.url || ''
      },
      {
        headers: {
          Authorization: this.authService.accessToken
        }
      })
      .subscribe(response => {
        console.log(response);
      });
  }

  getSelected(): Observable<any> {
    return this.selectedMusic.asObservable();
  }

}
