import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CanvasEditorService } from 'src/app/services/canvas-editor.service';

@Component({
  selector: 'app-single-slide',
  templateUrl: './single-slide.component.html',
  styleUrls: ['./single-slide.component.scss']
})
export class SingleSlideComponent implements OnInit {

  @Input()
  item: any;
  @Input()
  selectedId: Number;

  isSelected: boolean;
  @Output() selectFormatEvent = new EventEmitter<Number>();
  
  constructor(private canvasEditorService: CanvasEditorService) { 
  }

  ngOnInit() {
  }

  itemSelect(event) {
    this.selectFormatEvent.emit(this.item.id);
    
    this.canvasEditorService.setCanvasAspectRatio(this.item.ratio, this.item.width);

    this.canvasEditorService.setLayout(this.item.id);
  }

}
