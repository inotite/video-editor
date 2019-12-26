import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-picker-selector',
  templateUrl: './picker-selector.component.html',
  styleUrls: ['./picker-selector.component.scss']
})
export class PickerSelectorComponent implements OnInit {

  @Input()
  selectors: any;

  constructor() { }

  ngOnInit() {
  }

}
