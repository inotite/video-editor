import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { BrandService } from './brand.service';
import { CurrentSlideService } from './current-slide.service';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  url = 'storyboards';
  selected: number;

  private _story = new BehaviorSubject<any>({});

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private brandService: BrandService,
    private slideService: CurrentSlideService
  ) {
    this.selected = 3;
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

  setCurrentStory(item) {
    this._story.next(item);
    console.log(item);
    // this.brandService.setCurrent(item.brand._id);
    // this.brandService.setCurrentBrand(item.brand);
    this.slideService.setScenes(item.scenes);
  }

  getCurrentStory(): Observable<any> {
    return this._story.asObservable();
  }
}
