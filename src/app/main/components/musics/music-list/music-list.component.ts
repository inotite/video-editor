import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.scss']
})
export class MusicListComponent implements OnInit {

  @Input()
  items: any;

  constructor() { }

  ngOnInit() {
  }

}
