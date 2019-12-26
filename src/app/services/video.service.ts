import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  videoId;

  url = 'videos';
  urlRender = 'videos/render';
  urlProduct = 'products';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {

  }

  createVideo(amazonUrl) {
    this.http.post(environment.apiUrl + this.urlProduct, {
      url: amazonUrl
    },
    {
      headers: {
        Authorization: this.authService.accessToken
      }
    })
    .subscribe((res: any) => {
      // console.log(res);
      this.http.post(environment.apiUrl + this.url,
        {
          name: 'My First Video',
          // accountId: '5dcd27851b22eadf2a3cf3ae',
          productId: res.data.product_id,
          storyboard: '',
          soundtrack: ''
        },
        {
          headers: {
            Authorization: this.authService.accessToken
          }
        })
        .subscribe((response: any) => {
          console.log(response);
          this.videoId = response.data._id;
          localStorage.setItem('videoId', this.videoId);
        });
    });

  }

  getVideoId() {
    if (!this.videoId) {
      this.videoId = localStorage.getItem('videoId');
    }

    return this.videoId;
  }

  renderVideo() {
    if (!this.videoId) {
      this.videoId = localStorage.getItem('videoId');
    }

    if (!this.videoId) {
      return;
    }

    this.http.post(environment.apiUrl + this.urlRender, {
      video_id: this.videoId
    }, {
      headers: {
        Authorization: this.authService.accessToken
      }
    }).subscribe(res => {
      console.log('Rendered Video, ', res);
    });
  }
}
