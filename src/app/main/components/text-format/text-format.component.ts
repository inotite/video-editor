import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-text-format',
  templateUrl: './text-format.component.html',
  styleUrls: ['./text-format.component.scss']
})
export class TextFormatComponent implements OnInit {

  @Input() textPosition;
  @Input() textSize;
  @Input() highlight;
  @Output() fontSizeEvent = new EventEmitter<string>();
  @Output() alignmentEvent = new EventEmitter<number>();
  @Output() highlightEvent = new EventEmitter<void>();

  @ViewChild('alignDrop') alignDrop;
  @ViewChild('formatAlign') formatAlign;
  @ViewChild('position') positionToggle;

  constructor(config: NgbDropdownConfig) {
    // config.placement = 'top-left';
  }

  fontSizeChange(fontSize) {
    this.fontSizeEvent.emit(fontSize);
  }

  alignmentChange(alignment) {

    this.alignDrop.close();
    const position = parseInt(alignment, 10);

    console.log(this.formatAlign.nativeElement);

    switch (position % 3) {
      case 1:
        this.formatAlign.nativeElement.style.textAlign = 'left';
        break;
      case 2:
        this.formatAlign.nativeElement.style.textAlign = 'center';
        break;
      case 0:
        this.formatAlign.nativeElement.style.textAlign = 'right';
        break;
    }

    this.alignmentEvent.emit(position);
  }

  highlightText(event) {
    this.highlightEvent.emit();
  }

  openChange(event) {
    if (event) {
      this.positionToggle.nativeElement.src = 'assets/icons/ic-grid-selected.svg';
    } else {
      this.positionToggle.nativeElement.src = 'assets/icons/ic-grid.svg';
    }
  }

  ngOnInit() {

  }

}
