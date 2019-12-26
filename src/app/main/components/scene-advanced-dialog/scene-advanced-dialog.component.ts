import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-scene-advanced-dialog',
  templateUrl: './scene-advanced-dialog.component.html',
  styleUrls: ['./scene-advanced-dialog.component.scss']
})
export class SceneAdvancedDialogComponent implements OnInit {

  @ViewChild('cropHandle') cropHandle;
  @ViewChild('cropImage') cropImage;

  ratio;

  constructor(
    public dialogRef: MatDialogRef<SceneAdvancedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.ratio = this.data.ratio == 1 ? 9/16 : (this.data.ratio == 2 ? 16 / 9 : 1);
    if (this.data.direction == 'vertical') {
      this.cropHandle.nativeElement.style.height = '100%';
      this.cropHandle.nativeElement.style.width = this.cropImage.nativeElement.height / this.ratio + 'px';
    } else {
      this.cropHandle.nativeElement.style.width = '100%';
      this.cropHandle.nativeElement.style.height = this.cropImage.nativeElement.width * this.ratio + 'px';
    }
  }

  onDone() {
    this.dialogRef.close({
      left: parseFloat(this.cropHandle.nativeElement.style.left) / 276,
      top: parseFloat(this.cropHandle.nativeElement.style.top) / parseFloat(this.cropImage.nativeElement.height)
    });
  }

  onClose() {
    this.dialogRef.close('Pizza!');
  }

  onDragCrop(event: any) {
    if (event.which == 1) {
      if (this.data.direction == 'vertical') {
        var x = this.cropHandle.nativeElement.style.left.length > 0 ? parseFloat(this.cropHandle.nativeElement.style.left) : 0;
        x += event.movementX;
        let w = this.cropImage.nativeElement.height / this.ratio;
        if (x < 0) x = 0;
        else if (x + w + 1 > 276) x = 276 - w - 1;
        this.cropHandle.nativeElement.style.left = x + "px";
      }
      else {
        var y = this.cropHandle.nativeElement.style.top.length > 0 ? parseFloat(this.cropHandle.nativeElement.style.top) : 0;
        y += event.movementY;
        let h = this.cropImage.nativeElement.width * this.ratio;
        if (y < 0) y = 0;
        else if (y + h + 1 > this.cropImage.nativeElement.height) y = this.cropImage.nativeElement.height - h - 1;
        this.cropHandle.nativeElement.style.top = y + "px";
      }
    }
  }

}
