import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CurrentSlideService {

  url = 'videos/5dd10fc81c9d440000b9a645/scenes';

  private scenes = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient, public authService: AuthService) { }

  getScenes(): Observable<any> {
    return this.scenes.asObservable();
  }

  getAll() {
    this.http
      .get(environment.apiUrl + this.url, {
        headers: {
          Authorization: this.authService.accessToken
        }
      })
      .subscribe((response: any) => {
        const data = response.data.scenes.map(el => {
          let o = Object.assign({}, el);
          o.ratio = 0;
          o.left = 0;
          o.top = 0;
          o.firstLoad = true;
          o.highlight = false;
          return o;
        });
        this.scenes.next(data);
      });
  }

  addScene(data) {
    this.scenes.next(data);
  }

  setScenes(item) {
    this.scenes.next(item);
  }

  updateScene(item) {
    const oldScenes = this.scenes.getValue();
    const length = oldScenes.length;
    let idx;

    for (idx = 0 ; idx < length ; idx++) {
      if (oldScenes[idx]._id === item._id) {
        break;
      }
    }
    oldScenes[idx] = _.cloneDeep(item);
    this.scenes.next(oldScenes);
  }

}
