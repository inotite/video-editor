import { Directive, Output, Input, EventEmitter, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDragDrop]'
})

export class DragDropDirective {
	
  @Output() onFileDropped = new EventEmitter<any>();
  @Output() onFileDragOver = new EventEmitter<any>();
  @Output() onFileDragLeave = new EventEmitter<any>();
  @Output() onFileNotSupport = new EventEmitter<any>();
	
  @HostBinding('style.background-color') private background = '#fff'
  @HostBinding('style.opacity') private opacity = '1'
	
  //Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.onFileDragOver.emit();
    this.background = '#9F7AEA0C';
  }
	
  //Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.onFileDragLeave.emit();
    this.background = '#fffc';
  }
	
  //Drop listener
  @HostListener('drop', ['$event']) public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#9F7AEA0C';
    let files = evt.dataTransfer.files;
    if (files.length > 0) {
      let type = files[0].type.substring(0, 5);
      if (type == "image" || type == "video") {
        this.onFileDropped.emit(files);
      } else {
        this.background = '#FF00000C';
        this.onFileNotSupport.emit();
      }
    }
  }
	
}