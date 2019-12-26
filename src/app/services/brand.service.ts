import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  url = 'brands';
  selected: number;

  private currentBrand = new BehaviorSubject<any>({});

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.selected = 2;
    this.currentBrand.next({
      id: 2,
      textColor: '#FFF',
      highlightColor: '#DC4720',
      backgroundColor: '#000C',
      fontFamily: 'Poppins',
      fontSize: 'large',
      image: 'https://sparka-editor-assets.s3.us-west-2.amazonaws.com/brand-styles/style-2.jpg'
    });
  }

  getAll(): Observable<any> {
    return this.http.get(environment.apiUrl + this.url, {
      headers: {
        Authorization: this.authService.accessToken
      }
    });
  }

  getCurrent() {
    return this.selected;
  }

  setCurrent(id) {
    this.selected = id;
  }

  setCurrentBrand(item) {
    this.currentBrand.next(item);
  }

  getCurrentBrand(): Observable<any> {
    return this.currentBrand.asObservable();
  }

  getHighlightColor() {
    return this.currentBrand.getValue().highlightColor;
  }
}
