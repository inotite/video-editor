import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss']
})
export class ThemePickerComponent implements OnInit {

  @Output()
  selectors: any = [
    {
      text: 'Storyboard',
      link: '/editor/theme/storyboard'
    },
    {
      text: 'Brand',
      link: '/editor/theme/brand'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
