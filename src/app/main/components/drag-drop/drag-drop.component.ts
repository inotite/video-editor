import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaItemService } from 'src/app/services/media-item.service';
import { HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss']
})
export class DragDropComponent implements OnInit {

  @ViewChild('drop') dropCont;

  status = 1;
  uploadResult: any;
  filename: string;

  uploadSubscription: Subscription;

  constructor(private mediaService: MediaItemService) { }

  ngOnInit() {
  }

  uploadFile(event) {
    this.status = 4;
    this.filename = event[0].name;
    this.dropCont.nativeElement.style.backgroundImage = 'none';
    this.uploadSubscription = this.mediaService.uploadMedia(event[0]).pipe(map((event) => {
      switch(event.type) {
        case HttpEventType.UploadProgress:
          return {
            type: 'progress',
            progress: Math.round(100 * event.loaded / event.total)
          };
        case HttpEventType.Response:
          return {
            type: 'data',
            data: event.body.data
          };
        default:
          return `Unhandled event: ${event.type}`;
      }
    })).subscribe(response => {
      this.uploadResult = response;
      if (this.uploadResult.type === 'data') {
        this.dropCont.nativeElement.style.backgroundImage = "url('../../../../assets/icons/ic-checkmark-circle.svg')";
        this.dropCont.nativeElement.style.backgroundColor = '#00D5920C';
        let data = this.uploadResult.data;
        data.id = uuid();
        data.src.tiny = data.src.medium;
        data.src.original = data.src.medium;
        data.type = 'upload';
        this.mediaService.addAsUsed(data);

        setTimeout(() => {
          this.status = 1;
          this.dropCont.nativeElement.style.backgroundImage = "url('../../../../assets/icons/ic-upload-cloud.svg')";
        }, 5000);
      }
    });
  }

  dragOver(event) {
    this.status = 2;
    this.dropCont.nativeElement.style.backgroundImage = "url('../../../../assets/icons/ic-upload-cloud.svg')";
  }

  dragLeave(event) {
    this.status = 1;
    this.dropCont.nativeElement.style.backgroundImage = "url('../../../../assets/icons/ic-upload-cloud.svg')";
  }

  fileNotSupport(event) {
    this.status = 3;
    this.dropCont.nativeElement.style.backgroundImage = "url('../../../../assets/icons/ic-alert-triangle.svg')";
  }

  deleteAttachment(index) {
  }

  cancelUpload() {
    this.uploadSubscription.unsubscribe();
    this.status = 1;
    this.dropCont.nativeElement.style.backgroundImage = "url('../../../../assets/icons/ic-upload-cloud.svg')";
  }

}
