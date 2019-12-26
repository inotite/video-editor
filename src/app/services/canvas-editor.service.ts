import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanvasEditorService {

  id$: number;
  private totalDuration: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  @Output() changeLayout: EventEmitter<number> = new EventEmitter();

  constructor() {
    this.id$ = 1;
  }



  getCanvasAspectRatio() {
    const canvasDraw: any = document.getElementsByClassName('canvas-draw');

    if (canvasDraw.length > 0) {
      return canvasDraw[0].style.paddingTop;
    }

    return '100%';
  }

  setCanvasAspectRatio(ratio, width) {
    const canvasDraw: any = document.getElementsByClassName('canvas-draw');

    for (let i = 0 ; i < canvasDraw.length ; i++) {
      canvasDraw[i].style.paddingTop = ratio;
    }

    let canvasPane: any = document.getElementsByTagName('app-canvas-pane');

    for (let i = 0 ; i < canvasPane.length ; i++) {
      canvasPane[i].style.width = width;
    }
  }

  calcLayout(id = this.id$) {
    let canvasArea = document.getElementById('canvas-area');
    if (id % 3 == 2) {
      canvasArea.style.flexDirection = 'row';
      let canvasPane: any = document.getElementsByTagName('app-canvas-pane');
      let width = 300 * 2 + 310 * canvasPane.length;
      canvasArea.style.width = width + 'px';
    } else {
      canvasArea.style.flexDirection = 'column';
      canvasArea.style.width = '100%'
    }
  }

  setLayout(id) {
    this.id$ = id;
    let canvasArea = document.getElementById('canvas-area');
    if (id % 3 == 2) {
      canvasArea.style.flexDirection = 'row';
      let canvasPane: any = document.getElementsByTagName('app-canvas-pane');
      let width = 300 * 2 + 310 * canvasPane.length;
      canvasArea.style.width = width + 'px';
    } else {
      canvasArea.style.flexDirection = 'column';
      canvasArea.style.width = '100%';
    }

    this.changeLayout.emit(id);
  }

  getLayout() {
    return this.id$;
  }

  reCalc() {
    this.setLayout(this.id$);
  }

  setDuration(duration) {
    this.totalDuration.next(duration);
  }

  getDurationValue() {
    return this.totalDuration.getValue();
  }

  getDuration() {
    return this.totalDuration.asObservable();
  }
}
