import { Component, OnInit, ViewChild } from '@angular/core';
import { VideoService } from '../services/video.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('amazonUrl') amazonUrl;

  constructor(
    private videoService: VideoService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  createVideo(event) {
    this.videoService.createVideo(this.amazonUrl.nativeElement.value);
    // this.router.navigate(['loading']);
    this.router.navigate(['/editor']);
  }

}
