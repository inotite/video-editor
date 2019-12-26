import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {

  logoUrl = 'widgets/logo';
  coverUrl = 'widgets/cover';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getLogo(): Observable<any> {
    return this.http.get(environment.apiUrl + this.logoUrl, {
      headers: {
        Authorization: this.authService.accessToken
      }
    });
  }

  getCover(): Observable<any> {
    return this.http.get(environment.apiUrl + this.coverUrl, {
      headers: {
        Authorization: this.authService.accessToken
      }
    });
  }
}
