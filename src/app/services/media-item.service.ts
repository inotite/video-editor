import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MediaItemService {

  private _usedItems = new BehaviorSubject<any[]>([]);

  url = 'mediaitems/related';

  uploadUrl = 'mediaitems/upload';

  constructor(private http: HttpClient, public authService: AuthService) { }

  getAll(search): Observable<any> {
    return this.http.get(environment.apiUrl + this.url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: this.authService.accessToken
      },
      params: {
        term: search,
        filter: 'images,videos',
        page: '1'
      },
    }).pipe(
      map((response: any) => {
        console.log(response);
        let length = response.data.images.photos.length;
        for ( let i = 0 ; i < length ; i++ ) {
          response.data.images.photos[i].background_type = 'image';
          response.data.images.photos[i].type = 'stock';
        }
        length = response.data.videos.videos.length;
        for ( let i = 0 ; i < length ; i++ ) {
          response.data.videos.videos[i].background_type = 'video';
          response.data.videos.videos[i].type = 'stock';
        }
        return response;
      })
    );
  }

  addAsUsed(item) {
    const prev = this._usedItems.getValue();
    for (const itr of prev) {
      if (itr.id === item.id) {
        return;
      }
    }
    prev.push(item);
    this._usedItems.next(prev);
  }

  getUsedItems(): Observable<any> {
    return this._usedItems.asObservable();
  }

  uploadMedia(file): Observable<any> {
    let formData = new FormData();
    formData.append('mediafile', file);
    return this.http.post(environment.apiUrl + this.uploadUrl, formData,
      {
        headers: {
          Authorization: this.authService.accessToken
        },
        reportProgress: true,
        observe: 'events'
      });
  }
}
