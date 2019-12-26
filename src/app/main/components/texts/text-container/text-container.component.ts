import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-text-container',
  templateUrl: './text-container.component.html',
  styleUrls: ['./text-container.component.scss']
})
export class TextContainerComponent implements OnInit {

  @Input() text: string;

  constructor() { }

  ngOnInit() {
  }

}
