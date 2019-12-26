import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-social-slide',
  templateUrl: './social-slide.component.html',
  styleUrls: ['./social-slide.component.scss']
})
export class SocialSlideComponent implements OnInit {

  @Input()
  items: any;
  @Input()
  title: any;
  @Input()
  selectedId;

  @Output() itemFormatEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onSelectFormatEvent(id) {
    console.log(id);
    this.itemFormatEvent.emit(id);
  }

}
