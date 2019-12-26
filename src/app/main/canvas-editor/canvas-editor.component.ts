import { Component, OnInit, ViewChild } from '@angular/core';

import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { CurrentSlideService } from 'src/app/services/current-slide.service';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CanvasEditorService } from 'src/app/services/canvas-editor.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-canvas-editor',
  templateUrl: './canvas-editor.component.html',
  styleUrls: ['./canvas-editor.component.scss']
})
export class CanvasEditorComponent implements OnInit {

  public config: PerfectScrollbarConfigInterface = {};

  currentSlides$: Observable<any>;
  currentSlides: any[];

  slideSubscription: Subscription;

  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;

  constructor(
    private currentSlideService: CurrentSlideService,
    private canvasEditorService: CanvasEditorService
  ) { }

  ngOnInit() {
    // this.currentSlides$ = this.currentSlideService.getAll();
    this.currentSlideService.getAll();
    this.currentSlides$ = this.currentSlideService.getScenes();
    this.slideSubscription = this.currentSlides$.subscribe(data => {
      this.currentSlides = data;

      let totalDuration = 0;
      for (const slide of data) {
        totalDuration += parseInt(slide.duration, 10);
      }

      this.canvasEditorService.setDuration(totalDuration);
    });
  }

  public onScrollEvent(event: any): void {
    // console.log(event);
  }

  insertAfter(item, newItem) {
    let i;

    for (i = 0 ; i < this.currentSlides.length ; i++) {
      if (item.order === this.currentSlides[i].order) {
        break;
      }
    }

    if (i === this.currentSlides.length) {
      return;
    }

    for (let idx = i + 1 ; idx < this.currentSlides.length ; idx++) {
      this.currentSlides[idx].order++;
    }

    if (i === this.currentSlides.length - 1) {
      this.currentSlides.push(newItem);
    } else {
      this.currentSlides.splice(i + 1, 0, newItem);
    }

    this.currentSlideService.addScene(this.currentSlides);
  }

  onAddScene(slide) {
    const newItem = {
      _id: uuid(),
      background: slide.background,
      extension: slide.extension,
      caption: {
          text: slide.caption.text,
          size: 'l',
          position: slide.caption.position,
          animation: 'fadein'
      },
      duration: 4,
      order: slide.order + 1,
      animation: 'fadein',
      firstLoad: true,
      left: 0,
      top: 0,
      ratio: 0,
      highlight: false,
      video_files: (slide.extension === 'video' ? slide.video_files : '')
    }

    console.log(newItem);

    this.insertAfter(slide, newItem);

    this.canvasEditorService.calcLayout();
  }

  onAddSubScene(item) {

  }

  onDuplicateScene(slide) {
    const newItem = Object.assign({}, slide);
    newItem.id = this.currentSlides.length + 1;
    newItem.order = slide.order + 1;
    console.log(newItem);
    this.insertAfter(slide, newItem);
    this.canvasEditorService.calcLayout();
  }

  onRemoveScene(slide) {
    let index;
    for (index = 0 ; index < this.currentSlides.length ; index++) {
      if (slide.order === this.currentSlides[index].order) {
        break;
      }
    }
    if (index < this.currentSlides.length) {
      this.currentSlides.splice(index, 1);
    }
  }

  onDestry() {
    this.slideSubscription.unsubscribe();
  }

}
