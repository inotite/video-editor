import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-music-uploads',
  templateUrl: './music-uploads.component.html',
  styleUrls: ['./music-uploads.component.scss']
})
export class MusicUploadsComponent implements OnInit {

  uploads: any = [
  ];

  constructor() { }

  ngOnInit() {
  }

}
