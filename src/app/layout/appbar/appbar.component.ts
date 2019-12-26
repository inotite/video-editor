import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PreviewDialogComponent } from 'src/app/main/components/preview-dialog/preview-dialog.component';
import { CanvasEditorService } from 'src/app/services/canvas-editor.service';
import { PublishDialogComponent } from 'src/app/main/components/publish-dialog/publish-dialog.component';

@Component({
  selector: 'app-bar-dark',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.scss']
})
export class AppbarComponent implements OnInit {

  @Input()
  loading: boolean;

  constructor(
    private dialog: MatDialog,
    private canvasEditorService: CanvasEditorService
  ) { }

  ngOnInit() {
  }

  onPreview(event) {
    const dialogRef = this.dialog.open(PreviewDialogComponent, {
      width: '640px',
      data: {
        ratio: this.canvasEditorService.getLayout()
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  onPublish(event) {
    const dialogRef = this.dialog.open(PublishDialogComponent, {
      width: '700px',
      data: {
        ratio: this.canvasEditorService.getLayout()
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
