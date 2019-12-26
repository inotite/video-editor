import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Observable, interval, Subscription, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { CanvasEditorService } from 'src/app/services/canvas-editor.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SceneAdvancedDialogComponent } from '../scene-advanced-dialog/scene-advanced-dialog.component';
import { MediaItemService } from 'src/app/services/media-item.service';
import * as _ from 'lodash';
import { BrandService } from 'src/app/services/brand.service';
import { CurrentSlideService } from 'src/app/services/current-slide.service';

@Component({
  selector: 'app-canvas-pane',
  templateUrl: './canvas-pane.component.html',
  styleUrls: ['./canvas-pane.component.scss']
})
export class CanvasPaneComponent implements OnInit {

  @Output() newSlideEvent = new EventEmitter<any>();
  @Output() addSceneEvent = new EventEmitter<any>();
  @Output() addSubSceneEvent = new EventEmitter<any>();
  @Output() duplicateSceneEvent = new EventEmitter<any>();
  @Output() removeSceneEvent = new EventEmitter<any>();

  @Input()
  item: any;

  @ViewChild('addScene') addScene;
  @ViewChild('addSubScene') addSubScene;
  @ViewChild('canvasImage') canvasImage;
  @ViewChild('canvasVideo') canvasVideo;
  @ViewChild('durationVal') durationVal;

  dragData: any;
  videoProg: number;
  playing: boolean;

  layoutId = 1;

  timerSubscription: Subscription;

  playSubject: Subject<void> = new Subject<void>();
  positionSubject: Subject<any> = new Subject<any>();
  styleSubject: Subject<any> = new Subject<any>();

  constructor(
    private canvasEditorService: CanvasEditorService,
    private dialog: MatDialog,
    private mediaItemService: MediaItemService,
    private brandService: BrandService,
    private slideService: CurrentSlideService
  ) { }

  ngOnInit() {
    // console.log('ngOnInit');
    // console.log(this.item);
    this.layoutId = this.canvasEditorService.getLayout() % 3;
    const canvasPane: any = document.getElementsByTagName('app-canvas-pane');
    for (let i = 1; i < canvasPane.length; i++) {
      canvasPane[i].style.width = canvasPane[0].style.width;
    }

    const canvasDraw: any = document.getElementsByClassName('canvas-draw');
    for (let i = 1; i < canvasDraw.length; i++) {
      canvasDraw[i].style.paddingTop = canvasDraw[0].style.paddingTop;
    }

    this.addScene.nativeElement.style.display = 'none';
    this.addSubScene.nativeElement.style.display = 'none';

    this.canvasEditorService.changeLayout.subscribe(layoutId => {
      if (this.item.extension === 'video') {
        this.item.left = 0.5 - 270 / this.canvasVideo.nativeElement.width / 2;
        this.item.top = 0.5 - 270 / this.canvasVideo.nativeElement.height / 2;
      } else {
        this.item.left = 0.5 - 270 / this.canvasImage.nativeElement.width / 2;
        this.item.top = 0.5 - 270 / this.canvasImage.nativeElement.height / 2;
      }
      this.layoutId = layoutId % 3;
      this.changeViewMode(layoutId % 3);
    });

    this.playing = false;
  }

  ngAfterViewInit() {
  }

  updateSlide() {
    this.slideService.updateScene(this.item);
  }

  durationChange(event) {
    const pattern = /[0-9\+\-\ ]/;
    if (!pattern.test(String.fromCharCode(event.which))) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }

    let txtDuration = parseInt(this.durationVal.nativeElement.textContent, 10);

    if (txtDuration > 20) {
      event.preventDefault();
      event.stopPropagation();
      this.durationVal.nativeElement.textContent = '20';
      txtDuration = 20;
    }

    this.canvasEditorService.setDuration(this.canvasEditorService.getDurationValue() + (txtDuration - this.item.duration));
    this.item.duration = txtDuration;

    return true;
  }

  decreaseDuration(event) {
    this.item.duration--;
    this.canvasEditorService.setDuration(this.canvasEditorService.getDurationValue() - 1);
  }

  increaseDuration(event) {
    this.item.duration++;
    this.canvasEditorService.setDuration(this.canvasEditorService.getDurationValue() + 1);
  }

  stopPlayingCanvas() {
    this.videoProg = 0;
    this.playing = false;
    if (this.canvasVideo) {
      this.canvasVideo.nativeElement.pause();
      this.canvasVideo.nativeElement.currentTime = 0;
    } else {
      this.canvasImage.nativeElement.style.transform = 'scale(1)';
    }
  }

  playStop(event) {
    this.playing = !this.playing;
    this.playSubject.next();
    if (!this.playing) {
      this.timerSubscription.unsubscribe();
      this.stopPlayingCanvas();
      return;
    }
    const progress = interval(40);
    const takeUntilFinish = progress.pipe(take(100 * this.item.duration / 4));
    this.timerSubscription = takeUntilFinish.subscribe(
      x => {
        this.videoProg = 4 / this.item.duration * x;
        if (this.canvasImage) {
          this.canvasImage.nativeElement.style.transform = 'scale(' + (1 + 0.2 * x / (25 * this.item.duration)) + ')';
        }
      },
      err => {

      },
      () => {
        this.stopPlayingCanvas();
      }
    );

    if (this.canvasVideo) {
      this.canvasVideo.nativeElement.play();
      this.canvasVideo.nativeElement.muted = true;
    } else {
    }
  }

  duplicateSlide() {
    this.duplicateSceneEvent.emit(_.cloneDeep(this.item));
  }

  deleteSlide() {
    this.removeSceneEvent.emit(this.item);
  }

  advancedSlide() {
    let cmpRef = this.canvasImage;
    if (this.dragData && this.dragData.duration) {
      cmpRef = this.canvasVideo;
      this.item.background = this.dragData.image;
    } else if (this.dragData) {
      this.item.background = this.dragData.src.original;
    }
    const dialogRef = this.dialog.open(SceneAdvancedDialogComponent, {
      width: '600px',
      data: {
        image: this.item.background,
        left: -parseFloat(cmpRef.nativeElement.style.left) / cmpRef.nativeElement.width * 276,
        top: -parseFloat(cmpRef.nativeElement.style.top) / cmpRef.nativeElement.height * 276 * this.item.ratio,
        direction: cmpRef.nativeElement.classList.contains('width-scale') ? 'horizontal' : 'vertical',
        ratio: this.canvasEditorService.getLayout()
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      this.item.left = result.left;
      this.item.top = result.top;
      if (cmpRef.nativeElement.classList.contains('width-scale')) {
        cmpRef.nativeElement.style.top = (-result.top * cmpRef.nativeElement.height) + 'px';
      } else {
        cmpRef.nativeElement.style.left = (-result.left * cmpRef.nativeElement.width) + 'px';
      }
    })
  }

  onItemDrop(e: any) {
    console.log(e);
    this.dragData = e.dragData;
    this.item.firstLoad = true;

    this.mediaItemService.addAsUsed(e.dragData);

    if (this.dragData.extension === 'media' && this.dragData.background_type === 'video') {
      this.item.extension = 'video';
      this.item.background = this.dragData.image;
      this.item.video_files = this.dragData.video_files;
      console.log(this.item);
      setTimeout(() => {
        this.canvasVideo.nativeElement.classList.remove('width-scale');
        this.canvasVideo.nativeElement.classList.remove('height-scale');
        this.canvasVideo.nativeElement.style.left = '0px';
        this.canvasVideo.nativeElement.style.top = '0px';

        this.item.ratio = e.dragData.video_files[0].height / e.dragData.video_files[0].width;
        const layout = this.canvasEditorService.getLayout() % 3;
        const ratio = layout === 0 ? 1 : layout === 1 ? 9 / 16 : 16 / 9;
        // console.log(this.canvasVideo);
        this.canvasVideo.nativeElement.load();
        if (this.canvasVideo.nativeElement.classList.contains('width-scale') || this.item.ratio > ratio) {
          this.canvasVideo.nativeElement.classList.remove('height-scale');
          this.canvasVideo.nativeElement.classList.remove('width-scale');
          this.canvasVideo.nativeElement.classList.add('width-scale');
          if (this.item.firstLoad) {
            const sy = 480 * this.item.ratio;
            this.canvasVideo.nativeElement.style.top = (270 - sy) / 2 + 'px';
            this.item.top = 0.5 - 270 / this.canvasVideo.nativeElement.height / 2;
          } else {
            this.canvasVideo.nativeElement.style.top = -this.item.top * this.canvasVideo.nativeElement.height + 'px';
          }
        } else {
          this.canvasVideo.nativeElement.classList.remove('height-scale');
          this.canvasVideo.nativeElement.classList.remove('width-scale');
          this.canvasVideo.nativeElement.classList.add('height-scale');
          if (this.item.firstLoad) {
            const sx = (layout === 2 ? 480 : 270) / this.item.ratio;
            const cx = (layout === 1 ? 480 : 270);
            this.canvasVideo.nativeElement.style.left = (cx - sx) / 2 + 'px';
            this.item.left = 0.5 - cx / this.canvasVideo.nativeElement.width / 2;
          } else {
            this.canvasVideo.nativeElement.style.left = -this.item.left * this.canvasVideo.nativeElement.width + 'px';
          }
        }

        this.item.firstLoad = false;
      });
    } else {
      this.canvasImage.nativeElement.classList.remove('width-scale');
      this.canvasImage.nativeElement.classList.remove('height-scale');
      this.canvasImage.nativeElement.style.left = '0px';
      this.canvasImage.nativeElement.style.top = '0px';
      this.canvasImage.nativeElement.style.transform = 'scale(1)';
      this.canvasImage.nativeElement.style.transform = 'absolute';

      if (this.dragData.extension === 'logo' || this.dragData.extension === 'cover') {
        this.item.background = this.dragData.background;
        this.item.caption.text = this.dragData.caption.text;
        this.item.duration = this.dragData.duration;
        this.item.background_type = 'image';
        this.item.extension = this.dragData.extension;
        this.item.caption.position = 8;
        this.positionSubject.next(this.item.caption.position);
        this.canvasImage.nativeElement.style.position = 'relative';
      } else {
        this.item.background = this.dragData.src.medium;
        this.item.extension = 'image';
      }
      // setTimeout(() => {

      this.item.firstLoad = true;
      // });
    }
  }

  onNewSlide(e) {
    let obj = _.cloneDeep(this.item);
    console.log(e.dragData);
    if (e.dragData.extension === 'logo') {
      obj.background = e.dragData.background;
      obj.caption.text = e.dragData.caption.text;
      obj.caption.position = 8;
      obj.extension = 'logo';
    } else if (e.dragData.extension === 'cover') {
      obj.background = e.dragData.background;
      obj.caption.text = e.dragData.caption.text;
      obj.caption.position = 4;
      obj.extension = 'cover';
    } else if (e.dragData.extension === 'media') {
      obj.caption.text = `Click <font color="${this.brandService.getHighlightColor()}">here</font> to edit`;
      obj.caption.position = 5;
      if (e.dragData.background_type === 'image') {
        obj.background = e.dragData.src.medium;
        obj.extension = 'image';
      } else {
        obj.background = e.dragData.image;
        obj.video_files = e.dragData.video_files;
        obj.extension = 'video';
      }
      this.mediaItemService.addAsUsed(obj);
    }

    this.addSceneEvent.emit(obj);
  }

  onAddScene(event: any) {
    let obj = _.cloneDeep(this.item);
    obj.background = 'assets/graphics/scene-placeholder.svg';
    obj.caption.text = `Click <font color="${this.brandService.getHighlightColor()}">here</font> to edit`;
    obj.caption.position = 5;
    obj.extension = 'image';
    this.addSceneEvent.emit(obj);
  }

  onAddSubScene(event: any) {
    // this.addSub
    this.addSubSceneEvent.emit(this.item);
  }

  onShowControls(event: any) {
    this.addScene.nativeElement.style.display = 'flex';
    this.addSubScene.nativeElement.style.display = 'flex';
  }

  onHideControls(event: any) {
    this.addScene.nativeElement.style.display = 'none';
    this.addSubScene.nativeElement.style.display = 'none';
  }

  changeViewMode(mode) {
    if (this.item.extension === 'logo') {
      return;
    }

    let element;

    console.log(this.item.extension);

    if (this.item.extension === 'video') {
      element = this.canvasVideo.nativeElement;
    } else {
      element = this.canvasImage.nativeElement;
    }

    element.classList.remove('width-scale');
    element.classList.remove('height-scale');
    element.style.left = '0px';
    element.style.top = '0px';

    if (this.item.extension === 'cover') {
      const ratio = mode === 0 ? 1 : mode === 1 ? 9 / 8 : 8 / 9;
      const hy = mode === 2 ? 240 : 270;
      const hx = mode === 1 ? 240 : 270;

      console.log(mode, ratio);

      if (this.item.ratio > ratio) {
        element.classList.add('height-scale');
        const sx = hy / this.item.ratio;
        const tdx = (hx - sx) / 2;
        element.style.left = tdx + 'px';
      } else {
        element.classList.add('width-scale');
        const sy = hx * this.item.ratio;
        const tdy = (hy - sy) / 2;
        element.style.top = tdy + 'px';
      }

      return;
    }

    const ratio = (mode === 1) ? 9 / 16 : (mode === 2) ? 16 / 9 : 1;
    const width = (mode === 1) ? 480 : 270;
    const height = (mode === 2) ? 480 : 270;
    const classToAdd = ratio > this.item.ratio ? 'height-scale' : 'width-scale';

    element.classList.add(classToAdd);

    console.log(`${element.width}, ${element.height}`);
    let elWidth = parseInt(element.style.width, 10);
    let elHeight = parseInt(element.style.height, 10);

    if (this.item.extension !== 'video') {
      elWidth = element.width;
      elHeight = element.height;
    }

    this.item.left = 0;
    this.item.top = 0;

    if (classToAdd === 'height-scale') {
      const tdx = -(elWidth - width) / 2;
      element.style.left = `${tdx}px`;
      this.item.left = -(elWidth - width) / 2 / elWidth;
    } else {
      const tdy = -(elHeight - height) / 2;
      element.style.top = `${tdy}px`;
      this.item.top = -(elHeight - height) / 2 / elHeight;
    }

  }

  onLoadImage(event: any) {
    if (event && event.target) {
      if (this.item.extension === 'logo') {
        return;
      }

      this.canvasImage.nativeElement.style.display = 'none';
      const element = event.srcElement;
      this.item.ratio = element.height / element.width;
      const layout = this.canvasEditorService.getLayout() % 3;

      element.classList.remove('height-scale');
      element.classList.remove('width-scale');

      console.log('called');

      if (this.item.extension === 'cover') {

        const ratio = layout === 0 ? 1 : layout === 1 ? 9 / 8 : 8 / 9;
        const hy = layout === 2 ? 240 : 270;
        const hx = layout === 1 ? 240 : 270;

        console.log(layout, ratio);

        if (this.item.ratio > ratio) {
          element.classList.add('height-scale');
          const sx = hy / this.item.ratio;
          const tdx = (hx - sx) / 2;
          element.style.left = tdx + 'px';
        } else {
          element.classList.add('width-scale');
          const sy = hx * this.item.ratio;
          const tdy = (hy - sy) / 2;
          element.style.top = tdy + 'px';
        }
      } else {
        const ratio = layout === 0 ? 1 : layout === 1 ? 9 / 16 : 16 / 9;
        if (this.item.ratio > ratio) {
          element.classList.add('width-scale');
          const sy = 480 * this.item.ratio;
          if (this.item.firstLoad) {
            element.style.top = (270 - sy) / 2 + 'px';
            this.item.top = (270 - sy) / 2 / sy;
          } else {
            element.style.top = this.item.top * sy + 'px';
          }
        } else {
          element.classList.add('height-scale');
          const sx = (layout === 2 ? 480 : 270) / this.item.ratio;
          if (this.item.firstLoad) {
            const cx = (layout === 1 ? 480 : 270);
            element.style.left = (cx - sx) / 2 + 'px';
            this.item.left = (cx - sx) / 2 / sx;
          } else {
            element.style.left = this.item.left * sx + 'px';
          }
        }
      }

      this.item.firstLoad = false;
      // setTimeout(() => {
      element.style.display = 'block';
      // });

    }
  }

}
