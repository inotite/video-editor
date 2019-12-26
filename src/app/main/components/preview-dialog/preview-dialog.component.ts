import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription, interval, Subject } from 'rxjs';
import { CurrentSlideService } from 'src/app/services/current-slide.service';
import { CanvasEditorService } from 'src/app/services/canvas-editor.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-preview-dialog',
  templateUrl: './preview-dialog.component.html',
  styleUrls: ['./preview-dialog.component.scss']
})
export class PreviewDialogComponent implements OnInit {
  sceneOb: Observable<any>;

  sceneSubscription: Subscription;
  timerSubscription: Subscription;

  scenes: any;
  layout: number;
  progress = 0;
  totalTime = 0;

  playing: boolean;
  caption;
  sceneExt;

  times = new Array();
  playSubject: Subject<void> = new Subject<void>();
  positionSubject: Subject<any> = new Subject<any>();
  styleSubject: Subject<any> = new Subject<any>();

  constructor(
    public dialogRef: MatDialogRef<PreviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private slideService: CurrentSlideService,
    private canvasEditorService: CanvasEditorService
  ) {}

  ngOnInit() {
    this.sceneOb = this.slideService.getScenes();
    this.sceneSubscription = this.sceneOb.subscribe(response => {
      console.log(response);
      this.scenes = response.map(el => {
        let o = Object.assign({}, el);
        o.visibility = 'hidden';
        o.scale = 'scale(1)';
        this.totalTime += parseInt(el.duration, 10);
        this.times.push(this.totalTime * 25);
        return o;
      });
      this.scenes[0].visibility = 'visible';
      console.log(this.totalTime);
      this.caption = this.scenes[0].caption;
      this.sceneExt = this.scenes[0].extension;
    });
    this.layout = this.canvasEditorService.getLayout() % 3;
  }

  onClose(event) {
    this.dialogRef.close('closed');
  }

  onDone(event) {
    this.dialogRef.close('done');
  }

  onReport(event) {}

  play(event) {
    if (this.playing) {
      return;
    }
    this.playing = !this.playing;
    const progress = interval(40);
    const takeUntilFinish = progress.pipe(take((100 * this.totalTime) / 4));
    let idx = 0;
    this.timerSubscription = takeUntilFinish.subscribe(
      x => {
        const extension = this.scenes[idx].extension;
        this.progress = (4 * x) / this.totalTime;
        const deltaX = (idx === 0) ? x : x - this.times[idx - 1];
        if (deltaX <= 80) {
          this.styleSubject.next({
            transform: -110 + 110 / 80 * deltaX,
            paddingRight: 100 - 90 / 80 * deltaX,
            marginLeft: -90 + 90 / 80 * deltaX
          });
        }
        if (
          (idx === 0 && x === 1) ||
          (idx > 0 && x - 1 === this.times[idx - 1])
        ) {
          // this.playSubject.next();
          this.positionSubject.next(this.scenes[idx].caption.position);
          this.caption = Object.assign({}, this.scenes[idx].caption);
          this.sceneExt = this.scenes[idx].extension;
          console.log(this.caption);
        }
        if (
          extension === 'image' ||
          extension === 'logo' ||
          extension === 'cover'
        ) {
          if (idx === 0) {
            this.scenes[idx].scale = `scale(${1 +
              (0.2 / (this.scenes[idx].duration * 25)) * x})`;
          } else {
            this.scenes[idx].scale = `scale(${1 +
              (0.2 / (this.scenes[idx].duration * 25)) *
                (x - this.times[idx - 1])})`;
          }
          if (x >= this.times[idx]) {
            this.scenes[idx].visibility = 'hidden';
            this.scenes[idx].scale = 'scale(1)';
            idx++;
            this.scenes[idx].visibility = 'visible';
          }
        } else if (extension === 'video') {
          const element = document.getElementById(
            this.scenes[idx]._id
          ) as HTMLVideoElement;
          if (element.paused) {
            element.play();
            element.muted = true;
            this.resizeElement(element, this.scenes[idx]);
          }

          if (x >= this.times[idx]) {
            this.scenes[idx].visibility = 'hidden';
            element.pause();
            element.currentTime = 0;
            idx++;
            this.scenes[idx].visibility = 'visible';
          }
        }
      },
      err => {},
      () => {
        this.scenes[0].visibility = 'visible';
        this.scenes[this.scenes.length - 1].visibility = 'hidden';
        this.scenes[this.scenes.length - 1].scale = 'scale(1)';
        this.playing = false;
        this.caption = Object.assign({}, this.scenes[0].caption);
        this.sceneExt = this.scenes[0].extension;
        this.positionSubject.next(this.scenes[0].caption.position);
        this.progress = 0;
        console.log('Position', this.scenes[0].caption.position);
      }
    );
  }

  resizeElement(element, scene) {
    if (scene.extension === 'cover') {
      const ratio = this.layout === 0 ? 1 : this.layout === 1 ? 9 / 8 : 8 / 9;
      const hy = this.layout === 2 ? 240 : 270;
      const hx = this.layout === 1 ? 240 : 270;

      // console.log(mode, ratio);

      if (scene.ratio > ratio) {
        element.classList.add('height-scale');
        const sx = hy / scene.ratio;
        const tdx = (hx - sx) / 2;
        element.style.left = tdx + 'px';
      } else {
        element.classList.add('width-scale');
        const sy = hx * scene.ratio;
        const tdy = (hy - sy) / 2;
        element.style.top = tdy + 'px';
      }

      return;
    }
    if (Math.abs(scene.top) > 0) {
      element.classList.add('width-scale');
    } else {
      element.classList.add('height-scale');
    }

    element.style.left = scene.left * element.width + 'px';
    element.style.top = scene.top * element.height + 'px';
  }

  onLoadImage(event, scene) {
    if (scene.extension === 'logo') {
      return;
    }
    this.resizeElement(event.srcElement, scene);
  }

  OnDestroy() {
    this.sceneSubscription.unsubscribe();
    this.timerSubscription.unsubscribe();
  }
}
