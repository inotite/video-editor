import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-text-picker',
  templateUrl: './text-picker.component.html',
  styleUrls: ['./text-picker.component.scss']
})
export class TextPickerComponent implements OnInit {

  @Output()
  selectors: any = [
    {
      text: 'Basic Info',
      link: '/editor/text/basic-info'
    },
    {
      text: 'Description',
      link: '/editor/text/desc'
    },
    {
      text: 'Widgets',
      link: '/editor/text/templates'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
